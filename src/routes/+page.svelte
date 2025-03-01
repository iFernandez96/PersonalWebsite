<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	const title = 'Israel Fernandez — Systems Software Engineer';
	const description =
		'Israel Fernandez — systems software engineer specializing in embedded, Linux internals, and Android security. Currently at Apple (via Sasken).';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Israel Fernandez" />
	<meta name="keywords" content="Israel Fernandez, software engineer, embedded systems, Linux kernel, Android security, red team, C++, Svelte" />
	<link rel="canonical" href="https://israelfernandez.dev/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://israelfernandez.dev/" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<Navbar />
<main>
	<Hero />
	<About />
	<Skills />
	<Experience />
	<Projects />
	<Contact />
</main>
<BackToTop />
