<script lang="ts">
	import { onMount } from 'svelte';

	const roles = [
		'Systems Software Engineer',
		'Security Researcher',
		'Embedded Systems Developer',
		'Android Pentester in Training',
		'Passionate Mentor'
	];

	let displayText = $state(roles[0]);
	let reducedMotion = $state(false);

	const TYPE_MS = 60;
	const DELETE_MS = 35;
	const HOLD_MS = 2200;

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
		let charIndex = 0;
		let deleting = false;
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
					timeoutId = window.setTimeout(() => {
						deleting = true;
						tick();
					}, HOLD_MS);
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

		timeoutId = window.setTimeout(tick, TYPE_MS);

		return () => {
			stopped = true;
			if (timeoutId) clearTimeout(timeoutId);
			mql.removeEventListener('change', mqlHandler);
		};
	});
</script>

<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background layers -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<!-- Grid -->
		<div
			class="absolute inset-0"
			style="background-image: linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%);"
		></div>
		<!-- Glow orb: cyan top-left -->
		<div
			class="absolute hero-orb"
			style="top: 10%; left: 8%; width: 420px; height: 420px; background: radial-gradient(circle, rgba(34,211,238,0.18), transparent 65%); filter: blur(32px);"
		></div>
		<!-- Glow orb: indigo bottom-right -->
		<div
			class="absolute hero-orb"
			style="bottom: 5%; right: 5%; width: 480px; height: 480px; background: radial-gradient(circle, rgba(129,140,248,0.15), transparent 65%); filter: blur(32px);"
		></div>
		<!-- Center radial -->
		<div
			class="absolute inset-0"
			style="background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(34,211,238,0.06) 0%, transparent 70%);"
		></div>
		<!-- Bottom fade -->
		<div
			class="absolute bottom-0 left-0 right-0 h-48"
			style="background: linear-gradient(to bottom, transparent, var(--color-bg-primary));"
		></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-6 text-center py-28 md:py-0">
		<p class="font-mono text-[var(--color-accent-cyan)] text-xs md:text-sm tracking-[0.3em] mb-5 opacity-0 animate-[fadeInDown_0.6s_ease_0.2s_forwards]">
			HELLO, WORLD!
		</p>
		<p class="font-mono text-[var(--color-text-primary)] text-md md:text-md tracking-[0.3em] mb-5 opacity-0 animate-[fadeInDown_0.6s_ease_0.2s_forwards]">My Name Is</p>
		<h1
			class="text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-5 opacity-0 animate-[fadeInUp_0.6s_ease_0.4s_forwards]"
			style="letter-spacing: -0.02em; line-height: 1.1;"
		>
			Israel Fernandez
		</h1>

		<div class="h-9 md:h-10 flex items-center justify-center mb-6 opacity-0 animate-[fadeInUp_0.6s_ease_0.6s_forwards]">
			<span class="font-mono text-lg md:text-2xl text-[var(--color-text-secondary)]" aria-live="polite">
				{displayText}<span class="type-cursor" aria-hidden="true"></span>
			</span>
		</div>

		<p
			class="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-[fadeInUp_0.6s_ease_0.8s_forwards]"
		>
			Building at the intersection of <span class="text-[var(--color-text-primary)]">low-level systems</span>,
			<span class="text-[var(--color-text-primary)]">embedded security</span>, and
			<span class="text-[var(--color-text-primary)]">intelligent automation</span>.
			Currently training for transitioning into Offensive Security.
		</p>

		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-[fadeInUp_0.6s_ease_1s_forwards]">
			<a
				href="#projects"
				class="cta-primary px-8 py-3 rounded text-sm font-semibold tracking-wide transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				style="background: linear-gradient(135deg, #22d3ee, #818cf8); color: #080d1a; box-shadow: 0 0 16px rgba(34,211,238,0.25);"
			>
				View My Work
			</a>
			<a
				href="#contact"
				class="cta-secondary px-8 py-3 border border-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
			>
				Get In Touch
			</a>
		</div>

		<!-- Stats row with dividers -->
		<div class="mt-14 md:mt-16 opacity-0 animate-[fadeInUp_0.6s_ease_1.2s_forwards]">
			<div class="flex flex-wrap justify-center items-stretch gap-0 max-w-3xl mx-auto border-y" style="border-color: var(--color-border);">
				{#each [
					{ value: '9+', label: 'Years Experience' },
					{ value: '10+', label: 'Projects Shipped' },
					{ value: 'C/C++', label: 'Primary Language' },
					{ value: 'Apple', label: 'Current Client' }
				] as stat, idx (stat.label)}
					<div
						class="flex-1 min-w-[130px] text-center py-4 px-3"
						style="{idx > 0 ? 'border-left: 1px solid var(--color-border);' : ''}"
					>
						<p class="font-mono text-xl md:text-2xl font-bold" style="color: var(--color-accent-cyan);">{stat.value}</p>
						<p class="text-[10px] md:text-xs text-[var(--color-text-muted)] tracking-wider mt-1 uppercase">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_1s_ease_1.8s_forwards]" aria-hidden="true">
		<div class="flex flex-col items-center gap-2">
			<span class="text-[10px] text-[var(--color-text-muted)] tracking-widest font-mono">SCROLL</span>
			<div class="w-px h-10 relative overflow-hidden" style="background: var(--color-bg-elevated);">
				<div
					class="absolute top-0 left-0 right-0 h-1/2"
					style="background: linear-gradient(to bottom, var(--color-accent-cyan), transparent); animation: scrollLine 1.5s ease-in-out infinite;"
				></div>
			</div>
		</div>
	</div>
</section>

<style>
	.type-cursor {
		display: inline-block;
		width: 2px;
		height: 1.1em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: var(--color-accent-cyan);
		animation: cursor-blink 1.06s steps(2) infinite;
	}

	@keyframes cursor-blink {
		0%, 49% { opacity: 1; }
		50%, 100% { opacity: 0; }
	}

	.cta-primary {
		will-change: transform;
	}
	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 24px rgba(34, 211, 238, 0.4) !important;
	}
	.cta-secondary:hover {
		border-color: var(--color-accent-cyan);
		color: var(--color-text-primary);
	}

	.hero-orb {
		will-change: transform;
		transform: translateZ(0);
		contain: paint;
	}

	@media (prefers-reduced-motion: reduce) {
		.type-cursor,
		:global(#hero [class*="animate-"]) {
			animation: none !important;
			opacity: 1 !important;
		}
		.cta-primary:hover {
			transform: none;
		}
	}
</style>
