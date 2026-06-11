---
slug: building-a-c2-framework
title: Building a Cross-Platform C2 Framework from Scratch
date: 2026-03-15
readTime: 13
tags: Security, Python, C, Networking, Red Team
summary: A writeup on building a multi-transport Remote Access Trojan for educational security research, covering TCP binary framing, mutual TLS, and a beacon/callback architecture.
---

_Updated June 2026 for BeaconUI v0.4.0. The capability counts and roadmap below reflect the current build._

## Why build a RAT?

The best way I know to learn offensive security is to build the tools yourself. You can read about C2 frameworks all day, but something only clicks once you've implemented beacon intervals, HMAC-derived endpoints, and mutual TLS by hand.

I built this to prepare for a move into Android pentesting and red teaming. If I want to find where implants and C2 infrastructure break, I should know exactly how they work first. Everything here is educational and only ever runs against machines I own.

## Three transport variants

The project has three independent transport layers, each a step up from the last. All three expose the same three operations: **execute** a shell command, **upload** a file to the target, and **download** a file from it.

### Variant 1: raw TCP with binary framing

The simplest variant is a raw TCP socket with a custom binary framing protocol:

```
[4-byte big-endian length][1-byte command code][payload]
```

The command codes are plain constants: `0x00` MSG, `0x01` EXECUTE, `0x02` UPLOAD, `0x03` DOWNLOAD, `0x04` SUCCESS.

The lesson here was TCP fragmentation. TCP is a stream, not a sequence of messages, so there's no guarantee that a single `recv()` returns a whole frame. You need a `_receive_all()` loop that keeps reading until the full length-prefixed message has arrived. Get it wrong and you get subtle, hard-to-reproduce bugs where large file transfers silently truncate.

The target binds port 9000 and handles one command per connection. The C2 opens a fresh connection for each command from an interactive menu, sends the framed request, reads one response, and disconnects. Stateless per command, and easy to reason about.

### Variant 2: HTTPS with mutual TLS

The second variant moves to REST over HTTPS with mTLS. This is where it gets more interesting from a network-security angle.

Mutual TLS means both sides authenticate: the target verifies the C2's certificate and the C2 verifies the target's, both signed by a shared CA. An attacker who intercepts the traffic can't impersonate either end.

The target is a Flask app with four endpoints: `GET /hello`, `POST /execute`, `POST /upload`, `POST /download`. Payloads are JSON, with file content base64-encoded. The C2 uses Python's `requests` with the `cert=` and `verify=` parameters to present the client certificate and check the server against the CA. I reach for that pattern constantly now. Understanding exactly how `requests` handles TLS made debugging SSL errors at work a lot less painful.

### Variant 3: beacon/callback architecture

The third variant flips the connection model: instead of the C2 reaching out to the target, the *implant polls the C2*. That's the standard model for modern malware, for a few reasons. Firewalls usually allow outbound connections and block inbound ones. The implant is often behind NAT where the C2 can't reach it directly. And beacon traffic blends in with normal outbound web requests.

The C2 runs two Flask servers in one process. Port 9443 is the implant-facing mTLS side, where the endpoint paths are HMAC-SHA256 derived from a secret key so they aren't guessable. Port 9444 is the operator-facing side: the REST API, the SSE stream, and the Svelte dashboard.

The implant registers on startup and then loops: get tasks, run them, post the results, and sleep with ±20% jitter before checking in again. The jitter matters. A perfectly regular 20-second beacon is a strong signature; spreading it across 16 to 24 seconds is much harder to fingerprint.

## BeaconUI: the full-featured version

The final iteration, BeaconUI, extends the beacon architecture with SQLite persistence, optional AES-256-GCM application-layer encryption, a C implant, and a full operator dashboard in Svelte 5.

### SQLite persistence

The original beacon kept all implant state in memory. Restart the C2 and you lost everything. BeaconUI moves that into SQLite, so implant records, task results, and an audit log all survive a restart. You can page through the full history with `GET /api/results/<id>/history?page=N`, and every operator action gets logged: task queued, result received, implant registered, task cancelled.

### 29 task types

Beyond the core three, the Python implant now handles 29 task types: screenshot capture, clipboard read, a keylogger (start, dump, stop), process listing with structured JSON output, directory listing, netstat, process kill, system info, privilege-escalation enumeration (SUID, sudo, writable system files, capabilities), persistence install and uninstall, in-process Python exec, self-update, and self-destruct. The later additions are the operationally interesting ones: an interactive PTY shell (open, send, close), a SOCKS5 proxy for pivoting, and in-memory shellcode execution.

The privilege-escalation enumeration is the one I keep coming back to for CTF prep. It runs the same checks a manual pentester would: find SUID binaries, list sudo rules, look for writable system files, enumerate capabilities.

### The C implant

Building the C implant taught me the most. Python's standard library hides a lot, and rewriting the same functionality in C forces you to actually understand it. The C version uses libcurl for HTTPS and mTLS and OpenSSL for the HMAC-SHA256 endpoint derivation.

The annoying parts were the ones Python normally hands you for free. With no JSON library I wrote my own builder and parser, which is tedious but does teach you the format. UUID generation meant reading 16 bytes from `/dev/urandom` on Linux and macOS, or calling `UuidCreate()` on Windows, where `uuid.uuid4()` would have been one line. Finding the implant's own path on disk (for self-destruct and self-update) took three different APIs: `GetModuleFileNameA` on Windows, `_NSGetExecutablePath` on macOS, `readlink /proc/self/exe` on Linux. Even a screenshot was a different tool on every platform: `screencapture -x` on macOS, PowerShell GDI on Windows, `scrot` or `import` on Linux.

The payoff is that the C implant returns the same JSON shapes as the Python one for all 28 of its task types, so the C2 has no idea which one it's talking to. That was deliberate, and it made testing much easier.

### Test suite

The project has 581 tests: pytest unit and integration suites plus a Playwright E2E suite that drives the operator dashboard, backed by another 48 behave (Gherkin) scenarios. They run end to end rather than against mocks: a real C2 server runs in-process, a real implant runs as a subprocess, and the tests check actual task execution and result shapes. The C implant suite builds `implant_beacon_test` (pointed at localhost:9446, 200ms beacon, no jitter for fast cycles) and runs it against that same in-process C2. The last test is `test_c_self_destruct`, which kills the process, so it has to run last.

## The operator dashboard

The web UI is Svelte 5 with DaisyUI and Tailwind, on a dark "c2dark" theme: near-black background, teal primary, orange accent.

A few things I wanted it to get right. Updates arrive live over a Server-Sent Events stream whenever an implant registers or a result lands, so there's no polling and no websockets to babysit. Implants show as online, idle, or offline (last seen under 60 seconds, under five minutes, or longer), color-coded in the sidebar. Screenshot results render inline, with buttons to open them full size or save them. And since an implant might not check in right away, you can queue several tasks ahead of time; each one shows up in the queue tab and can be cancelled.

## Lessons learned

A handful of things stuck with me.

mTLS turned out to be tedious rather than hard. Once the certificate infrastructure is in place (CA, server cert, client cert), the code is straightforward. The real work is generating and distributing the certs, not writing the request.

Jitter mattered more than I expected. Even ±20% on a 20-second interval spreads the beacons across 16 to 24 seconds, and over a hundred check-ins that is far harder to pick out of traffic than a metronome.

The HMAC-derived endpoints are my favorite part. Both sides derive the path from a shared secret, so anyone sniffing the wire just sees requests to `/a3f8d291...` that mean nothing without the key. That beats hoping a random-looking path never gets noticed.

SQLite for persistence is underrated. In-memory state is quick to write but loses everything on restart; SQLite adds almost no complexity and makes the tool usable across sessions.

And the big one: test end to end from day one. Running a real server, a real implant, and real task execution caught bugs that mocked unit tests would have sailed straight past, including the TCP fragmentation bug in the first variant.

## What's next

Two of the items that were on this list when I first wrote it have since shipped (v0.4.0): a persistent PTY shell (so you can run `vim` or `python3` instead of one-shot subprocess calls) and a SOCKS5 proxy for pivoting into internal networks through the implant. What's still on the list is traffic shaping: randomized User-Agent, HTTP keep-alive, and realistic browser headers so the beacon blends into ordinary web traffic, plus broader evasion work.

The current build stays private (the newer capabilities above aren't published), but I'm happy to walk through the architecture or share source on request. It's a learning tool, and that's exactly how I treat it.
