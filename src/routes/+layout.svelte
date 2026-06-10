<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	// Preload the visible hero-weight font (LCP candidate) so it arrives before CSS is parsed.
	// Operator hero uses Inter weight 500.
	import primaryFontUrl from '@fontsource/inter/files/inter-latin-500-normal.woff2?url';
	import interBodyFontUrl from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
	import interSemiboldFontUrl from '@fontsource/inter/files/inter-latin-600-normal.woff2?url';
	// Inter 700 = hero H1 (the LCP element); JetBrains Mono 600 = above-fold navbar logo.
	import interBoldFontUrl from '@fontsource/inter/files/inter-latin-700-normal.woff2?url';
	import monoFontUrl from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url';
	import monoSemiboldFontUrl from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2?url';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="font" type="font/woff2" href={primaryFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interBodyFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interSemiboldFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interBoldFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={monoFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={monoSemiboldFontUrl} crossorigin="anonymous" />
</svelte:head>

{@render children()}
