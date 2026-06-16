<script lang="ts">
	import { onMount } from 'svelte';

	const roles = [
		'Systems Software Engineer',
		'Embedded & Kernel Developer',
		'Red Team / Offensive Security'
	];

	let displayText = $state(roles[0]);
	let announcedRole = $state(roles[0]);
	let reducedMotion = $state(false);
	let coarsePointer = $state(false);

	const TYPE_MS = 55;
	const DELETE_MS = 30;
	const HOLD_MS = 2000;

	onMount(() => {
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		const coarseMql = window.matchMedia('(pointer: coarse)');
		reducedMotion = mql.matches;
		coarsePointer = coarseMql.matches;

		const mqlHandler = (e: MediaQueryListEvent) => (reducedMotion = e.matches);
		const coarseHandler = (e: MediaQueryListEvent) => (coarsePointer = e.matches);
		mql.addEventListener('change', mqlHandler);
		coarseMql.addEventListener('change', coarseHandler);

		// --- Pointer parallax ---
		const hero = document.getElementById('hero');
		let rafId = 0;
		let pendingX = 0.5;
		let pendingY = 0.5;
		let dirty = false;

		function applyPointer() {
			if (hero) {
				// --px/--py: 0..1 normalized, centered at 0.5
				// Grid drifts OPPOSITE cursor: shift = -(px-0.5)*maxShift
				hero.style.setProperty('--px', String(pendingX));
				hero.style.setProperty('--py', String(pendingY));
				// spotlight position as percent strings for radial-gradient
				hero.style.setProperty('--mx', `${(pendingX * 100).toFixed(1)}%`);
				hero.style.setProperty('--my', `${(pendingY * 100).toFixed(1)}%`);
			}
			dirty = false;
			rafId = 0;
		}

		function onPointerMove(e: PointerEvent) {
			if (reducedMotion || coarsePointer) return;
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			pendingX = (e.clientX - rect.left) / rect.width;
			pendingY = (e.clientY - rect.top) / rect.height;
			if (!dirty) {
				dirty = true;
				rafId = requestAnimationFrame(applyPointer);
			}
		}

		// Initialize defaults
		if (hero) {
			hero.style.setProperty('--px', '0.5');
			hero.style.setProperty('--py', '0.5');
			hero.style.setProperty('--mx', '50%');
			hero.style.setProperty('--my', '50%');
		}

		hero?.addEventListener('pointermove', onPointerMove, { passive: true });

		// --- Typewriter ---
		if (reducedMotion) {
			displayText = roles[0];
			return () => {
				mql.removeEventListener('change', mqlHandler);
				coarseMql.removeEventListener('change', coarseHandler);
				hero?.removeEventListener('pointermove', onPointerMove);
				if (rafId) cancelAnimationFrame(rafId);
			};
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

		timeoutId = window.setTimeout(tick, HOLD_MS);

		return () => {
			stopped = true;
			if (timeoutId) clearTimeout(timeoutId);
			mql.removeEventListener('change', mqlHandler);
			coarseMql.removeEventListener('change', coarseHandler);
			hero?.removeEventListener('pointermove', onPointerMove);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<section id="hero" aria-labelledby="hero-heading" class="hero-section relative min-h-[100svh] flex items-center overflow-hidden">
	<!-- Background layers, all aria-hidden, decorative only -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<!-- Drifting grid: translates opposite pointer via CSS vars --px/--py -->
		<div class="hero-grid absolute inset-0"></div>

		<!-- Cursor spotlight: soft radial that follows the mouse -->
		<div class="hero-spotlight absolute inset-0"></div>

		<!-- One-shot scanline sweep (coarse/reduced-motion: hidden) -->
		{#if !coarsePointer && !reducedMotion}
			<div class="hero-scanline absolute left-0 right-0 h-px"></div>
		{/if}

		<!-- Static ambient orb, visible on coarse/reduced-motion too -->
		<div
			class="absolute"
			style="top: 5%; left: -8%; width: 720px; height: 720px; background: radial-gradient(circle, color-mix(in srgb, var(--color-accent-cyan) 8%, transparent) 0%, transparent 60%);"
		></div>

		<!-- Bottom fade -->
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
				id="hero-heading"
				class="hero-name mb-5 opacity-0 animate-[fadeInUp_0.4s_ease_0.08s_forwards]"
			>
				<!-- "Israel" stays in primary text color for contrast anchor -->
				<span class="text-[var(--color-text-primary)]">Israel</span><br>
				<!-- "Fernandez" gets the cyan→indigo gradient treatment -->
				<span class="hero-surname">Fernandez</span>
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
				Eight-plus years writing systems software. Embedded firmware, Linux kernel drivers, computer vision on custom ARM hardware. Now I point that same low-level depth at breaking things: building offensive tooling and ramping on reverse engineering. <span class="text-[var(--color-text-primary)] font-medium">You can't reliably break a system you don't already know how to build.</span>
			</p>

			<p
				class="font-mono text-sm md:text-[15px] text-[var(--color-text-muted)] mb-5 opacity-0 animate-[fadeIn_0.35s_ease_0.4s_forwards]"
			>
				<span class="text-[var(--color-text-secondary)]">//</span> currently: Apple silicon by day, offensive tooling and reverse engineering on my own time
			</p>

			<!-- Availability, surfaced above the fold next to the contact CTA -->
			<p class="inline-flex items-center gap-2 font-mono text-[13px] text-[var(--color-accent-amber)] mb-7 opacity-0 animate-[fadeIn_0.35s_ease_0.45s_forwards]">
				<span class="hero-status-dot" aria-hidden="true"></span>
				Open to full-time red team &amp; offensive security roles
			</p>

			<div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.4s_ease_0.5s_forwards]">
				<a
					href="mailto:israelfernandez96@gmail.com"
					class="cta-primary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				>
					<svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
					Get in touch
				</a>
				<a
					href="#projects"
					class="cta-secondary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-semibold border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				>
					See my work
					<svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
				</a>
				<a
					href="/Israel-Fernandez-Resume.pdf"
					download
					class="cta-secondary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-semibold border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				>
					<svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
					Resume
				</a>
			</div>

			<!-- Condensed facts for mobile, where the desktop aside is hidden -->
			<dl class="md:hidden mt-10 grid grid-cols-2 gap-x-5 gap-y-4 font-mono text-[12px] opacity-0 animate-[fadeIn_0.4s_ease_0.62s_forwards]" aria-label="Quick facts">
				<div>
					<dt class="text-[var(--color-text-muted)] mb-0.5">role</dt>
					<dd class="text-[var(--color-text-primary)]">Hardware Systems SWE</dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)] mb-0.5">prior</dt>
					<dd class="text-[var(--color-text-primary)]">Defense AI · 8 yrs</dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)] mb-0.5">stack</dt>
					<dd class="text-[var(--color-text-primary)]">C · C++ · Linux · ARM</dd>
				</div>
				<div>
					<dt class="text-[var(--color-text-muted)] mb-0.5">target</dt>
					<dd class="text-[var(--color-accent-amber)]">Android · red team</dd>
				</div>
			</dl>
		</div>

		<!-- Right: terse facts pane (desktop only) -->
		<aside class="hidden md:block md:col-span-4 opacity-0 animate-[fadeIn_0.4s_ease_0.55s_forwards]" aria-label="Quick facts">
			<dl class="font-mono text-[13px] space-y-3 pl-5 border-l" style="border-color: var(--color-border);">
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
	/* --px/--py: normalized 0–1 pointer position, defaulting to center (0.5) */
	.hero-section {
		--px: 0.5;
		--py: 0.5;
		--mx: 50%;
		--my: 50%;
	}

	/* Drifting grid, translates opposite the pointer for parallax feel.
	   Max drift: 18px. transition gives the lagged-follow feel. */
	.hero-grid {
		background-image:
			linear-gradient(color-mix(in srgb, var(--color-accent-cyan) 5%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 5%, transparent) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 80%);
		-webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 80%);
		/* Drift: shift opposite pointer. calc centers at 0, scales to ±18px */
		transform: translate3d(
			calc((0.5 - var(--px)) * 36px),
			calc((0.5 - var(--py)) * 20px),
			0
		);
		transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	/* Cursor spotlight: soft radial at pointer position.
	   The gradient is always painted at --mx/--my (updated via JS on rAF).
	   We transition opacity only — a compositor-only property — so pointermove
	   never triggers a repaint. The spotlight fades in on hover and out on leave. */
	.hero-spotlight {
		background: radial-gradient(
			circle 600px at var(--mx) var(--my),
			color-mix(in srgb, var(--color-accent-cyan) 7%, transparent) 0%,
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.hero-section:hover .hero-spotlight {
		opacity: 1;
	}

	/* Scanline: single horizontal bar, sweeps once on load */
	.hero-scanline {
		background: linear-gradient(
			to bottom,
			transparent,
			color-mix(in srgb, var(--color-accent-cyan) 35%, transparent) 50%,
			transparent
		);
		height: 2px;
		animation: scanline-sweep 1.8s cubic-bezier(0.4, 0, 0.6, 1) 0.6s forwards;
		/* will-change omitted: the translate3d keyframe already promotes a layer
		   during the one-shot sweep; keeping it would pin a GPU layer forever. */
	}

	/* H1 treatment */
	.hero-name {
		font-size: clamp(2.75rem, 8vw, 7rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 1.0;
	}

	/* Surname gradient: cyan→indigo background-clip */
	.hero-surname {
		display: inline-block;
		background: linear-gradient(135deg, var(--color-accent-cyan) 30%, var(--color-accent-indigo) 70%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent; /* fallback before clip applies */
	}
	/* Forced-colors / high-contrast disables background images, which would leave
	   the gradient-clipped surname painted in transparent ink (invisible). Revert
	   to a solid system color there. */
	@media (forced-colors: active) {
		.hero-surname {
			background: none;
			-webkit-text-fill-color: revert;
			color: revert;
		}
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

	.hero-status-dot {
		width: 7px;
		height: 7px;
		border-radius: 9999px;
		background: var(--color-accent-amber);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent-amber) 70%, transparent);
		animation: status-pulse 2.4s ease-out infinite;
		flex-shrink: 0;
	}

	.cta-primary {
		background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo));
		color: var(--color-bg-primary);
		box-shadow: 0 0 16px color-mix(in srgb, var(--color-accent-cyan) 20%, transparent);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 28px color-mix(in srgb, var(--color-accent-cyan) 45%, transparent);
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

	.chevron-bounce {
		animation: scrollChevronBounce 2s ease-in-out infinite;
	}

	/* Reduced motion: disable pointer effects, show all text immediately */
	@media (prefers-reduced-motion: reduce) {
		.hero-grid { transition: none; transform: none; }
		.hero-spotlight { transition: none; }
		.hero-scanline { display: none; }
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

	/* Coarse pointer (mobile): no spotlight tracking, static grid */
	@media (pointer: coarse) {
		.hero-grid { transition: none; transform: none; }
		.hero-spotlight { display: none; }
	}
</style>
