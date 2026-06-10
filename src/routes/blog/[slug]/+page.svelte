<script lang="ts">
	import { formatDate } from '$lib/posts';
	import Navbar from '$lib/components/Navbar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import ReadingProgress from '$lib/components/ReadingProgress.svelte';
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} | Israel Fernandez</title>
	<meta name="description" content={post.summary} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={`https://israel-fernandez.com/blog/${page.params.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={`${post.title} | Israel Fernandez`} />
	<meta property="og:description" content={post.summary} />
	<meta property="og:url" content={`https://israel-fernandez.com/blog/${page.params.slug}`} />
	<meta property="og:image" content="https://israel-fernandez.com/og-image.png" />
	<meta property="article:published_time" content={post.date} />
	<meta property="article:author" content="Israel Fernandez" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${post.title} | Israel Fernandez`} />
	<meta name="twitter:description" content={post.summary} />
	<meta name="twitter:image" content="https://israel-fernandez.com/og-image.png" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": post.title,
		"datePublished": post.date,
		"author": { "@type": "Person", "name": "Israel Fernandez", "url": "https://israel-fernandez.com/" },
		"description": post.summary,
		"keywords": post.tags.join(", ")
	})}</script>`}
</svelte:head>

<ReadingProgress />
<Navbar />

<main id="main-content" class="min-h-screen pt-28 pb-20 px-6 lg:px-10">
	<div class="max-w-3xl mx-auto">

		<!-- Back link -->
		<a
			href="/blog"
			class="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors mb-10"
		>
			<svg class="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M19 12H5M12 5l-7 7 7 7" />
			</svg>
			All posts
		</a>

		<!-- Header -->
		<header class="mb-12">
			<div class="flex flex-wrap items-center gap-3 mb-5">
				<time class="font-mono text-xs text-[var(--color-text-muted)]">{formatDate(post.date)}</time>
				<span class="text-[var(--color-text-muted)] text-xs">·</span>
				<span class="font-mono text-xs text-[var(--color-text-muted)]">{post.readTime} min read</span>
			</div>

			<h1
				class="text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-text-primary)] mb-6 leading-[1.05]"
				style="letter-spacing: -0.03em;"
			>
				{post.title}
			</h1>

			<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6 max-w-2xl">
				{post.summary}
			</p>

			<div class="flex flex-wrap gap-2 pb-8 border-b" style="border-color: var(--color-border);">
				{#each post.tags as tag (tag)}
					<span
						class="px-2.5 py-1 rounded text-[11px] font-mono"
						style="color: var(--color-accent-cyan); border: 1px solid rgba(34,211,238,0.2); background: rgba(34,211,238,0.05);"
					>
						{tag}
					</span>
				{/each}
			</div>
		</header>

		<!-- Content -->
		<article class="post-content">
			<!-- post.content is first-party Markdown rendered to HTML at build time
			     (see src/lib/posts.ts). It is trusted and statically prerendered, so
			     no runtime sanitization is needed. If external/user-submitted posts
			     are ever added, sanitize here (e.g. isomorphic-dompurify). -->
			{@html post.content}
		</article>

		<!-- Footer nav -->
		<div class="mt-16 pt-8 border-t flex justify-between items-center" style="border-color: var(--color-border);">
			<a
				href="/blog"
				class="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M19 12H5M12 5l-7 7 7 7" />
				</svg>
				All posts
			</a>
			<a
				href="/"
				class="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
			>
				Portfolio
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</main>

<footer class="border-t py-8 px-6 text-center" style="border-color: var(--color-border);">
	<p class="font-mono text-xs text-[var(--color-text-muted)]">
		© {new Date().getFullYear()}
		<a href="https://github.com/iFernandez96" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-text-secondary)] transition-colors">
			Israel Fernandez
		</a>
	</p>
</footer>

<BackToTop />

<style>
	.post-content {
		color: var(--color-text-secondary);
		line-height: 1.8;
		font-size: 1rem;
	}

	:global(.post-content h2) {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 700;
		margin: 2.5rem 0 1rem;
		letter-spacing: -0.01em;
	}

	:global(.post-content h3) {
		color: var(--color-text-primary);
		font-size: 1.125rem;
		font-weight: 600;
		margin: 2rem 0 0.75rem;
	}

	:global(.post-content p) {
		margin: 0 0 1.25rem;
	}

	:global(.post-content ul) {
		list-style: none;
		padding: 0;
		margin: 0 0 1.25rem;
	}

	:global(.post-content ul li) {
		padding-left: 1.25rem;
		position: relative;
		margin-bottom: 0.5rem;
	}

	:global(.post-content ul li::before) {
		content: '›';
		position: absolute;
		left: 0;
		color: var(--color-accent-cyan);
		font-weight: 700;
	}

	:global(.post-content pre) {
		background: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 1rem 1.25rem;
		overflow-x: auto;
		margin: 0 0 1.25rem;
	}

	:global(.post-content code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--color-accent-cyan);
		background: rgba(34, 211, 238, 0.08);
		padding: 0.1em 0.35em;
		border-radius: 3px;
	}

	:global(.post-content pre code) {
		color: var(--color-text-secondary);
		background: none;
		padding: 0;
		font-size: 0.85rem;
	}

	:global(.post-content strong) {
		color: var(--color-text-primary);
		font-weight: 600;
	}

	:global(.post-content a) {
		color: var(--color-accent-cyan);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: rgba(34, 211, 238, 0.4);
	}

	:global(.post-content a:hover) {
		text-decoration-color: var(--color-accent-cyan);
	}
</style>
