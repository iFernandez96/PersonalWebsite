---
slug: building-a-c2-framework
title: Building a Cross-Platform C2 Framework from Scratch
date: 2026-03-15
readTime: 12
tags: Security, Python, C, Networking, Red Team
summary: A writeup on building a multi-transport Remote Access Trojan for educational security research, covering TCP binary framing, mutual TLS, and a beacon/callback architecture.
---

## Why Build a RAT?

I feel that the best way to learn offensive security is to build the tools yourself. You can read about C2 frameworks all day, but once you implement beacon intervals, HMAC-derived endpoints, and mutual TLS from first principles, it clicks in a way that no amount of reading can replicate.

I built this project to prepare for an Android pentesting and red team transition, understanding how implants and C2 infrastructure actually work is foundational for that path. Everything here is educational and runs only against machines I own.

## Three Transport Variants

The project has three independent transport layers, each more sophisticated than the last. They all expose the same three core operations: **execute** a shell command, **upload** a file to the target, and **download** a file from the target.

### Variant 1: Raw TCP with Binary Framing

The simplest variant uses a raw TCP socket with a custom binary framing protocol:

```
[4-byte big-endian length][1-byte command code][payload]
```

Command codes are simple constants: `0x00` MSG, `0x01` EXECUTE, `0x02` UPLOAD, `0x03` DOWNLOAD, `0x04` SUCCESS.

The key lesson here was TCP fragmentation. TCP is a stream protocol, there's no guarantee that a single `recv()` call returns a complete message. You need a `_receive_all()` loop that reads until the full length-prefixed message arrives. Getting this wrong causes subtle, hard-to-reproduce bugs where large file transfers silently truncate.

The target binds port 9000 and handles one command per connection in a loop. The C2 opens a fresh connection per command from an interactive menu, sends the framed request, reads one response, and disconnects. This is intentionally simple, stateless per command, easy to reason about.

### Variant 2: HTTPS with Mutual TLS

The second variant moves to REST over HTTPS with mTLS (mutual TLS). This is where things get more interesting from a network security standpoint.

Mutual TLS means both sides authenticate: the target verifies the C2's certificate, and the C2 verifies the target's certificate. Both certs are signed by a shared CA. This prevents an attacker who intercepts traffic from impersonating either side.

The target is a Flask app with endpoints: `GET /hello`, `POST /execute`, `POST /upload`, `POST /download`. All payloads are JSON, file content is base64-encoded.

The C2 uses Python's `requests` library with the `cert=` and `verify=` parameters to present the client certificate and verify the server against the CA. This is a pattern I use constantly now, understanding exactly how `requests` handles TLS made debugging SSL errors in production work much easier.

### Variant 3: Beacon/Callback Architecture

The third variant flips the connection model entirely: instead of the C2 connecting to the target, the *implant polls the C2*. This is the standard model for modern malware because:

- Firewalls typically allow outbound connections but block inbound ones
- The implant is behind NAT, the C2 can't reach it directly
- Beacon traffic looks like normal web browsing to a firewall

The C2 runs two Flask servers in the same process:

- **Port 9443 (mTLS)**, implant-facing. Endpoints are HMAC-SHA256 derived from a secret key so they're not guessable.
- **Port 9444 (HTTPS)**, operator-facing REST API, SSE stream, and the Svelte dashboard.

The implant registers on startup, then enters a polling loop: GET tasks → execute → POST results → sleep with ±20% jitter. The jitter is important, a perfectly regular beacon interval is a strong network signature.

## BeaconUI: The Full-Featured Version

The final iteration, BeaconUI, extends the beacon architecture with SQLite persistence, a C implant, and a full operator dashboard built with Svelte 5 + DaisyUI.

### SQLite Persistence

The original beacon held all implant state in memory, restart the C2 and you lose everything. BeaconUI uses SQLite to persist implants, task results, and an audit log. This means:

- Implant results survive C2 restarts
- You can paginate through full history with `GET /api/results/<id>/history?page=N`
- Every operator action is logged: task queued, result received, implant registered, task cancelled

### 20 Task Types

Beyond the core three operations, the Python implant supports: screenshot capture, clipboard read, keylogger (start/dump/stop), process listing with structured JSON output, directory listing, netstat, privilege escalation enumeration (SUID/sudo/writable /etc/capabilities), persistence install/uninstall, in-process Python exec, and self-destruct.

The privilege escalation enumeration is particularly useful for CTF prep, it runs the same checks a manual pentester would do: find SUID binaries, list sudo rules, check writable system files, enumerate capabilities.

### The C Implant

Building the C implant was the most educational part. Python's high-level libraries hide a lot of complexity, implementing the same functionality in C forces you to understand it at a deeper level.

The C implant uses libcurl for HTTPS/mTLS and OpenSSL for HMAC-SHA256 endpoint derivation. Key challenges:

**No JSON library**, I wrote a lightweight JSON builder and parser. Parsing JSON in C without a library is tedious but forces you to understand the format deeply.

**UUID generation**, reading 16 bytes from `/dev/urandom` on Linux/macOS, or calling `UuidCreate()` on Windows. Simple in Python (`uuid.uuid4()`), manual in C.

**Cross-platform executable path**, needed for self-destruct and self-update. Three different APIs: `GetModuleFileNameA` on Windows, `_NSGetExecutablePath` on macOS, `readlink /proc/self/exe` on Linux.

**Screenshot**, `screencapture -x` on macOS, PowerShell GDI on Windows, `scrot`/`import` on Linux. Each platform needs completely different code paths.

The C implant shares the same JSON response shapes as the Python implant for all 15 supported task types. The C2 doesn't know or care which implant type it's talking to, this was a deliberate design choice that made testing much easier.

### Test Suite

The project has 78 tests that run in ~9 seconds. The test approach is end-to-end: a real C2 server runs in-process, a real implant runs as a subprocess, and tests verify actual task execution and result shapes, no mocking.

The C implant test suite builds `implant_beacon_test` (which points to localhost:9446 with 200ms beacon interval and no jitter for fast test cycles) and runs it against the same in-process C2. The last test is `test_c_self_destruct`, which terminates the process, intentionally run last.

## The Operator Dashboard

The web UI is built with Svelte 5 + DaisyUI + TailwindCSS. A custom dark "c2dark" theme: near-black background, neon teal primary, orange accent.

Key UX decisions:

- **SSE for live updates**, when a new result arrives or an implant registers, a Server-Sent Events stream pushes the update to the browser. No polling, no websockets to manage.
- **Status indicators**, implants are `online` (seen <60s ago), `idle` (<5min), or `offline`. Color-coded in the sidebar.
- **Inline screenshots**, screenshot results render as inline images with full-size open and save buttons.
- **Task queue**, you can queue multiple tasks before the implant checks in. Each task shows in the queue tab and can be cancelled.

## Lessons Learned

**mTLS is not hard to implement, just tedious to set up.** Once you have the certificate infrastructure (CA, server cert, client cert), the code is straightforward. The complexity is in the cert generation and distribution, not the code.

**Jitter matters more than you'd think.** Even ±20% on a 20-second interval means the beacon times are 16–24 seconds. Over 100 beacons, the pattern is much harder to fingerprint than a perfect 20-second interval.

**HMAC-derived endpoints are elegant.** Both C2 and implant derive the endpoint path from a shared secret using HMAC-SHA256. An attacker sniffing traffic sees requests to `/a3f8d291...`, meaningless without the key. This is better than obscurity through random naming.

**SQLite for C2 persistence is underrated.** In-memory state is fast to implement but loses everything on restart. SQLite adds minimal complexity and the persistence makes the tool actually usable for multi-session research.

**Test end-to-end from day one.** The integration test approach, real server, real implant, real task execution, caught bugs that unit tests would have missed. Mocking the network layer would have hidden the fragmentation bug in the TCP variant entirely.

## What's Next

Three features are on the roadmap:

- **Interactive shell**, a persistent pty session instead of one-shot subprocess execution. This eliminates per-command round-trip latency and enables interactive tools like `vim` or `python3`.
- **SOCKS5 proxy**, pivot into internal networks through the implant. This is the feature that makes a RAT actually useful for real pentesting scenarios.
- **Traffic shaping**, randomize User-Agent, use HTTP/1.1 keep-alive, add realistic browser headers. Make the beacon traffic look like normal web browsing at the network layer.

The full source is on GitHub. This is a learning tool, treat it as such.
