<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>{page.status} — Israel Fernandez</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Navbar />

<main id="main-content" class="min-h-[100svh] flex items-center justify-center px-6">
	<div class="max-w-xl text-center">
		<p class="font-mono text-[var(--color-accent-cyan)] text-xs tracking-[0.3em] mb-4">
			<span class="text-[var(--color-text-muted)]">$</span> http_status
		</p>
		<h1 class="text-7xl md:text-8xl font-medium text-[var(--color-text-primary)] mb-6" style="letter-spacing: -0.04em; line-height: 1;">
			{page.status}
		</h1>
		<p class="text-lg text-[var(--color-text-secondary)] mb-2">
			{page.error?.message ?? 'Something went wrong.'}
		</p>
		<p class="font-mono text-xs text-[var(--color-text-muted)] mb-10">
			<span class="text-[var(--color-accent-cyan)]">//</span> the requested resource is not where it should be
		</p>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				style="background: linear-gradient(135deg, #22d3ee, #818cf8); color: #080d1a;"
			>
				← Home
			</a>
			<a
				href="/blog"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
				style="border-color: var(--color-bg-elevated); color: var(--color-text-secondary);"
			>
				Read writing
			</a>
		</div>
	</div>
</main>
