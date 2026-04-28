<script lang="ts">
	const skillGroups = [
		{
			title: 'Systems & Embedded',
			color: '#22d3ee',
			icon: 'chip',
			description: 'Where 9 years live. Production firmware, kernel, real-time.',
			skills: [
				{ name: 'C / C++', level: 4 },
				{ name: 'Embedded Systems', level: 4 },
				{ name: 'Linux Kernel', level: 4 },
				{ name: 'ARM Assembly', level: 4 },
				{ name: 'RTOS / FreeRTOS', level: 4 },
				{ name: 'Device Drivers', level: 4 }
			]
		},
		{
			title: 'Security & Offensive',
			color: '#f59e0b',
			icon: 'shield',
			description: 'Active focus. Honest level — pivoting in.',
			skills: [
				{ name: 'C2 / RAT design', level: 3 },
				{ name: 'Network Analysis', level: 3 },
				{ name: 'Android Pentesting', level: 2 },
				{ name: 'Reverse Engineering', level: 2 },
				{ name: 'Frida / Objection', level: 2 },
				{ name: 'IDA / Ghidra', level: 2 }
			]
		},
		{
			title: 'Languages & Tools',
			color: '#818cf8',
			icon: 'code',
			description: 'Reach for outside the deep-systems work — automation, web, ML.',
			skills: [
				{ name: 'Python', level: 4 },
				{ name: 'Bash / Shell', level: 4 },
				{ name: 'Git / GitHub', level: 4 },
				{ name: 'TypeScript', level: 3 },
				{ name: 'Docker', level: 3 },
				{ name: 'SvelteKit', level: 3 }
			]
		}
	];
</script>

<section
	id="skills"
	class="py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<div class="reveal flex flex-wrap items-end justify-between gap-4 mb-12" style="animation-delay: 0ms;">
			<div>
				<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-3">02 / SKILLS</p>
				<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
					Toolkit
				</h2>
			</div>
			<p class="font-mono text-xs text-[var(--color-text-muted)]">
				<span class="text-[var(--color-accent-cyan)]">//</span> rated 1–5 against production deliverables
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each skillGroups as group, i (group.title)}
				<div class="reveal" style="animation-delay: {80 + i * 80}ms;">
					<div
						class="skill-card relative rounded-lg p-6 border h-full"
						style="
							background: var(--color-bg-primary);
							border-color: var(--color-border);
							--card-color: {group.color};
						"
					>
						<!-- Vertical accent bar -->
						<span
							class="absolute left-0 top-6 w-[3px] h-10 rounded-r"
							style="background: {group.color};"
							aria-hidden="true"
						></span>

						<div class="flex items-center gap-3 mb-3 pl-2" style="color: {group.color};">
							{#if group.icon === 'chip'}
								<svg class="w-5 h-5 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<rect x="7" y="7" width="10" height="10" rx="1"/>
									<path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/>
								</svg>
							{:else if group.icon === 'shield'}
								<svg class="w-5 h-5 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z"/>
								</svg>
							{:else}
								<svg class="w-5 h-5 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="16 18 22 12 16 6"/>
									<polyline points="8 6 2 12 8 18"/>
								</svg>
							{/if}
							<h3 class="font-semibold text-[var(--color-text-primary)] text-base tracking-tight">
								{group.title}
							</h3>
						</div>
						<p class="text-xs text-[var(--color-text-muted)] mb-5 leading-relaxed pl-2">
							{group.description}
						</p>
						<ul class="flex flex-col gap-2.5">
							{#each group.skills as skill (skill.name)}
								<li class="flex items-center justify-between gap-3">
									<span class="font-mono text-xs text-[var(--color-text-secondary)]">{skill.name}</span>
									<span class="flex gap-1 shrink-0" aria-label={`${skill.name}: ${skill.level} of 5`}>
										{#each Array(5) as _, j}
											<span
												class="w-1.5 h-1.5 rounded-full"
												style="background: {j < skill.level ? group.color : 'rgba(255,255,255,0.10)'};"
											></span>
										{/each}
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skill-card {
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.skill-card:hover {
		border-color: rgba(34, 211, 238, 0.4) !important;
		border-color: color-mix(in srgb, var(--card-color) 40%, transparent) !important;
		box-shadow: 0 0 24px rgba(34, 211, 238, 0.12);
		box-shadow: 0 0 24px color-mix(in srgb, var(--card-color) 12%, transparent);
	}
</style>
