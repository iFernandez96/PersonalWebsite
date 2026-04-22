<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	const experiences = [
		{
			title: 'Hardware Systems Software Engineer',
			company: 'Apple',
			via: 'via Sasken Technologies',
			period: '2024 – Present',
			location: 'Cupertino, CA',
			type: 'Contract',
			color: 'var(--color-accent-cyan)',
			description: `Working on the software layer bridging Apple's hardware and firmware. Involved in low-level
			system integration, hardware bring-up support, and ensuring software correctness on cutting-edge
			Apple silicon platforms.`,
			highlights: [
				'Hardware/firmware software integration on Apple Silicon',
				'Low-level system debugging and validation',
				'Collaboration with hardware and firmware teams',
				'Performance analysis and optimization'
			]
		},
		{
			title: 'Systems Software Engineer',
			company: 'Gantz-Mountain Intelligence Automation Systems',
			via: null,
			period: '2016 – 2024',
			location: 'Monterey, CA',
			type: 'Full-time',
			color: 'var(--color-accent-indigo)',
			description: `~8 years at a defense AI startup building automation intelligence for real-world deployments.
			Worked across the full stack of embedded systems: from bare-metal firmware and custom hardware bring-up
			to computer vision pipelines and AI-assisted decision systems.`,
			highlights: [
				'Embedded C/C++ on custom ARM hardware platforms',
				'Linux kernel driver development and BSP customization',
				'Real-time computer vision pipeline design',
				'Hardware-in-the-loop testing and validation',
				'Low-level networking protocols for field deployments',
				'Cross-functional R&D'
			]
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="experience" bind:this={sectionEl} class="py-24 px-6 lg:px-10">
	<div class="max-w-6xl mx-auto">
		<div
			class="transition-[opacity,transform] duration-700"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 40}px);"
		>
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">03. EXPERIENCE</p>
			<h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-12">
				Where I've Worked
				<span class="block w-12 h-0.5 mt-4" style="background: linear-gradient(90deg, var(--color-accent-cyan), transparent);"></span>
			</h2>
		</div>

		<div class="relative">
			<!-- Timeline line -->
			<div
				class="absolute left-4 md:left-8 top-0 bottom-0 w-px"
				style="background: linear-gradient(to bottom, var(--color-accent-cyan), var(--color-accent-indigo), transparent);"
			></div>

			<div class="space-y-12">
				{#each experiences as exp, i (exp.title)}
					<div
						class="relative pl-12 md:pl-24 transition-[opacity,transform] duration-700"
						style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 40}px); transition-delay: {i * 150}ms;"
					>
						<!-- Timeline dot -->
						<div
							class="absolute left-2.5 md:left-6 top-1 w-3 h-3 rounded-full border-2"
							style="background: var(--color-bg-primary); border-color: {exp.color}; {i === 0 ? `animation: pulse-glow 2s ease-in-out infinite; box-shadow: 0 0 6px ${exp.color};` : ''}"
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
									class="px-2 py-0.5 text-xs rounded font-mono"
									style="background: {exp.color}1a; color: {exp.color}; border: 1px solid {exp.color}33;"
								>
									{exp.type}
								</span>
							</div>

							<div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
								<span class="font-semibold" style="color: {exp.color};">{exp.company}</span>
								{#if exp.via}
									<span class="text-[var(--color-text-muted)] text-sm">{exp.via}</span>
								{/if}
								<span class="text-[var(--color-text-muted)]">·</span>
								<span class="text-[var(--color-text-muted)] text-sm font-mono">{exp.period}</span>
								<span class="text-[var(--color-text-muted)]">·</span>
								<span class="text-[var(--color-text-muted)] text-sm">{exp.location}</span>
							</div>

							<p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
								{exp.description}
							</p>

							<ul class="space-y-1.5">
								{#each exp.highlights as highlight (highlight)}
									<li class="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
										<span style="color: {exp.color};" class="mt-0.5 shrink-0">▸</span>
										{highlight}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.exp-card {
		transition: border-color 0.3s, box-shadow 0.3s;
	}
	.exp-card:hover {
		border-color: color-mix(in srgb, var(--exp-color) 35%, transparent) !important;
		box-shadow: 0 4px 24px color-mix(in srgb, var(--exp-color) 10%, transparent);
	}
</style>
