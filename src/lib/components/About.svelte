<script lang="ts">
	// Facts unique to About. The role/prior/stack/target now live only in the
	// Hero quick-facts aside; kept here are the details the Hero doesn't show.
	const details = [
		{ label: 'Location', value: 'California, USA' },
		{ label: 'Education', value: 'B.S. Computer Science, CSUMB' }
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
			<p class="font-mono text-[var(--color-text-muted)] text-[13px] tracking-[0.3em] mb-3">01 / ABOUT</p>
			<h2 class="text-4xl md:text-5xl font-medium text-[var(--color-text-primary)]" style="letter-spacing: -0.02em;">
				Background
			</h2>
		</div>

		<div class="grid md:grid-cols-12 gap-10 items-start">
			<!-- Left: prose, pivot-first -->
			<div class="md:col-span-7 reveal min-w-0" style="animation-delay: 80ms;">
				<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-5">
					I'm moving into <span class="text-[var(--color-accent-amber)] font-semibold">Android security and red teaming</span>: the same instinct that drove the systems work, pointed at where systems break instead of how they run. If it's low-level, I want to understand it well enough to take it apart.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-5">
					I shipped my first Linux kernel module in 2018 and have worked low in the stack ever since: embedded firmware, kernel drivers, real-time computer vision on custom ARM hardware. Bootloader to user-space, hardware bring-up to field deployment. You can't reliably break a system you don't already know how to build.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">
					Today I'm at <a class="text-[var(--color-text-primary)] font-semibold underline underline-offset-2 hover:text-[var(--color-accent-cyan)] transition-colors" href="https://www.apple.com/" target="_blank" rel="noopener noreferrer">Apple</a>
					(contract via Sasken Technologies) on hardware and firmware integration. Before that, eight years at
					<a class="text-[var(--color-text-primary)] font-semibold underline underline-offset-2 hover:text-[var(--color-accent-cyan)] transition-colors" href="https://www.gantz-mountain.com/" target="_blank" rel="noopener noreferrer">Gantz-Mountain</a>,
					a defense AI startup in Monterey building low-level systems on custom embedded hardware. The security work runs alongside both, aimed at a new layer of the stack.
				</p>

				<!-- What I'm good for -->
				<div>
					<p class="font-mono text-[13px] text-[var(--color-text-muted)] tracking-[0.2em] mb-3">
						<span class="text-[var(--color-text-muted)]">//</span> WHAT I'M GOOD FOR
					</p>
					<ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
						{#each goodFor as item (item)}
							<li class="flex items-start gap-2 text-[15px] text-[var(--color-text-primary)]">
								<span class="text-[var(--color-text-muted)] mt-0.5 shrink-0">▸</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Right: availability status + distinct details (no duplicate of Hero facts) -->
			<div class="md:col-span-5 reveal min-w-0 w-full space-y-6" style="animation-delay: 160ms;">
				<!-- Availability status -->
				<div
					class="rounded-lg border p-6"
					style="background: var(--color-bg-secondary); border-color: var(--color-border);"
				>
					<div class="flex items-center gap-2.5 mb-3">
						<span class="status-dot" aria-hidden="true"></span>
						<span class="font-mono text-[13px] tracking-wide text-[var(--color-accent-amber)]">
							Open to work
						</span>
					</div>
					<p class="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
						Looking for <span class="text-[var(--color-text-primary)] font-semibold">red team / offensive security</span>
						roles, full-time. Email me at
						<a
							class="text-[var(--color-accent-cyan)] underline underline-offset-2 break-words"
							href="mailto:israelfernandez96@gmail.com"
						>israelfernandez96@gmail.com</a>.
					</p>
				</div>

				<!-- Distinct details -->
				<dl class="grid grid-cols-1 gap-px rounded-lg overflow-hidden border"
					style="background: var(--color-border); border-color: var(--color-border);">
					{#each details as item (item.label)}
						<div class="flex items-baseline justify-between gap-4 px-5 py-4"
							style="background: var(--color-bg-secondary);">
							<dt class="font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-muted)] shrink-0">{item.label}</dt>
							<dd class="text-[15px] text-[var(--color-text-primary)] text-right break-words min-w-0">{item.value}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<style>
	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		background: var(--color-accent-amber);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent-amber) 70%, transparent);
		animation: status-pulse 2.4s ease-out infinite;
		flex-shrink: 0;
	}

	@keyframes status-pulse {
		0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent-amber) 60%, transparent); }
		70% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-accent-amber) 0%, transparent); }
		100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent-amber) 0%, transparent); }
	}

	@media (prefers-reduced-motion: reduce) {
		.status-dot { animation: none; }
	}
</style>
