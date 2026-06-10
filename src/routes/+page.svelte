<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	const title = 'Israel Fernandez | Systems Software Engineer';
	const description =
		'Israel Fernandez, systems software engineer specializing in embedded, Linux internals, and Android security. Currently at Apple (via Sasken).';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Israel Fernandez" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://israel-fernandez.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://israel-fernandez.com/" />
	<meta property="og:image" content="https://israel-fernandez.com/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Israel Fernandez, Systems Software Engineer pivoting to Android security and red team" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://israel-fernandez.com/og-image.png" />
	<link rel="alternate" type="application/rss+xml" title="Israel Fernandez | Writing" href="/rss.xml" />
	<!-- Prefetch blog routes, likely next click after homepage -->
	<link rel="prefetch" href="/blog" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Israel Fernandez",
		"url": "https://israel-fernandez.com/",
		"jobTitle": "Systems Software Engineer",
		"sameAs": [
			"https://github.com/iFernandez96",
			"https://www.linkedin.com/in/ifernandez96/"
		]
	})}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Israel Fernandez",
		"url": "https://israel-fernandez.com/",
		"author": {
			"@type": "Person",
			"name": "Israel Fernandez",
			"url": "https://israel-fernandez.com/"
		}
	})}</script>`}
</svelte:head>

<Navbar />
<main id="main-content">
	<Hero />
	<About />
	<Skills />
	<!-- Gradient hairline divider: marks the dense skills beat → narrative timeline transition -->
	<div class="section-divider" aria-hidden="true"></div>
	<Experience />
	<Projects />
	<Contact />
</main>
<BackToTop />
