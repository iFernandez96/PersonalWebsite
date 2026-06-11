<script lang="ts">
	import { reveal } from '$lib/actions/reveal.js';

	const experiences = [
		{
			title: 'Independent Security Research',
			company: 'Self-directed',
			via: null,
			period: '2024 – Present',
			location: 'Remote',
			type: 'Research',
			color: 'var(--color-accent-amber)',
			description:
				'The pivot, made concrete. Started during the final year of my B.S., building offensive tooling and working through kernel and Android internals from an attacker\'s point of view.',
			highlights: [
				'Built BeaconUI, a 3-transport educational C2 framework (raw TCP, mTLS HTTPS, beacon/callback) with a Python and C implant and a Svelte operator dashboard',
				'Bypassed SSL-pinning and root detection on deliberately vulnerable Android targets with Frida, mapped to OWASP MASTG test cases',
				'Long-form writeups on protocol design, exploit reasoning, and tooling decisions'
			],
			stack: 'Python · C · Frida · mTLS · SQLite · Svelte 5'
		},
		{
			title: 'Hardware Systems Software Engineer',
			company: 'Apple',
			via: 'via Sasken Technologies',
			period: '2025 – Present',
			location: 'Cupertino, CA',
			type: 'Contract',
			color: 'var(--color-accent-cyan)',
			description:
				'Systems software, automation, and diagnostics across hardware platforms — bring-up, validation, the unglamorous integration work. It keeps me sharp on real silicon while the security side ramps up.',
			highlights: [
				'Python diagnostic + automation tooling adopted across multiple hardware platforms',
				'Triaged firmware-init and bring-up regressions with firmware and hardware teams',
				'Software and firmware integration on Apple silicon: bring-up support, validation, regression analysis'
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
				'Eight years at a defense AI startup — where I learned the low level for real: bare-metal firmware, kernel drivers, BSP customization, and real-time computer vision on custom embedded ARM hardware.',
			highlights: [
				'Redesigned the detection pipeline\'s memory layout (cache-aware) to raise computer-vision throughput 40% on the ARM target',
				'Diagnosed a thermal regression with the EE team, cutting thermal load 20%',
				'Linux kernel driver development and BSP customization for custom ARM platforms',
				'Mentored interns porting CV algorithms from MATLAB to C',
				'Hardware-in-the-loop testing and low-level networking for field deployments'
			],
			stack: 'C · C++ · Linux · ARM · MATLAB · Lua'
		}
	];
</script>

<section id="experience" aria-labelledby="experience-heading" class="pt-10 md:pt-14 pb-16 md:pb-24 px-6 lg:px-10" style="background: var(--color-bg-secondary);">
	<!-- max-w-4xl: pulled in from 6xl for better reading density -->
	<div class="max-w-4xl mx-auto">
		<div use:reveal={'heading'} class="mb-12">
			<p class="font-mono text-[var(--color-text-muted)] text-xs tracking-[0.3em] mb-3">03 / EXPERIENCE</p>
			<h2 id="experience-heading" class="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
				Track record
			</h2>
		</div>

		<div class="relative">
			<!-- Timeline line: draws in top→bottom on scroll into view -->
			<div
				use:reveal={'line'}
				class="absolute left-4 md:left-8 top-2 bottom-2 w-px"
				style="background: linear-gradient(to bottom, var(--color-accent-amber), var(--color-accent-cyan), var(--color-accent-indigo));"
				aria-hidden="true"
			></div>

			<div class="space-y-10">
				{#each experiences as exp, i (exp.title)}
					<div use:reveal={{ role: 'card', i }} class="relative pl-12 md:pl-24">
						<!-- Timeline dot -->
						<div
							class="absolute left-2.5 md:left-6 top-2 w-3 h-3 rounded-full border-2"
							style="background: {i === 0 ? exp.color : 'var(--color-bg-secondary)'}; border-color: {exp.color}; {i === 0 ? `box-shadow: 0 0 0 4px color-mix(in srgb, ${exp.color} 18%, transparent);` : ''}"
							aria-hidden="true"
						></div>

						<div
							class="exp-card rounded-lg p-6 border"
							style="background: var(--color-bg-primary); border-color: var(--color-border); --exp-color: {exp.color};"
						>
							<div class="flex flex-wrap items-start gap-3 mb-1">
								<h3 class="text-[var(--color-text-primary)] font-semibold text-lg leading-tight">
									{exp.title}
								</h3>
								<span
									class="px-2 py-0.5 text-xs rounded font-mono shrink-0"
									style="background: var(--surface-tint-soft); color: {exp.color}; border: 1px solid color-mix(in srgb, {exp.color} 30%, transparent);"
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

							<p class="text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-4">
								{exp.description}
							</p>

							<ul class="space-y-1.5 mb-4">
								{#each exp.highlights as highlight (highlight)}
									<li class="flex items-start gap-2 text-[15px] text-[var(--color-text-secondary)]">
										<span style="color: {exp.color};" class="mt-0.5 shrink-0" aria-hidden="true">→</span>
										<span>{highlight}</span>
									</li>
								{/each}
							</ul>

							<p class="font-mono text-[13px] text-[var(--color-text-muted)] pt-3 border-t" style="border-color: var(--color-border);">
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
		border-color: color-mix(in srgb, var(--exp-color) 35%, transparent) !important;
		box-shadow: 0 4px 24px color-mix(in srgb, var(--exp-color) 10%, transparent);
	}
</style>
