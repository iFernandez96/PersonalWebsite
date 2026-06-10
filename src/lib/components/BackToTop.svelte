<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	function scrollTop() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
	}

	onMount(() => {
		let rafId = 0;
		function update() {
			rafId = 0;
			const next = window.scrollY > 600;
			if (next !== visible) visible = next;
		}
		function schedule() {
			if (rafId) return;
			rafId = requestAnimationFrame(update);
		}
		window.addEventListener('scroll', schedule, { passive: true });
		update();
		return () => {
			window.removeEventListener('scroll', schedule);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<button
	type="button"
	onclick={scrollTop}
	aria-label="Back to top"
	tabindex={visible ? 0 : -1}
	class="back-to-top fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border flex items-center justify-center"
	class:is-visible={visible}
	style="background: color-mix(in srgb, var(--color-bg-primary) 85%, transparent); border-color: var(--color-bg-elevated); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: var(--color-accent-cyan);"
>
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M12 19V5M5 12l7-7 7 7" />
	</svg>
</button>

<style>
	.back-to-top {
		opacity: 0;
		transform: translateY(16px);
		pointer-events: none;
		transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.2s ease, box-shadow 0.2s ease;
	}
	.back-to-top.is-visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}
	.back-to-top:hover {
		border-color: var(--color-accent-cyan) !important;
		box-shadow: 0 0 16px color-mix(in srgb, var(--color-accent-cyan) 35%, transparent);
		transform: translateY(-2px);
	}
	.back-to-top:focus-visible {
		outline: 2px solid var(--color-accent-cyan);
		outline-offset: 3px;
	}

	@media (prefers-reduced-motion: reduce) {
		.back-to-top {
			transition: opacity 0.15s ease;
			transform: none !important;
		}
		.back-to-top:hover {
			transform: none !important;
		}
	}
</style>
