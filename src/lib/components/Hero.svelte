<script lang="ts">
	import { onMount } from 'svelte';

	const roles = [
		'Systems Software Engineer',
		'Embedded & Kernel Developer',
		'Moving into Red Team'
	];

	let displayText = $state(roles[0]);
	let announcedRole = $state(roles[0]);
	let reducedMotion = $state(false);

	const TYPE_MS = 55;
	const DELETE_MS = 30;
	const HOLD_MS = 2000;

	onMount(() => {
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mql.matches;
		const mqlHandler = (e: MediaQueryListEvent) => (reducedMotion = e.matches);
		mql.addEventListener('change', mqlHandler);

		if (reducedMotion) {
			displayText = roles[0];
			return () => mql.removeEventListener('change', mqlHandler);
		}

		let roleIndex = 0;
		let charIndex = roles[0].length;
		let deleting = true;
		let timeoutId = 0;
		let stopped = false;

		function tick() {
			if (stopped) return;
			if (document.hidden) {
				timeoutId = window.setTimeout(tick, 400);
				return;
			}
			const target = roles[roleIndex];

			if (!deleting) {
				if (charIndex < target.length) {
					charIndex++;
					displayText = target.slice(0, charIndex);
					timeoutId = window.setTimeout(tick, TYPE_MS);
				} else {
					// Role finished typing: announce the full role once (not per keystroke)
					announcedRole = target;
					timeoutId = window.setTimeout(() => { deleting = true; tick(); }, HOLD_MS);
				}
			} else {
				if (charIndex > 0) {
					charIndex--;
					displayText = target.slice(0, charIndex);
					timeoutId = window.setTimeout(tick, DELETE_MS);
				} else {
					deleting = false;
					roleIndex = (roleIndex + 1) % roles.length;
					timeoutId = window.setTimeout(tick, TYPE_MS);
				}
			}
		}

		// Begin by deleting the first role (which is shown statically while waiting)
		timeoutId = window.setTimeout(tick, HOLD_MS);

		return () => {
			stopped = true;
			if (timeoutId) clearTimeout(timeoutId);
			mql.removeEventListener('change', mqlHandler);
		};
	});
</script>

<section id="hero" class="relative min-h-[100svh] flex items-center overflow-hidden">
	<!-- Background layers -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<!-- Grid (smaller, dimmer for depth) -->
		<div
			class="absolute inset-0"
			style="background-image: linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%);"
		></div>
		<!-- Soft cyan ambience top-left, no filter blur -->
		<div
			class="absolute hero-orb"
			style="top: 5%; left: -8%; width: 720px; height: 720px; background: radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 60%);"
		></div>
		<!-- Soft indigo ambience bottom-right -->
		<div
			class="absolute hero-orb"
			style="bottom: -10%; right: -8%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 60%);"
		></div>
		<!-- Bottom fade so content below transitions cleanly -->
		<div
			class="absolute bottom-0 left-0 right-0 h-40"
			style="background: linear-gradient(to bottom, transparent, var(--color-bg-primary));"
		></div>
	</div>

	<div class="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 py-28 md:py-20 grid md:grid-cols-12 gap-8 items-center">
		<!-- Left: identity + lede + CTAs -->
		<div class="md:col-span-8">
			<p class="font-mono text-[var(--color-text-secondary)] text-sm md:text-base mb-6 opacity-0 animate-[fadeInDown_0.4s_ease_0.02s_forwards]">
				<span class="text-[var(--color-text-muted)]">$</span> whoami
			</p>

			<h1
				class="hero-name text-[clamp(2.75rem,8vw,7rem)] font-medium text-[var(--color-text-primary)] mb-5 opacity-0 animate-[fadeInUp_0.4s_ease_0.08s_forwards]"
			>
				Israel Fernandez
			</h1>

			<div class="h-9 md:h-11 flex items-center mb-7 opacity-0 animate-[fadeInUp_0.4s_ease_0.18s_forwards]">
				<span class="font-mono text-base md:text-xl text-[var(--color-text-secondary)]" aria-hidden="true">
					<span class="text-[var(--color-text-muted)]">›</span> {displayText}<span class="type-cursor"></span>
				</span>
				<span class="sr-only" aria-live="polite" aria-atomic="true">{announcedRole}</span>
			</div>

			<p
				class="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mb-3 leading-relaxed opacity-0 animate-[fadeInUp_0.4s_ease_0.28s_forwards]"
			>
				Nine years writing systems software: embedded firmware, Linux kernel drivers, and computer vision on custom ARM hardware. Now I reverse-engineer Android binaries and build offensive tooling, because the most interesting bug is the one nobody knew was there.
			</p>

			<p
				class="font-mono text-sm md:text-[15px] text-[var(--color-text-muted)] mb-9 opacity-0 animate-[fadeIn_0.35s_ease_0.4s_forwards]"
			>
				<span class="text-[var(--color-text-secondary)]">//</span> currently: Apple silicon by day, Android security research after hours
			</p>

			<div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.4s_ease_0.5s_forwards]">
				<a
					href="#projects"
					class="cta-primary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				>
					See projects
					<svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
				</a>
				<a
					href="/blog"
					class="cta-secondary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-semibold border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				>
					Read the writeups
				</a>
			</div>
		</div>

		<!-- Right: terse facts pane (desktop only) -->
		<aside class="hidden md:block md:col-span-4 opacity-0 animate-[fadeIn_0.4s_ease_0.55s_forwards]" aria-label="Quick facts">
			<dl class="font-mono text-[13px] space-y-3 text-right">
				<div>
					<dt class="text-[var(--color-text-muted)]">role</dt>
					<dd class="text-[var(--color-text-primary)]">Hardware Systems SWE</dd>
					<dd class="text-[var(--color-text-muted)]">@ Apple <span class="opacity-60">(via Sasken)</span></dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)]">prior</dt>
					<dd class="text-[var(--color-text-primary)]">Defense AI · 8 yrs</dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)]">stack</dt>
					<dd class="text-[var(--color-text-primary)]">C · C++ · Linux · ARM</dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)]">target</dt>
					<dd class="text-[var(--color-accent-amber)]">Android · red team</dd>
				</div>
			</dl>
		</aside>
	</div>

	<!-- Scroll hint chevron -->
	<a href="#about" class="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-[fadeIn_0.6s_ease_0.8s_forwards] text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors" aria-label="Scroll to about section">
		<span class="text-[10px] tracking-widest font-mono">SCROLL</span>
		<svg class="w-4 h-4 chevron-bounce" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
	</a>
</section>

<style>
	.hero-name {
		letter-spacing: -0.04em;
		line-height: 0.95;
	}

	.type-cursor {
		display: inline-block;
		width: 2px;
		height: 1em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: var(--color-accent-cyan);
		animation: cursor-blink 1.06s steps(2) infinite;
	}

	.cta-primary {
		background: linear-gradient(135deg, #22d3ee, #818cf8);
		color: #080d1a;
		box-shadow: 0 0 16px rgba(34,211,238,0.2);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 28px rgba(34, 211, 238, 0.45);
	}

	.cta-secondary {
		border-color: var(--color-bg-elevated);
		color: var(--color-text-secondary);
		transition: border-color 0.2s, color 0.2s;
	}
	.cta-secondary:hover {
		border-color: var(--color-accent-cyan);
		color: var(--color-text-primary);
	}

	.hero-orb {
		will-change: transform;
		transform: translateZ(0);
		contain: layout paint;
	}

	.chevron-bounce {
		animation: scrollChevronBounce 2s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.type-cursor,
		.chevron-bounce,
		:global(#hero [class*="animate-"]) {
			animation: none !important;
			opacity: 1 !important;
		}
		.cta-primary:hover, .cta-secondary:hover {
			transform: none;
		}
	}
</style>
