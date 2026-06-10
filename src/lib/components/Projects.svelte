<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';

	type Project = {
		title: string;
		oneLiner: string;
		outcome: string;
		stack: string[];
		color: string;
		icon: 'shield' | 'network' | 'terminal' | 'nodes';
		featured?: boolean;
		repo?: string;
		writeup?: string;
		demo?: string;
		note?: string;
	};

	type SideProject = {
		title: string;
		oneLiner: string;
		stack: string[];
		repo?: string;
		demo?: string;
	};

	const beaconFeatures = [
		'Dual-language implant: 29 task types in Python, 28 in C (from scratch)',
		'Cross-platform C implant: Linux, macOS, Windows',
		'mTLS transport + HMAC-SHA256-derived endpoints',
		'AES-256-GCM application-layer encryption toggle',
		'Persistent PTY shell, SOCKS5 proxy, shellcode stager',
		'HTML smuggling dropper with XOR obfuscation',
		'SQLite persistence (WAL), SSE live dashboard',
		'490 tests (unit + integration + Playwright E2E)',
	];

	const featured: Project = {
		title: 'BeaconUI: Educational C2 Framework',
		oneLiner:
			'Beacon-model C2 with dual Python/C implants (~29 task types each), mTLS transport, AES-256-GCM encryption, a Svelte operator dashboard, and a from-scratch shellcode stager. I built it to understand modern C2 architecture at every layer.',
		outcome:
			'490 tests · 29 Python + 28 C task types · mTLS + HMAC endpoints · AES-256-GCM · SOCKS5 proxy · HTML smuggling dropper · shellcode stager',
		stack: ['Python', 'C', 'Svelte 5', 'mTLS', 'SQLite', 'libcurl'],
		color: '#f59e0b',
		icon: 'shield',
		featured: true,
		writeup: '/blog/building-a-c2-framework',
		note: 'Educational / authorized targets only · source on request'
	};

	const projects: Project[] = [
		{
			title: 'Offensive Security Bootcamp Portal',
			oneLiner:
				'A searchable SvelteKit portal for a Markdown-first offensive security curriculum: modules, CTF prep, labs, Android material, progress tracking, and review paths.',
			outcome:
				'Markdown ingestion · generated content index · searchable library · local progress export/import · direct lesson URLs',
			stack: ['SvelteKit', 'TypeScript', 'Markdown', 'Security Education'],
			color: '#14b8a6',
			icon: 'shield',
			note: 'Local labs only · source on request'
		},
		{
			title: 'CDN from First Principles',
			oneLiner:
				'A toy content delivery network with edge caching, origin pull, RFC 7234 cache validation, and geographic routing. I built it to understand CDN internals without leaning on libraries.',
			outcome:
				'Origin-pull + edge cache · DNS-based geo routing · cache-control header parsing · invalidation API',
			stack: ['Python', 'HTTP', 'DNS', 'Caching'],
			color: '#22d3ee',
			icon: 'network',
			repo: 'https://github.com/iFernandez96/CDN'
		},
		{
			title: 'Recursive DNS Resolver',
			oneLiner:
				'An iterative resolver written against the RFC 1035 wire format, no library shortcuts. It walks roots to TLDs to authoritative servers, handles A/AAAA/MX/CNAME, and retries on truncation.',
			outcome:
				'Zero external DNS libs · UDP wire-format parser/encoder · root-hint bootstrap · TCP retry on TC bit',
			stack: ['Python', 'DNS', 'UDP', 'Networking'],
			color: '#22d3ee',
			icon: 'terminal',
			repo: 'https://github.com/iFernandez96/dnsResolver'
		},
		{
			title: 'Home Security Dashboard',
			oneLiner:
				'A local-only console for home cameras and sensors with real-time alerts and a plain web interface. Self-hosted, no cloud round-trip.',
			outcome:
				'WebSocket-driven real-time UI · multi-feed video · sensor event stream · zero external dependencies at runtime',
			stack: ['SvelteKit', 'TypeScript', 'WebSockets', 'IoT'],
			color: '#818cf8',
			icon: 'nodes',
			repo: 'https://github.com/iFernandez96/HomeCameraSystem'
		}
	];

	const sideProjects: SideProject[] = [];

	// Pointer tracking for BeaconUI showcase, rAF-gated, fine-pointer only
	onMount(() => {
		const showcase = document.querySelector('.beacon-showcase') as HTMLElement | null;
		if (!showcase) return;

		const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
		const fineMql = window.matchMedia('(hover: hover) and (pointer: fine)');

		if (motionMql.matches || !fineMql.matches) return;

		let rafId = 0;
		let px = 0, py = 0;
		let dirty = false;

		function apply() {
			showcase!.style.setProperty('--beacon-mx', `${px.toFixed(1)}%`);
			showcase!.style.setProperty('--beacon-my', `${py.toFixed(1)}%`);
			dirty = false;
			rafId = 0;
		}

		function onMove(e: PointerEvent) {
			const rect = showcase!.getBoundingClientRect();
			px = ((e.clientX - rect.left) / rect.width) * 100;
			py = ((e.clientY - rect.top) / rect.height) * 100;
			if (!dirty) {
				dirty = true;
				rafId = requestAnimationFrame(apply);
			}
		}

		showcase.addEventListener('pointermove', onMove, { passive: true });

		const motionHandler = (e: MediaQueryListEvent) => {
			if (e.matches) showcase!.removeEventListener('pointermove', onMove);
		};
		motionMql.addEventListener('change', motionHandler);

		return () => {
			showcase!.removeEventListener('pointermove', onMove);
			motionMql.removeEventListener('change', motionHandler);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<section
	id="projects"
	aria-labelledby="projects-heading"
	class="py-16 md:py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<!-- Section header -->
		<div use:reveal={'heading'} class="mb-14">
			<p class="font-mono text-[var(--color-text-muted)] text-xs tracking-[0.3em] mb-3">04 / PROJECTS</p>
			<h2 id="projects-heading" class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] mb-4" style="letter-spacing: -0.02em;">
				Selected work
			</h2>
			<p class="text-[var(--color-text-muted)] max-w-xl">
				Personal projects I'd actually point a hiring manager at. Each links to its source, or says when it's private.
			</p>
		</div>

		<!-- ===== BeaconUI SHOWCASE BAND ===== -->
		<div use:reveal={'body'} class="mb-14">
			<article
				class="beacon-showcase relative rounded-xl border overflow-hidden"
				style="
					background: var(--color-bg-primary);
					border-color: rgba(245,158,11,0.25);
					box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.1);
					--beacon-mx: 50%;
					--beacon-my: 50%;
				"
				aria-label="Featured project: {featured.title}"
			>
				<!-- Amber radial glow from bottom-right corner (decorative) -->
				<div
					class="absolute bottom-0 right-0 pointer-events-none"
					style="width: 600px; height: 400px; background: radial-gradient(ellipse at 80% 90%, rgba(245,158,11,0.10) 0%, transparent 60%);"
					aria-hidden="true"
				></div>

				<!-- Pointer spotlight layer: amber ~12%, hover:hover + fine-pointer only via CSS -->
				<div class="beacon-spotlight absolute inset-0 pointer-events-none" aria-hidden="true"></div>

				<div class="relative z-10 p-8 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
					<!-- Left column: label + title + one-liner + note + links -->
					<div>
						<div class="flex items-center gap-3 mb-5">
							<span class="font-mono text-xs tracking-[0.2em] uppercase px-2.5 py-1 rounded"
								style="background: rgba(245,158,11,0.12); color: var(--color-accent-amber); border: 1px solid rgba(245,158,11,0.35);">
								Now building
							</span>
						</div>

						<h3 class="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight" style="letter-spacing: -0.03em;">
							BeaconUI
						</h3>
						<p class="text-base text-[var(--color-text-secondary)] leading-relaxed mb-5">
							{featured.oneLiner}
						</p>

						{#if featured.note}
							<span
								class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-mono mb-6 w-fit"
								style="background: rgba(245,158,11,0.08); color: var(--color-accent-amber); border: 1px solid rgba(245,158,11,0.25);"
							>
								{featured.note}
							</span>
						{/if}

						<div class="flex flex-wrap gap-1.5 mb-6">
							{#each featured.stack as tag (tag)}
								<span class="font-mono text-xs text-[var(--color-text-secondary)] px-2 py-0.5 rounded"
									style="background: var(--color-bg-surface); border: 1px solid var(--color-border);">
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex flex-wrap gap-5 font-mono text-sm">
							{#if featured.writeup}
								<a href={featured.writeup} class="inline-flex items-center gap-1.5 text-[var(--color-accent-cyan)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
									writeup
								</a>
							{/if}
						</div>
					</div>

					<!-- Right column: top features -->
					<div>
						<p class="font-mono text-xs text-[var(--color-text-muted)] tracking-[0.2em] uppercase mb-5">// top features</p>
						<ul class="space-y-2.5">
							{#each beaconFeatures as feat}
								<li class="flex items-start gap-2.5 text-[var(--color-text-secondary)] text-[14px] leading-snug">
									<span class="text-[var(--color-accent-amber)] mt-0.5 shrink-0 text-xs">▸</span>
									<span>{feat}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</article>
		</div>

		<!-- ===== QUIET GRID, other projects ===== -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
			{#each projects as project, i (project.title)}
				<div use:reveal={{ role: 'card', i }}>
					<article
						class="quiet-card group relative rounded-lg p-5 border flex flex-col h-full"
						style="
							background: var(--color-bg-primary);
							border-color: var(--color-border);
							--card-color: {project.color};
						"
					>
						<div
							class="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style="background: linear-gradient(90deg, {project.color}, transparent);"
							aria-hidden="true"
						></div>

						<div class="flex items-start justify-between mb-3">
							<span style="color: {project.color};" aria-hidden="true">
								{#if project.icon === 'nodes'}
									<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
										<line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="7" y1="19" x2="17" y2="19"/>
									</svg>
								{:else if project.icon === 'network'}
									<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<rect x="2" y="9" width="6" height="4" rx="1"/><rect x="16" y="3" width="6" height="4" rx="1"/><rect x="16" y="17" width="6" height="4" rx="1"/>
										<line x1="8" y1="11" x2="16" y2="5"/><line x1="8" y1="11" x2="16" y2="19"/>
									</svg>
								{:else if project.icon === 'terminal'}
									<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
									</svg>
								{:else if project.icon === 'shield'}
									<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z"/>
									</svg>
								{/if}
							</span>
						</div>

						<h3 class="quiet-title text-sm font-semibold text-[var(--color-text-primary)] mb-2 transition-colors leading-snug" style="letter-spacing: -0.01em;">
							{project.title}
						</h3>

						{#if project.note}
							<span
								class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded font-mono mb-2 w-fit"
								style="background: rgba(245,158,11,0.08); color: var(--color-accent-amber); border: 1px solid rgba(245,158,11,0.2);"
							>
								{project.note}
							</span>
						{/if}

						<p class="text-[var(--color-text-secondary)] text-xs leading-relaxed mb-3 flex-1">
							{project.oneLiner}
						</p>

						<div class="flex flex-wrap gap-1 mb-3">
							{#each project.stack as tag (tag)}
								<span class="font-mono text-[10px] text-[var(--color-text-muted)] px-1.5 py-0.5 rounded"
									style="background: var(--color-bg-surface); border: 1px solid var(--color-border);">
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex flex-wrap gap-3 mt-auto pt-3 border-t font-mono text-[11px]" style="border-color: var(--color-border);">
							{#if project.repo}
								<a href={project.repo} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-3 h-3" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
									source
								</a>
							{/if}
							{#if project.writeup}
								<a href={project.writeup} class="inline-flex items-center gap-1 text-[var(--color-accent-cyan)] hover:text-[var(--color-text-primary)] transition-colors">
									writeup
								</a>
							{/if}
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">demo ↗</a>
							{/if}
						</div>
					</article>
				</div>
			{/each}
		</div>

		{#if sideProjects.length > 0}
			<div use:reveal={'body'} class="mt-16">
				<p class="font-mono text-xs text-[var(--color-text-muted)] tracking-[0.2em] uppercase mb-4">
					<span class="text-[var(--color-text-muted)]">//</span> Side projects
				</p>
				<ul class="grid sm:grid-cols-2 gap-x-8 gap-y-4">
					{#each sideProjects as side (side.title)}
						<li class="border-l pl-4 py-1" style="border-color: var(--color-border);">
							<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1">
								<h4 class="font-semibold text-[var(--color-text-primary)] text-sm">{side.title}</h4>
								<div class="flex gap-3 font-mono text-xs">
									{#if side.repo}
										<a href={side.repo} target="_blank" rel="noopener noreferrer" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors">source ↗</a>
									{/if}
									{#if side.demo}
										<a href={side.demo} target="_blank" rel="noopener noreferrer" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors">demo ↗</a>
									{/if}
								</div>
							</div>
							<p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-1">{side.oneLiner}</p>
							<p class="font-mono text-xs text-[var(--color-text-muted)]">{side.stack.join(' · ')}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div use:reveal={'body'} class="mt-12 text-center">
			<a
				href="https://github.com/iFernandez96"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors text-sm"
			>
				More on GitHub
				<svg class="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M7 17l9.2-9.2M17 17V7H7" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	/* ===== BeaconUI showcase ===== */

	/* Pointer spotlight: amber radial via CSS vars, only on fine-pointer hover devices */
	.beacon-spotlight {
		border-radius: inherit;
	}

	@media (hover: hover) and (pointer: fine) {
		.beacon-showcase:hover .beacon-spotlight {
			background: radial-gradient(
				circle 400px at var(--beacon-mx, 50%) var(--beacon-my, 50%),
				rgba(245, 158, 11, 0.12) 0%,
				transparent 65%
			);
		}
	}

	/* ===== Quiet grid cards ===== */
	.quiet-card {
		transition: border-color 0.25s ease;
	}
	/* Restrained: border brightens only, no glow shadow */
	.quiet-card:hover {
		border-color: color-mix(in srgb, var(--card-color) 30%, transparent) !important;
	}
	.quiet-card:hover .quiet-title {
		color: var(--card-color);
	}

	:global(html[data-theme='light']) .beacon-showcase {
		box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(245,158,11,0.1);
	}

	@media (prefers-reduced-motion: reduce) {
		.beacon-spotlight { display: none; }
		.quiet-card { transition: none; }
	}
</style>
