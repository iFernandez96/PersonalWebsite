<script lang="ts">
	const facts = [
		{ key: 'name', value: 'Israel Fernandez', color: 'var(--color-accent-cyan)' },
		{ key: 'location', value: 'California, USA', color: 'var(--color-text-primary)' },
		{ key: 'role', value: 'HW Systems SWE @ Apple (via Sasken)', color: 'var(--color-text-primary)' },
		{ key: 'prior', value: '8 yrs · Gantz-Mountain (defense AI)', color: 'var(--color-text-primary)' },
		{ key: 'education', value: 'B.S. CS, CSUMB', color: 'var(--color-text-primary)' },
		{ key: 'focus', value: 'Android attack surface, red team', color: 'var(--color-accent-amber)' },
		{ key: 'languages', value: 'C, C++, Python, ARM ASM', color: 'var(--color-text-primary)' },
		{ key: 'availability', value: 'open to red team contract / FTE', color: 'var(--color-accent-amber)' },
		{ key: 'email', value: 'israelfernandez96@gmail.com', color: 'var(--color-accent-cyan)' }
	];

	const goodFor = [
		'Linux kernel & driver dev',
		'ARM / embedded firmware',
		'Android reverse engineering',
		'Low-level network protocols'
	];
</script>

<section id="about" class="py-16 md:py-24 px-6 lg:px-10">
	<div class="max-w-7xl mx-auto">
		<div class="reveal mb-12" style="animation-delay: 0ms;">
			<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-3">01 / ABOUT</p>
			<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
				Background
			</h2>
		</div>

		<div class="grid md:grid-cols-12 gap-10 items-start">
			<!-- Left: prose, pivot-first -->
			<div class="md:col-span-7 reveal min-w-0" style="animation-delay: 80ms;">
				<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-5">
					I'm pivoting into <span class="text-[var(--color-accent-amber)] font-semibold">Android security and red teaming</span>.
					I'm fascinated by the offensive side: understanding systems deeply enough to find where they break.
					If it's low-level and technically interesting, I want to understand it.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-5">
					I shipped my first Linux kernel module in 2018 and haven't looked up since. The last nine years
					were embedded firmware, kernel drivers, and computer vision running on custom ARM hardware —
					real-time pipelines, hardware bring-up, the whole stack from bootloader to user-space.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">
					Today I'm at <a class="text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-accent-cyan)] transition-colors" href="https://www.apple.com/" target="_blank" rel="noopener noreferrer">Apple</a>
					(contract via Sasken Technologies) on hardware/firmware integration. Before that, eight years at
					<a class="text-[var(--color-text-primary)] font-semibold hover:text-[var(--color-accent-cyan)] transition-colors" href="https://www.gantz-mountain.com/" target="_blank" rel="noopener noreferrer">Gantz-Mountain</a> —
					a defense AI startup in Monterey shipping low-level systems on custom embedded platforms.
				</p>

				<!-- What I'm good for -->
				<div>
					<p class="font-mono text-xs text-[var(--color-text-muted)] tracking-[0.2em] mb-3">// WHAT I'M GOOD FOR</p>
					<ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2">
						{#each goodFor as item (item)}
							<li class="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
								<span class="text-[var(--color-accent-cyan)] mt-0.5 shrink-0">▸</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Right: config-card facts (replaces macOS terminal cliché) -->
			<div class="md:col-span-5 reveal min-w-0 w-full" style="animation-delay: 160ms;">
				<div
					class="rounded-lg overflow-hidden border min-w-0 max-w-full"
					style="background: var(--color-bg-secondary); border-color: var(--color-border);"
				>
					<div
						class="flex items-center gap-2 px-4 py-3 border-b font-mono text-xs"
						style="background: var(--color-bg-surface); border-color: var(--color-border);"
					>
						<span class="w-2 h-2 rounded-sm" style="background: var(--color-accent-cyan);" aria-hidden="true"></span>
						<span class="text-[var(--color-text-secondary)]">~/about.toml</span>
					</div>
					<div class="p-6 font-mono text-sm space-y-2.5">
						{#each facts as item (item.key)}
							<div class="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
								<span class="text-[var(--color-accent-indigo)] shrink-0">{item.key}</span>
								<span class="text-[var(--color-text-muted)] shrink-0">=</span>
								<span class="break-words min-w-0" style="color: {item.color};">"{item.value}"</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
