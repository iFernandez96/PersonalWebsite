<script lang="ts">
	import { posts, formatDate } from '$lib/posts';
	import Navbar from '$lib/components/Navbar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
</script>

<svelte:head>
	<title>Blog — Israel Fernandez</title>
	<meta name="description" content="Technical writing on systems programming, security research, and offensive tooling." />
</svelte:head>

<Navbar />

<main class="min-h-screen pt-24 pb-20 px-6 lg:px-10">
	<div class="max-w-3xl mx-auto">
		<div class="mb-14">
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">BLOG</p>
			<h1 class="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4" style="letter-spacing: -0.02em;">
				Writing
			</h1>
			<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed">
				Notes on systems programming, security research, and building things at the low level.
			</p>
		</div>

		<div class="flex flex-col gap-6">
			{#each posts as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="blog-card group relative block rounded-lg p-6 border transition-all duration-300"
					style="background: var(--color-bg-secondary); border-color: var(--color-border);"
				>
					<!-- Top accent line -->
					<div
						class="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style="background: linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-indigo), transparent);"
					></div>

					<div class="flex flex-wrap items-center gap-3 mb-3">
						<time class="font-mono text-xs text-[var(--color-text-muted)]">{formatDate(post.date)}</time>
						<span class="text-[var(--color-text-muted)] text-xs">·</span>
						<span class="font-mono text-xs text-[var(--color-text-muted)]">{post.readTime} min read</span>
					</div>

					<h2 class="text-xl font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-cyan)] transition-colors mb-3 leading-snug">
						{post.title}
					</h2>

					<p class="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
						{post.summary}
					</p>

					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag (tag)}
							<span
								class="px-2.5 py-1 rounded text-xs font-mono border"
								style="color: var(--color-accent-cyan); border-color: rgba(34,211,238,0.2); background: rgba(34,211,238,0.05);"
							>
								{tag}
							</span>
						{/each}
					</div>

					<div class="flex items-center gap-1.5 mt-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-cyan)] transition-colors text-sm font-mono">
						Read post
						<svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
				</a>
			{/each}
		</div>

		{#if posts.length === 0}
			<p class="text-[var(--color-text-muted)] text-center py-16 font-mono">No posts yet.</p>
		{/if}
	</div>
</main>

<footer class="border-t py-8 px-6 text-center" style="border-color: var(--color-border);">
	<p class="font-mono text-xs text-[var(--color-text-muted)]">
		<a href="/" class="hover:text-[var(--color-accent-cyan)] transition-colors">← Back to portfolio</a>
		&nbsp;|&nbsp;
		© {new Date().getFullYear()} Israel Fernandez
	</p>
</footer>

<BackToTop />

<style>
	.blog-card {
		transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
	}
	.blog-card:hover {
		border-color: rgba(34, 211, 238, 0.3) !important;
		box-shadow: 0 8px 32px rgba(34, 211, 238, 0.06);
		transform: translateY(-2px);
	}
</style>
