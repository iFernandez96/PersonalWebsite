<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		let rafId = 0;
		function update() {
			rafId = 0;
			const doc = document.documentElement;
			const scrolled = window.scrollY;
			const max = doc.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0;
		}
		function schedule() {
			if (rafId) return;
			rafId = requestAnimationFrame(update);
		}
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		update();
		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<div class="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
	<div class="reading-progress-bar" style="transform: scaleX({progress / 100})"></div>
</div>

<style>
	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 60;
		pointer-events: none;
		background: var(--surface-tint-soft);
	}
	.reading-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-indigo));
		transform-origin: left center;
		will-change: transform;
		transition: transform 0.08s linear;
	}

	@media (prefers-reduced-motion: reduce) {
		.reading-progress-bar { transition: none; }
	}
</style>
