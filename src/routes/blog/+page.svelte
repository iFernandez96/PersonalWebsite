<script lang="ts">
	import { posts, formatDate } from '$lib/posts';
	import Navbar from '$lib/components/Navbar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	const title = 'Writing | Israel Fernandez';
	const description =
		'Technical writing on systems programming, embedded firmware, and Android security research.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://israel-fernandez.com/blog" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://israel-fernandez.com/blog" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content="https://israel-fernandez.com/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Israel Fernandez — writing on systems programming and security research" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://israel-fernandez.com/og-image.png" />
	<meta name="twitter:image:alt" content="Israel Fernandez — writing on systems programming and security research" />
	<link rel="alternate" type="application/rss+xml" title={title} href="/rss.xml" />
</svelte:head>

<Navbar />

<main id="main-content" class="min-h-screen pt-28 pb-20 px-6 lg:px-10">
	<div class="max-w-3xl mx-auto">
		<header class="mb-14">
			<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-3">// WRITING</p>
			<h1 class="text-5xl md:text-6xl font-medium text-[var(--color-text-primary)] mb-4" style="letter-spacing: -0.04em; line-height: 1;">
				Writing
			</h1>
			<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl">
				Long-form notes on systems programming, security research, and building things at the low level.
				Posts are infrequent. I'd rather ship one good walkthrough than three thin updates.
			</p>
		</header>

		<ol class="flex flex-col">
			{#each posts as post, i (post.slug)}
				<li>
					<a
						href="/blog/{post.slug}"
						class="post-row group relative block py-6 border-t"
						class:border-b={i === posts.length - 1}
						style="border-color: var(--color-border);"
					>
						<div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3 font-mono text-xs">
							<time class="text-[var(--color-text-muted)]">{formatDate(post.date)}</time>
							<span class="text-[var(--color-text-muted)]">·</span>
							<span class="text-[var(--color-text-muted)]">{post.readTime} min read</span>
							<div class="flex flex-wrap gap-1.5 ml-auto">
								{#each post.tags.slice(0, 3) as tag (tag)}
									<span
										class="px-2 py-0.5 rounded text-[10px]"
										style="color: var(--color-accent-cyan); border: 1px solid color-mix(in srgb, var(--color-accent-cyan) 20%, transparent); background: color-mix(in srgb, var(--color-accent-cyan) 5%, transparent);"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>

						<h2 class="post-title text-2xl md:text-3xl font-medium text-[var(--color-text-primary)] mb-3 leading-tight transition-colors" style="letter-spacing: -0.02em;">
							{post.title}
						</h2>

						<p class="text-[var(--color-text-secondary)] leading-relaxed mb-4 max-w-2xl">
							{post.summary}
						</p>

						<span class="inline-flex items-center gap-1.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-cyan)] transition-colors text-sm font-mono">
							Read post
							<svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</span>
					</a>
				</li>
			{/each}
		</ol>

		{#if posts.length === 0}
			<p class="text-[var(--color-text-muted)] text-center py-16 font-mono">No posts yet.</p>
		{/if}
	</div>
</main>

<footer class="border-t py-8 px-6" style="border-color: var(--color-border);">
	<div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
		<a href="/" class="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors inline-flex items-center gap-1.5">
			<svg class="w-3 h-3" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
			Back to portfolio
		</a>
		<p class="font-mono text-xs text-[var(--color-text-muted)]">© {new Date().getFullYear()} Israel Fernandez</p>
	</div>
</footer>

<BackToTop />

<style>
	.post-row:hover .post-title {
		color: var(--color-accent-cyan);
	}
</style>
