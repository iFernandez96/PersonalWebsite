<script lang="ts">
	const experiences = [
		{
			title: 'Independent Security Research',
			company: 'Self-directed',
			via: null,
			period: '2025 – Present',
			location: 'Remote',
			type: 'Research',
			color: 'var(--color-accent-amber)',
			description:
				'Building offensive tooling and reading kernel/Android internals with adversarial eyes — the visible half of a deliberate pivot from systems engineering into red team.',
			highlights: [
				'Built BeaconUI — a 3-transport educational C2 framework (raw TCP, mTLS HTTPS, beacon/callback) with Python + C implant and Svelte operator dashboard',
				'OWASP MASVS / MASTG study; Frida hooking on deliberately-vulnerable Android targets',
				'Long-form writeups on protocol design, exploit reasoning, and tooling decisions'
			],
			stack: 'Python · C · Frida · mTLS · SQLite · Svelte 5'
		},
		{
			title: 'Hardware Systems Software Engineer',
			company: 'Apple',
			via: 'via Sasken Technologies',
			period: '2024 – Present',
			location: 'Cupertino, CA',
			type: 'Contract',
			color: 'var(--color-accent-cyan)',
			description:
				'System-level software, automation, and diagnostics across hardware platforms. Cross-functional work with firmware and hardware teams in a high-scale production environment.',
			highlights: [
				'Built and maintained internal diagnostic + automation tooling used across hardware platforms',
				'Drove low-level bug triage with cross-functional firmware and hardware teams',
				'Software/firmware integration on Apple silicon — bring-up support, validation, regression analysis'
			],
			stack: 'C · C++ · Python · Linux · Shell'
		},
		{
			title: 'Systems Software Engineer',
			company: 'Gantz-Mountain Intelligence Automation Systems',
			via: null,
			period: '2016 – 2024',
			location: 'Monterey, CA',
			type: 'Full-time',
			color: 'var(--color-accent-indigo)',
			description:
				'Eight years at a defense AI startup. Bare-metal firmware, kernel drivers, BSP customization, real-time computer vision pipelines on custom embedded ARM hardware.',
			highlights: [
				'Increased computer vision processing throughput 40% via algorithm + memory layout redesign',
				'Reduced cooling cost 20% by diagnosing thermal regression with EE team using specialized instrumentation',
				'Linux kernel driver development and BSP customization for custom ARM platforms',
				'Mentored interns transitioning CV algorithms from MATLAB to C',
				'Hardware-in-the-loop testing, low-level networking protocols for field deployments'
			],
			stack: 'C · C++ · Linux · ARM · MATLAB · Lua'
		}
	];
</script>

<section id="experience" class="py-16 md:py-24 px-6 lg:px-10">
	<div class="max-w-6xl mx-auto">
		<div class="reveal mb-12" style="animation-delay: 0ms;">
			<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-3">03 / EXPERIENCE</p>
			<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
				Track record
			</h2>
		</div>

		<div class="relative">
			<!-- Timeline line -->
			<div
				class="absolute left-4 md:left-8 top-2 bottom-2 w-px"
				style="background: linear-gradient(to bottom, var(--color-accent-amber), var(--color-accent-cyan), var(--color-accent-indigo));"
				aria-hidden="true"
			></div>

			<div class="space-y-10">
				{#each experiences as exp, i (exp.title)}
					<div class="relative pl-12 md:pl-24 reveal" style="animation-delay: {80 + i * 100}ms;">
						<!-- Timeline dot -->
						<div
							class="absolute left-2.5 md:left-6 top-2 w-3 h-3 rounded-full border-2"
							style="background: var(--color-bg-primary); border-color: {exp.color}; {i === 0 ? `animation: pulse-glow 2s ease-in-out infinite; box-shadow: 0 0 6px ${exp.color};` : ''}"
							aria-hidden="true"
						></div>

						<div
							class="exp-card rounded-lg p-6 border"
							style="background: var(--color-bg-secondary); border-color: var(--color-border); --exp-color: {exp.color};"
						>
							<div class="flex flex-wrap items-start gap-3 mb-1">
								<h3 class="text-[var(--color-text-primary)] font-semibold text-lg leading-tight">
									{exp.title}
								</h3>
								<span
									class="px-2 py-0.5 text-xs rounded font-mono shrink-0"
									style="background: rgba(255,255,255,0.04); color: {exp.color}; border: 1px solid color-mix(in srgb, {exp.color} 30%, transparent);"
								>
									{exp.type}
								</span>
							</div>

							<div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
								<span class="font-semibold" style="color: {exp.color};">{exp.company}</span>
								{#if exp.via}
									<span class="text-[var(--color-text-muted)] text-sm">{exp.via}</span>
								{/if}
								<span class="text-[var(--color-text-muted)] hidden sm:inline">·</span>
								<span class="text-[var(--color-text-muted)] text-sm font-mono">{exp.period}</span>
								<span class="text-[var(--color-text-muted)] hidden sm:inline">·</span>
								<span class="text-[var(--color-text-muted)] text-sm">{exp.location}</span>
							</div>

							<p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
								{exp.description}
							</p>

							<ul class="space-y-1.5 mb-4">
								{#each exp.highlights as highlight (highlight)}
									<li class="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
										<span style="color: {exp.color};" class="mt-0.5 shrink-0" aria-hidden="true">→</span>
										<span>{highlight}</span>
									</li>
								{/each}
							</ul>

							<p class="font-mono text-xs text-[var(--color-text-muted)] pt-3 border-t" style="border-color: var(--color-border);">
								<span class="text-[var(--color-text-secondary)]">stack:</span> {exp.stack}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.exp-card {
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.exp-card:hover {
		border-color: rgba(34, 211, 238, 0.35) !important;
		border-color: color-mix(in srgb, var(--exp-color) 35%, transparent) !important;
		box-shadow: 0 4px 24px rgba(34, 211, 238, 0.1);
		box-shadow: 0 4px 24px color-mix(in srgb, var(--exp-color) 10%, transparent);
	}
</style>
