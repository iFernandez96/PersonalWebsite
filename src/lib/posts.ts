export interface Post {
	slug: string;
	title: string;
	date: string;
	readTime: number;
	tags: string[];
	summary: string;
	content: string;
}

export const posts: Post[] = [
	{
		slug: 'building-a-c2-framework',
		title: 'Building a Cross-Platform C2 Framework from Scratch',
		date: '2025-03-15',
		readTime: 12,
		tags: ['Security', 'Python', 'C', 'Networking', 'Red Team'],
		summary:
			'A deep dive into building a multi-transport Remote Access Tool for educational security research — covering TCP binary framing, mutual TLS, beacon/callback architecture, and a full Svelte operator dashboard.',
		content: `
<h2>Why Build a RAT?</h2>
<p>The best way to learn offensive security is to build the tools yourself. You can read about C2 frameworks all day, but once you implement beacon intervals, HMAC-derived endpoints, and mutual TLS from first principles, it clicks in a way that no amount of reading can replicate.</p>
<p>I built this project to prepare for an Android pentesting and red team transition — understanding how implants and C2 infrastructure actually work is foundational for that path. Everything here is educational and runs only against machines I own.</p>

<h2>Three Transport Variants</h2>
<p>The project has three independent transport layers, each more sophisticated than the last. They all expose the same three core operations: <strong>execute</strong> a shell command, <strong>upload</strong> a file to the target, and <strong>download</strong> a file from the target.</p>

<h3>Variant 1: Raw TCP with Binary Framing</h3>
<p>The simplest variant uses a raw TCP socket with a custom binary framing protocol:</p>
<pre><code>[4-byte big-endian length][1-byte command code][payload]</code></pre>
<p>Command codes are simple constants: <code>0x00</code> MSG, <code>0x01</code> EXECUTE, <code>0x02</code> UPLOAD, <code>0x03</code> DOWNLOAD, <code>0x04</code> SUCCESS.</p>
<p>The key lesson here was TCP fragmentation. TCP is a stream protocol — there's no guarantee that a single <code>recv()</code> call returns a complete message. You need a <code>_receive_all()</code> loop that reads until the full length-prefixed message arrives. Getting this wrong causes subtle, hard-to-reproduce bugs where large file transfers silently truncate.</p>
<p>The target binds port 9000 and handles one command per connection in a loop. The C2 opens a fresh connection per command from an interactive menu, sends the framed request, reads one response, and disconnects. This is intentionally simple — stateless per command, easy to reason about.</p>

<h3>Variant 2: HTTPS with Mutual TLS</h3>
<p>The second variant moves to REST over HTTPS with mTLS (mutual TLS). This is where things get more interesting from a network security standpoint.</p>
<p>Mutual TLS means both sides authenticate: the target verifies the C2's certificate, and the C2 verifies the target's certificate. Both certs are signed by a shared CA. This prevents an attacker who intercepts traffic from impersonating either side.</p>
<p>The target is a Flask app with endpoints: <code>GET /hello</code>, <code>POST /execute</code>, <code>POST /upload</code>, <code>POST /download</code>. All payloads are JSON, file content is base64-encoded.</p>
<p>The C2 uses Python's <code>requests</code> library with the <code>cert=</code> and <code>verify=</code> parameters to present the client certificate and verify the server against the CA. This is a pattern I use constantly now — understanding exactly how <code>requests</code> handles TLS made debugging SSL errors in production work much easier.</p>

<h3>Variant 3: Beacon/Callback Architecture</h3>
<p>The third variant flips the connection model entirely: instead of the C2 connecting to the target, the <em>implant polls the C2</em>. This is the standard model for modern malware because:</p>
<ul>
<li>Firewalls typically allow outbound connections but block inbound ones</li>
<li>The implant is behind NAT — the C2 can't reach it directly</li>
<li>Beacon traffic looks like normal web browsing to a firewall</li>
</ul>
<p>The C2 runs two Flask servers in the same process:</p>
<ul>
<li><strong>Port 9443 (mTLS)</strong> — implant-facing. Endpoints are HMAC-SHA256 derived from a secret key so they're not guessable.</li>
<li><strong>Port 9444 (HTTPS)</strong> — operator-facing REST API, SSE stream, and the Svelte dashboard.</li>
</ul>
<p>The implant registers on startup, then enters a polling loop: GET tasks → execute → POST results → sleep with ±20% jitter. The jitter is important — a perfectly regular beacon interval is a strong network signature.</p>

<h2>BeaconUI: The Full-Featured Version</h2>
<p>The final iteration, BeaconUI, extends the beacon architecture with SQLite persistence, a C implant, and a full operator dashboard built with Svelte 5 + DaisyUI.</p>

<h3>SQLite Persistence</h3>
<p>The original beacon held all implant state in memory — restart the C2 and you lose everything. BeaconUI uses SQLite to persist implants, task results, and an audit log. This means:</p>
<ul>
<li>Implant results survive C2 restarts</li>
<li>You can paginate through full history with <code>GET /api/results/&lt;id&gt;/history?page=N</code></li>
<li>Every operator action is logged: task queued, result received, implant registered, task cancelled</li>
</ul>

<h3>20 Task Types</h3>
<p>Beyond the core three operations, the Python implant supports: screenshot capture, clipboard read, keylogger (start/dump/stop), process listing with structured JSON output, directory listing, netstat, privilege escalation enumeration (SUID/sudo/writable /etc/capabilities), persistence install/uninstall, in-process Python exec, and self-destruct.</p>
<p>The privilege escalation enumeration is particularly useful for CTF prep — it runs the same checks a manual pentester would do: find SUID binaries, list sudo rules, check writable system files, enumerate capabilities.</p>

<h3>The C Implant</h3>
<p>Building the C implant was the most educational part. Python's high-level libraries hide a lot of complexity — implementing the same functionality in C forces you to understand it at a deeper level.</p>
<p>The C implant uses libcurl for HTTPS/mTLS and OpenSSL for HMAC-SHA256 endpoint derivation. Key challenges:</p>
<p><strong>No JSON library</strong> — I wrote a lightweight JSON builder and parser. Parsing JSON in C without a library is tedious but forces you to understand the format deeply.</p>
<p><strong>UUID generation</strong> — reading 16 bytes from <code>/dev/urandom</code> on Linux/macOS, or calling <code>UuidCreate()</code> on Windows. Simple in Python (<code>uuid.uuid4()</code>), manual in C.</p>
<p><strong>Cross-platform executable path</strong> — needed for self-destruct and self-update. Three different APIs: <code>GetModuleFileNameA</code> on Windows, <code>_NSGetExecutablePath</code> on macOS, <code>readlink /proc/self/exe</code> on Linux.</p>
<p><strong>Screenshot</strong> — <code>screencapture -x</code> on macOS, PowerShell GDI on Windows, <code>scrot</code>/<code>import</code> on Linux. Each platform needs completely different code paths.</p>
<p>The C implant shares the same JSON response shapes as the Python implant for all 15 supported task types. The C2 doesn't know or care which implant type it's talking to — this was a deliberate design choice that made testing much easier.</p>

<h3>Test Suite</h3>
<p>The project has 78 tests that run in ~9 seconds. The test approach is end-to-end: a real C2 server runs in-process, a real implant runs as a subprocess, and tests verify actual task execution and result shapes — no mocking.</p>
<p>The C implant test suite builds <code>implant_beacon_test</code> (which points to localhost:9446 with 200ms beacon interval and no jitter for fast test cycles) and runs it against the same in-process C2. The last test is <code>test_c_self_destruct</code>, which terminates the process — intentionally run last.</p>

<h2>The Operator Dashboard</h2>
<p>The web UI is built with Svelte 5 + DaisyUI + TailwindCSS. A custom dark "c2dark" theme: near-black background, neon teal primary, orange accent.</p>
<p>Key UX decisions:</p>
<ul>
<li><strong>SSE for live updates</strong> — when a new result arrives or an implant registers, a Server-Sent Events stream pushes the update to the browser. No polling, no websockets to manage.</li>
<li><strong>Status indicators</strong> — implants are <code>online</code> (seen <60s ago), <code>idle</code> (<5min), or <code>offline</code>. Color-coded in the sidebar.</li>
<li><strong>Inline screenshots</strong> — screenshot results render as inline images with full-size open and save buttons.</li>
<li><strong>Task queue</strong> — you can queue multiple tasks before the implant checks in. Each task shows in the queue tab and can be cancelled.</li>
</ul>

<h2>Lessons Learned</h2>
<p><strong>mTLS is not hard to implement, just tedious to set up.</strong> Once you have the certificate infrastructure (CA, server cert, client cert), the code is straightforward. The complexity is in the cert generation and distribution, not the code.</p>
<p><strong>Jitter matters more than you'd think.</strong> Even ±20% on a 20-second interval means the beacon times are 16–24 seconds. Over 100 beacons, the pattern is much harder to fingerprint than a perfect 20-second interval.</p>
<p><strong>HMAC-derived endpoints are elegant.</strong> Both C2 and implant derive the endpoint path from a shared secret using HMAC-SHA256. An attacker sniffing traffic sees requests to <code>/a3f8d291...</code> — meaningless without the key. This is better than obscurity through random naming.</p>
<p><strong>SQLite for C2 persistence is underrated.</strong> In-memory state is fast to implement but loses everything on restart. SQLite adds minimal complexity and the persistence makes the tool actually usable for multi-session research.</p>
<p><strong>Test end-to-end from day one.</strong> The integration test approach — real server, real implant, real task execution — caught bugs that unit tests would have missed. Mocking the network layer would have hidden the fragmentation bug in the TCP variant entirely.</p>

<h2>What's Next</h2>
<p>Three features are on the roadmap:</p>
<ul>
<li><strong>Interactive shell</strong> — a persistent pty session instead of one-shot subprocess execution. This eliminates per-command round-trip latency and enables interactive tools like <code>vim</code> or <code>python3</code>.</li>
<li><strong>SOCKS5 proxy</strong> — pivot into internal networks through the implant. This is the feature that makes a RAT actually useful for real pentesting scenarios.</li>
<li><strong>Traffic shaping</strong> — randomize User-Agent, use HTTP/1.1 keep-alive, add realistic browser headers. Make the beacon traffic look like normal web browsing at the network layer.</li>
</ul>
<p>The full source is on GitHub. This is a learning tool — treat it as such.</p>
`
	}
];

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
