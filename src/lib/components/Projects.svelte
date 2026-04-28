<script lang="ts">
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

	const projects: Project[] = [
		{
			title: 'BeaconUI — Educational C2 Framework',
			oneLiner:
				'Three-transport red-team framework (raw TCP, mTLS HTTPS, beacon/callback) with a Svelte operator dashboard. Built to learn modern C2 architecture from first principles.',
			outcome:
				'78 end-to-end tests in 9s · 20 task types · dual-language implant (Python + C) · HMAC-SHA256 endpoint derivation · ±20% beacon jitter',
			stack: ['Python', 'C', 'Svelte 5', 'mTLS', 'SQLite', 'libcurl'],
			color: '#f59e0b',
			icon: 'shield',
			featured: true,
			repo: 'https://github.com/iFernandez96',
			writeup: '/blog/building-a-c2-framework',
			note: 'Educational / authorized targets only'
		},
		{
			title: 'CDN from First Principles',
			oneLiner:
				'A toy content delivery network implementing edge caching, origin pull, RFC 7234 cache validation, and geographic routing. Built to understand CDN internals without library shortcuts.',
			outcome:
				'Origin-pull + edge cache · DNS-based geo routing · cache-control header parsing · invalidation API',
			stack: ['Python', 'HTTP', 'DNS', 'Caching'],
			color: '#22d3ee',
			icon: 'network',
			repo: 'https://github.com/iFernandez96'
		},
		{
			title: 'Recursive DNS Resolver',
			oneLiner:
				'Iterative resolver written against RFC 1035 wire format — no library shortcuts. Walks roots → TLDs → authoritative servers, handles A/AAAA/MX/CNAME, retries on truncation.',
			outcome:
				'Zero external DNS libs · UDP wire-format parser/encoder · root-hint bootstrap · TCP retry on TC bit',
			stack: ['Python', 'DNS', 'UDP', 'Networking'],
			color: '#22d3ee',
			icon: 'terminal',
			repo: 'https://github.com/iFernandez96'
		},
		{
			title: 'Home Security Dashboard',
			oneLiner:
				'Local-only home security console for cameras and sensors with real-time alerts and a clean web interface. Self-hosted, no cloud round-trip.',
			outcome:
				'WebSocket-driven real-time UI · multi-feed video · sensor event stream · zero external dependencies at runtime',
			stack: ['SvelteKit', 'TypeScript', 'WebSockets', 'IoT'],
			color: '#818cf8',
			icon: 'nodes',
			repo: 'https://github.com/iFernandez96'
		}
	];
</script>

<section
	id="projects"
	class="py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<div class="reveal mb-12" style="animation-delay: 0ms;">
			<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-3">04 / PROJECTS</p>
			<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] mb-4" style="letter-spacing: -0.02em;">
				Selected work
			</h2>
			<p class="text-[var(--color-text-muted)] max-w-xl">
				Personal projects I'd actually point a hiring manager at. Each links to its source.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each projects as project, i (project.title)}
				<div
					class="reveal {project.featured ? 'lg:col-span-2 lg:row-span-1' : ''}"
					style="animation-delay: {80 + i * 80}ms;"
				>
					<article
						class="project-card group relative rounded-lg p-6 border flex flex-col h-full"
						style="
							background: var(--color-bg-primary);
							border-color: var(--color-border);
							--project-color: {project.color};
						"
					>
						<!-- Top accent line on hover -->
						<div
							class="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style="background: linear-gradient(90deg, {project.color}, transparent);"
							aria-hidden="true"
						></div>

						<div class="flex items-start justify-between mb-4">
							<span style="color: {project.color};" aria-hidden="true">
								{#if project.icon === 'nodes'}
									<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
										<line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/><line x1="7" y1="19" x2="17" y2="19"/>
									</svg>
								{:else if project.icon === 'network'}
									<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<rect x="2" y="9" width="6" height="4" rx="1"/><rect x="16" y="3" width="6" height="4" rx="1"/><rect x="16" y="17" width="6" height="4" rx="1"/>
										<line x1="8" y1="11" x2="16" y2="5"/><line x1="8" y1="11" x2="16" y2="19"/>
									</svg>
								{:else if project.icon === 'terminal'}
									<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
									</svg>
								{:else if project.icon === 'shield'}
									<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z"/>
									</svg>
								{/if}
							</span>
							<div class="flex items-center gap-1">
								{#if project.featured}
									<span class="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded" style="background: rgba(245,158,11,0.1); color: var(--color-accent-amber); border: 1px solid rgba(245,158,11,0.3);">Featured</span>
								{/if}
							</div>
						</div>

						<h3 class="project-title text-[var(--color-text-primary)] font-semibold text-lg mb-2 transition-colors" style="letter-spacing: -0.01em;">
							{project.title}
						</h3>

						{#if project.note}
							<span
								class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-mono mb-3 w-fit"
								style="background: rgba(245,158,11,0.08); color: var(--color-accent-amber); border: 1px solid rgba(245,158,11,0.25);"
							>
								{project.note}
							</span>
						{/if}

						<p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
							{project.oneLiner}
						</p>

						<p class="font-mono text-xs text-[var(--color-text-muted)] leading-relaxed mb-5 pl-3 border-l" style="border-color: var(--color-border);">
							{project.outcome}
						</p>

						<div class="flex flex-wrap gap-1.5 mb-5">
							{#each project.stack as tag (tag)}
								<span class="font-mono text-[11px] text-[var(--color-text-secondary)] px-2 py-0.5 rounded"
									style="background: var(--color-bg-surface); border: 1px solid var(--color-border);"
								>
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex flex-wrap gap-4 mt-auto pt-4 border-t font-mono text-xs" style="border-color: var(--color-border);">
							{#if project.repo}
								<a href={project.repo} target="_blank" rel="noopener noreferrer" class="proj-link inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
									source
								</a>
							{/if}
							{#if project.writeup}
								<a href={project.writeup} class="proj-link inline-flex items-center gap-1.5 text-[var(--color-accent-cyan)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
									writeup
								</a>
							{/if}
							{#if project.demo}
								<a href={project.demo} target="_blank" rel="noopener noreferrer" class="proj-link inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">demo ↗</a>
							{/if}
						</div>
					</article>
				</div>
			{/each}
		</div>

		<div class="reveal mt-12 text-center" style="animation-delay: 400ms;">
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
	.project-card {
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.project-card:hover {
		border-color: rgba(34, 211, 238, 0.35) !important;
		border-color: color-mix(in srgb, var(--project-color) 35%, transparent) !important;
		box-shadow: 0 8px 30px rgba(34, 211, 238, 0.12);
		box-shadow: 0 8px 30px color-mix(in srgb, var(--project-color) 12%, transparent);
	}
	.project-card:hover .project-title {
		color: var(--project-color);
	}
</style>
