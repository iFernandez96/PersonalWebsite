<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'dark' | 'light';
	let theme = $state<Theme>('dark');

	function readInitial(): Theme {
		if (typeof document === 'undefined') return 'dark';
		const t = document.documentElement.getAttribute('data-theme');
		return t === 'light' ? 'light' : 'dark';
	}

	function apply(next: Theme) {
		theme = next;
		document.documentElement.setAttribute('data-theme', next);
		try {
			localStorage.setItem('theme', next);
		} catch {
			/* private mode etc., ignore */
		}
		// Also update theme-color meta so mobile UI chrome matches
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', next === 'light' ? '#fafafa' : '#080d1a');
	}

	function toggle() {
		apply(theme === 'dark' ? 'light' : 'dark');
	}

	onMount(() => {
		theme = readInitial();
		// Track system preference if user hasn't explicitly chosen
		const mql = window.matchMedia('(prefers-color-scheme: light)');
		const handler = () => {
			if (!localStorage.getItem('theme')) {
				apply(mql.matches ? 'light' : 'dark');
			}
		};
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	});
</script>

<button
	type="button"
	onclick={toggle}
	class="theme-toggle"
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if theme === 'dark'}
		<!-- Sun icon (clicking switches to light) -->
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4"/>
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
		</svg>
	{:else}
		<!-- Moon icon (clicking switches to dark) -->
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 6px;
		color: var(--color-text-secondary);
		background: transparent;
		border: 1px solid transparent;
		transition: color 0.2s, background-color 0.2s, border-color 0.2s, transform 0.2s;
	}
	.theme-toggle:hover {
		color: var(--color-accent-cyan);
		background: var(--color-bg-surface);
		border-color: var(--color-border);
	}
	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-accent-cyan);
		outline-offset: 2px;
	}
	.theme-toggle svg {
		width: 18px;
		height: 18px;
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-toggle { transition: none; }
	}
</style>
