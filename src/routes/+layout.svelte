<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Start as "print" (non-blocking); flip to "all" on mount so the font loads without blocking render.
	let fontMedia = $state('print');
	onMount(() => { fontMedia = 'all'; });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap"
		media={fontMedia}
	/>
</svelte:head>

{@render children()}
