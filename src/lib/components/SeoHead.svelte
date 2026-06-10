<script lang="ts">
	import { SITE } from '$lib/config';

	/**
	 * Reusable SEO head block. Emits title, description, canonical, Open Graph,
	 * and Twitter card tags. Modeled on the inline <svelte:head> block in
	 * +page.svelte. Not yet adopted by routes, created for later wiring.
	 */
	interface Props {
		title: string;
		description: string;
		/** Canonical / OG URL for this page (e.g. `${SITE.url}/blog`). */
		url: string;
		/** Absolute OG/Twitter image URL. Falls back to the site default. */
		image?: string;
		/** Open Graph object type. Defaults to "website". */
		type?: string;
	}

	let {
		title,
		description,
		url,
		image = SITE.ogImage,
		type = 'website'
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={SITE.author} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
