<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';

	const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

	let menuOpen = $state(false);
	let activeSection = $state('hero');
	let scrolled = $state(false);

	const hashLinks = [
		{ hash: 'about', label: 'About' },
		{ hash: 'skills', label: 'Skills' },
		{ hash: 'experience', label: 'Experience' },
		{ hash: 'projects', label: 'Projects' },
		{ hash: 'contact', label: 'Contact' }
	];

	let navLinks = $derived(
		hashLinks.map(({ hash, label }) => ({
			href: isBlogRoute ? `/#${hash}` : `#${hash}`,
			label,
			hash
		}))
	);

	let isBlogRoute = $derived(page.url.pathname.startsWith('/blog'));

	function closeMenu() {
		menuOpen = false;
	}

	function handleMenuKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) menuOpen = false;
	}

	onMount(() => {
		let rafId = 0;

		function update() {
			rafId = 0;
			const y = window.scrollY;
			const vh = window.innerHeight;
			scrolled = y > 50;

			const doc = document.documentElement;
			if (y + vh >= doc.scrollHeight - 2) {
				activeSection = sectionIds[sectionIds.length - 1];
				return;
			}

			const trigger = vh * 0.3;
			let current = sectionIds[0];
			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;
				if (el.getBoundingClientRect().top <= trigger) current = id;
			}
			activeSection = current;
		}

		function schedule() {
			if (rafId) return;
			rafId = requestAnimationFrame(update);
		}

		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		window.addEventListener('keydown', handleMenuKey);
		update();

		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('keydown', handleMenuKey);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--color-bg-surface)] focus:text-[var(--color-accent-cyan)] focus:outline focus:outline-2 focus:outline-[var(--color-accent-cyan)]"
>
	Skip to content
</a>

<nav
	class="nav fixed top-0 left-0 right-0 z-50"
	class:nav-scrolled={scrolled}
	aria-label="Primary"
>
	<div class="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
		<a
			href={isBlogRoute ? '/' : '#hero'}
			class="font-mono text-[var(--color-accent-cyan)] font-semibold text-lg tracking-wider hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent-cyan)] focus-visible:rounded-sm"
		>
			IF<span class="text-[var(--color-text-secondary)]">:/</span>
		</a>

		<!-- Desktop nav -->
		<ul class="hidden md:flex gap-8 items-center">
			{#each navLinks as { href, label, hash } (hash)}
				{@const isActive = !isBlogRoute && activeSection === hash}
				<li>
					<a
						{href}
						class="nav-link text-sm tracking-wide relative pb-0.5"
						class:is-active={isActive}
						aria-current={isActive ? 'page' : undefined}
					>
						{label}
						<span class="nav-underline" aria-hidden="true"></span>
					</a>
				</li>
			{/each}
			<li>
				<a
					href="/blog"
					class="nav-link text-sm tracking-wide relative pb-0.5"
					class:is-active={isBlogRoute}
					aria-current={isBlogRoute ? 'page' : undefined}
				>
					Blog
					<span class="nav-underline" aria-hidden="true"></span>
				</a>
			</li>
		</ul>

		<div class="hidden md:flex items-center gap-2">
			<ThemeToggle />
			<a
				href="/IsraelFernandezResume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="resume-btn inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] text-sm rounded transition-colors duration-200 font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-cyan)]"
			>
				Resume
			</a>
		</div>

		<!-- Mobile theme + hamburger -->
		<div class="md:hidden flex items-center gap-1">
			<ThemeToggle />
			<button
				class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent-cyan)] rounded-sm p-2"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
			>
				<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					{#if menuOpen}
						<path d="M18 6L6 18M6 6l12 12" />
					{:else}
						<path d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	<div
		id="mobile-menu"
		class="mobile-menu md:hidden overflow-hidden"
		class:mobile-menu-open={menuOpen}
		aria-hidden={!menuOpen}
	>
		<div class="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] px-6 py-4">
			<ul class="flex flex-col gap-4">
				{#each navLinks as { href, label, hash } (hash)}
					{@const isActive = !isBlogRoute && activeSection === hash}
					<li>
						<a
							{href}
							onclick={closeMenu}
							class="block py-3 transition-colors"
							class:text-[var(--color-accent-cyan)]={isActive}
							class:text-[var(--color-text-secondary)]={!isActive}
							aria-current={isActive ? 'page' : undefined}
						>
							{label}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="/blog"
						onclick={closeMenu}
						class="block py-3 transition-colors"
						class:text-[var(--color-accent-cyan)]={isBlogRoute}
						class:text-[var(--color-text-secondary)]={!isBlogRoute}
						aria-current={isBlogRoute ? 'page' : undefined}
					>
						Blog
					</a>
				</li>
				<li>
					<a
						href="/IsraelFernandezResume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						onclick={closeMenu}
						class="block py-3 text-[var(--color-accent-cyan)] font-mono"
					>
						Resume
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.nav {
		background: transparent;
		border-bottom: 1px solid transparent;
		transition: background-color 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease;
	}
	.nav-scrolled {
		background: color-mix(in srgb, var(--color-bg-primary) 85%, transparent);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom-color: color-mix(in srgb, var(--color-border) 80%, transparent);
	}

	.resume-btn:hover {
		background: color-mix(in srgb, var(--color-accent-cyan) 12%, transparent);
	}

	.nav-link {
		color: var(--color-text-secondary);
		transition: color 0.2s ease;
	}
	.nav-link:hover {
		color: var(--color-accent-cyan);
	}
	.nav-link.is-active {
		color: var(--color-accent-cyan);
	}
	.nav-link:focus-visible {
		outline: 2px solid var(--color-accent-cyan);
		outline-offset: 4px;
		border-radius: 2px;
	}

	.nav-underline {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--color-accent-cyan);
		transform: scaleX(0);
		transform-origin: left center;
		opacity: 0;
		transition: transform 0.25s ease, opacity 0.2s ease;
	}
	.nav-link.is-active .nav-underline {
		transform: scaleX(1);
		opacity: 0.7;
	}

	.mobile-menu {
		max-height: 0;
		visibility: hidden;
		transition: max-height 0.25s ease, visibility 0s linear 0.25s;
	}
	.mobile-menu-open {
		max-height: 400px;
		visibility: visible;
		transition: max-height 0.25s ease, visibility 0s linear 0s;
	}

	@media (prefers-reduced-motion: reduce) {
		.nav, .nav-link, .nav-underline, .mobile-menu {
			transition: none;
		}
	}
</style>
