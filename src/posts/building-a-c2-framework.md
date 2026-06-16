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

I learn by building. Reading about C2 frameworks only got me so far. The stuff that actually stuck (beacon intervals, HMAC-derived endpoints, mutual TLS) only made sense once I wrote the code and watched it break.

I built this to prepare for a move into red teaming. If I want to find where implants and C2 infrastructure fall apart, I need to know exactly how they work. Everything here is educational and only runs against machines I own.

## Three transport variants

The project has three independent transport layers, each one a step up from the last. All three expose the same three operations: **execute** a shell command, **upload** a file to the target, **download** a file from it.

### Variant 1: raw TCP with binary framing

The simplest variant. Raw TCP socket, custom binary framing:

```
[4-byte big-endian length][1-byte command code][payload]
```

Command codes are plain constants: `0x00` MSG, `0x01` EXECUTE, `0x02` UPLOAD, `0x03` DOWNLOAD, `0x04` SUCCESS.

The thing that bit me here was TCP fragmentation. TCP is a stream, not a sequence of messages. There's no guarantee a single `recv()` returns a whole frame. I needed a `_receive_all()` loop that keeps reading until the full length-prefixed message arrives. Without it, large file transfers would silently truncate, and it only happened intermittently, which made it awful to debug.

The target binds port 9000 and handles one command per connection. The C2 opens a fresh connection for each command from an interactive menu, sends the framed request, reads one response, disconnects. Stateless per command. Easy to reason about.

### Variant 2: HTTPS with mutual TLS

The second variant moves to REST over HTTPS with mTLS.

Mutual TLS means both sides authenticate: the target verifies the C2's certificate, the C2 verifies the target's, both signed by a shared CA. Anyone intercepting the traffic can't impersonate either end.

The target is a Flask app with four endpoints: `GET /hello`, `POST /execute`, `POST /upload`, `POST /download`. Payloads are JSON, file content base64-encoded. The C2 uses Python's `requests` with `cert=` and `verify=` to present the client certificate and check the server against the CA. Understanding exactly how `requests` handles TLS made debugging SSL errors at work way less confusing.

### Variant 3: beacon/callback architecture

The third variant flips the connection model. Instead of the C2 reaching out to the target, the implant polls the C2. That's the standard model for modern malware. Firewalls usually allow outbound connections and block inbound. The implant is often behind NAT where the C2 can't reach it directly. And beacon traffic blends in with normal outbound web requests.

The C2 runs two Flask servers in one process. Port 9443 is the implant-facing mTLS side, where the endpoint paths are HMAC-SHA256 derived from a secret key so they aren't guessable. Port 9444 is the operator-facing side: the REST API, the SSE stream, and the Svelte dashboard.

The implant registers on startup, then loops: get tasks, run them, post results, sleep with +/-20% jitter before checking in again. The jitter matters more than you'd think. A perfectly regular 20-second beacon is a strong signature. Spreading it across 16 to 24 seconds is much harder to fingerprint.

## BeaconUI: the full-featured version

The final iteration extends the beacon architecture with SQLite persistence, optional AES-256-GCM application-layer encryption, a C implant, and a full operator dashboard in Svelte 5.

### SQLite persistence

The original beacon kept all implant state in memory. Restart the C2 and everything was gone. BeaconUI moves that into SQLite, so implant records, task results, and an audit log all survive a restart. You can page through the full history with `GET /api/results/<id>/history?page=N`, and every operator action gets logged: task queued, result received, implant registered, task cancelled.

### 29 task types

Beyond the core three, the Python implant handles 29 task types. The basics: screenshot capture, clipboard read, keylogger (start, dump, stop), process listing with structured JSON output, directory listing, netstat, process kill, system info, privilege-escalation enumeration (SUID, sudo, writable system files, capabilities), persistence install and uninstall, in-process Python exec, self-update, self-destruct.

The later additions are the ones I'm most interested in operationally: an interactive PTY shell (open, send, close), a SOCKS5 proxy for pivoting, and in-memory shellcode execution.

The privesc enumeration is the one I keep coming back to for CTF prep. It runs the same checks you'd run manually: find SUID binaries, list sudo rules, look for writable system files, enumerate capabilities.

### The C implant

Building the C implant was where I learned the most. Python's standard library hides so much. Rewriting the same functionality in C forces you to actually understand what's happening underneath. The C version uses libcurl for HTTPS and mTLS, OpenSSL for the HMAC-SHA256 endpoint derivation.

The tedious parts were all the things Python gives you for free. No JSON library, so I wrote my own builder and parser. Tedious, but you definitely learn the format. UUID generation meant reading 16 bytes from `/dev/urandom` on Linux and macOS, or calling `UuidCreate()` on Windows, where Python's `uuid.uuid4()` is one line. Finding the implant's own path on disk (for self-destruct and self-update) took three different APIs: `GetModuleFileNameA` on Windows, `_NSGetExecutablePath` on macOS, `readlink /proc/self/exe` on Linux. Screenshots were a different tool on every platform: `screencapture -x` on macOS, PowerShell GDI on Windows, `scrot` or `import` on Linux.

The C implant returns the same JSON shapes as the Python one for all 28 of its task types, so the C2 can't tell which one it's talking to. I did that on purpose and it made testing much simpler.

### Test suite

581 tests. Pytest unit and integration suites plus a Playwright E2E suite that drives the operator dashboard, backed by 48 behave (Gherkin) scenarios. They run end-to-end, not against mocks: a real C2 server runs in-process, a real implant runs as a subprocess, and the tests check actual task execution and result shapes. The C implant suite builds `implant_beacon_test` (pointed at localhost:9446, 200ms beacon, no jitter for fast cycles) and runs it against that same in-process C2. The last test is `test_c_self_destruct`, which kills the process, so it has to run last.

## The operator dashboard

Svelte 5 with DaisyUI and Tailwind, on a dark "c2dark" theme: near-black background, teal primary, orange accent.

Updates arrive live over a Server-Sent Events stream whenever an implant registers or a result lands. No polling, no websockets. Implants show as online, idle, or offline (last seen under 60 seconds, under five minutes, or longer), color-coded in the sidebar. Screenshot results render inline with buttons to open them full size or save them. And since an implant might not check in right away, you can queue several tasks ahead of time; each one shows up in the queue tab and can be cancelled.

## What I learned

mTLS was tedious, not hard. Once the certificate infrastructure is in place (CA, server cert, client cert), the code is straightforward. Generating and distributing the certs is where you actually spend the time.

Jitter matters. Even +/-20% on a 20-second interval spreads the beacons across 16 to 24 seconds. Over a hundred check-ins, that's way harder to pick out of traffic than a metronome.

The HMAC-derived endpoints are my favorite part of the whole project. Both sides derive the path from a shared secret, so anyone sniffing the wire just sees requests to `/a3f8d291...` that mean nothing without the key.

SQLite for persistence is underrated. In-memory state is quick to write but you lose everything on restart. SQLite adds almost no complexity and makes the tool usable across sessions.

Test end to end from day one. Running a real server, a real implant, and real task execution caught bugs that mocked unit tests would have missed completely, including that TCP fragmentation bug in the first variant.

## What's next

Two of the items that were on this list when I first wrote it have since shipped (v0.4.0): a persistent PTY shell (so you can run `vim` or `python3` instead of one-shot subprocess calls) and a SOCKS5 proxy for pivoting into internal networks through the implant. Still on the list: traffic shaping. Randomized User-Agent, HTTP keep-alive, realistic browser headers so the beacon blends into ordinary web traffic. Broader evasion work after that.

The current build stays private (the newer capabilities aren't published), but I'm happy to walk through the architecture or share source on request. It's a learning tool.
