<script lang="ts">
	import { onMount } from 'svelte';
	import { createScrollWatcher } from '$lib/utils/scroll.js';

	let progress = $state(0);

	onMount(() => {
		function update() {
			const doc = document.documentElement;
			const scrolled = window.scrollY;
			const max = doc.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0;
		}
		const cleanup = createScrollWatcher(update);
		update();
		return cleanup;
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
