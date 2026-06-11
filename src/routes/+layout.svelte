<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	// Preload only the fonts actually used above the fold on the homepage:
	// Inter 700 = hero H1 (LCP), Inter 600 = CTA buttons, Inter 400 = body/lede,
	// JetBrains Mono 400 = typewriter/whoami, JetBrains Mono 600 = navbar logo.
	// (Inter 500 is only used on blog/error pages and loads via app.css with swap.)
	import interBodyFontUrl from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
	import interSemiboldFontUrl from '@fontsource/inter/files/inter-latin-600-normal.woff2?url';
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

	onMount(() => {
		// Console easter egg — this audience opens DevTools; reward the poke.
		const mono = 'font-family:monospace';
		const cyan = `color:#22d3ee;font-weight:600;${mono}`;
		const amber = `color:#f59e0b;${mono}`;
		const dim = `color:#8694a8;${mono}`;
		const text = `color:#e7ecf3;${mono}`;
		/* eslint-disable no-console */
		console.log('%c// you opened the console. respect — poking at the surface is the whole job.', cyan);
		console.log('%cIsrael Fernandez · systems & embedded engineer, moving into red team.', text);
		console.log('%c→ hiring, or just want to talk shop (kernels, C2, Android RE)? israelfernandez96@gmail.com', amber);
		console.log('%c→ try whoami()', dim);

		(window as unknown as { whoami: () => string }).whoami = () => {
			console.log('%cIsrael Fernandez', cyan);
			console.log(
				'%c9 years low-level systems (firmware · kernel · ARM), now pointed at offensive security.\n' +
					'Built a C2 framework from scratch; reversing Android internals.\n' +
					'Open to full-time red team / offensive security roles.',
				text
			);
			console.log('%c→ israelfernandez96@gmail.com', amber);
			return '// the most interesting bug is the one nobody knew was there';
		};
		/* eslint-enable no-console */
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="font" type="font/woff2" href={interBodyFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interSemiboldFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={interBoldFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={monoFontUrl} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={monoSemiboldFontUrl} crossorigin="anonymous" />
</svelte:head>

{@render children()}
