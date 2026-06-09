<script lang="ts">
	// Depth tiers instead of a 1–5 numeric meter:
	//   'core'    → production-proven, reach for daily
	//   'working' → ship real work with it
	//   'building'→ actively leveling up (the pivot)
	type Tier = 'core' | 'working' | 'building';

	const tierLabel: Record<Tier, string> = {
		core: 'Core',
		working: 'Working',
		building: 'Building'
	};

	// Tier text uses theme-aware neutral tokens (not the raw accent hex) so the
	// 11px pill text clears WCAG AA contrast in BOTH themes; depth still reads via
	// brightness (core brightest → building dimmest). The accent stays in the
	// pill border/background (decorative, exempt from text-contrast).
	const tierText: Record<Tier, string> = {
		core: 'var(--color-text-primary)',
		working: 'var(--color-text-secondary)',
		building: 'var(--color-text-muted)'
	};

	const skillGroups: {
		title: string;
		color: string;
		icon: string;
		description: string;
		skills: { name: string; tier: Tier }[];
	}[] = [
		{
			title: 'Systems & Embedded',
			color: '#22d3ee',
			icon: 'chip',
			description: 'Where 9 years live. Production firmware, kernel, real-time.',
			skills: [
				{ name: 'C / C++', tier: 'core' },
				{ name: 'Embedded Systems', tier: 'core' },
				{ name: 'Linux Kernel', tier: 'core' },
				{ name: 'ARM Assembly', tier: 'core' },
				{ name: 'RTOS / FreeRTOS', tier: 'core' },
				{ name: 'Device Drivers', tier: 'core' }
			]
		},
		{
			title: 'Security & Offensive',
			color: '#f59e0b',
			icon: 'shield',
			description: 'Active focus — the deliberate pivot into red team.',
			skills: [
				{ name: 'C2 / RAT design', tier: 'working' },
				{ name: 'Network Analysis', tier: 'working' },
				{ name: 'Android Pentesting', tier: 'building' },
				{ name: 'Reverse Engineering', tier: 'building' },
				{ name: 'Frida / Objection', tier: 'building' },
				{ name: 'IDA / Ghidra', tier: 'building' }
			]
		},
		{
			title: 'Languages & Tools',
			color: '#818cf8',
			icon: 'code',
			description: 'Reach for outside the deep-systems work — automation, web, ML.',
			skills: [
				{ name: 'Python', tier: 'core' },
				{ name: 'Bash / Shell', tier: 'core' },
				{ name: 'Git / GitHub', tier: 'core' },
				{ name: 'TypeScript', tier: 'working' },
				{ name: 'Docker', tier: 'working' },
				{ name: 'SvelteKit', tier: 'working' }
			]
		}
	];
</script>

<section
	id="skills"
	class="py-16 md:py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<div class="reveal flex flex-wrap items-end justify-between gap-4 mb-12" style="animation-delay: 0ms;">
			<div>
				<p class="font-mono text-[var(--color-text-muted)] text-xs tracking-[0.3em] mb-3">02 / SKILLS</p>
				<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
					Toolkit
				</h2>
			</div>
			<p class="font-mono text-[13px] text-[var(--color-text-muted)]">
				<span class="text-[var(--color-text-secondary)]">//</span> grouped by depth, not a star rating
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
						<p class="text-[13px] text-[var(--color-text-muted)] mb-5 leading-relaxed pl-2">
							{group.description}
						</p>
						<ul class="flex flex-col gap-2.5">
							{#each group.skills as skill (skill.name)}
								<li class="flex items-center justify-between gap-3">
									<span class="font-mono text-sm text-[var(--color-text-secondary)]">{skill.name}</span>
									<span
										class="tier-tag shrink-0 font-mono text-[11px] tracking-wide px-2 py-0.5 rounded-full"
										style="color: {tierText[skill.tier]}; border: 1px solid color-mix(in srgb, {group.color} {skill.tier === 'building' ? '18%' : '32%'}, transparent); background: color-mix(in srgb, {group.color} {skill.tier === 'building' ? '6%' : '10%'}, transparent);"
									>
										{tierLabel[skill.tier]}
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
