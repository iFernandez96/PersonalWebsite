/**
 * Svelte action: one-shot IntersectionObserver reveal.
 *
 * Usage:
 *   <div use:reveal>          , default role "body"
 *   <div use:reveal="'heading'">
 *   <div use:reveal="'card'">
 *   <div use:reveal="{{ role: 'card', i: 2 }}">  , index for stagger
 *
 * The action adds class "in-view" on first intersection then disconnects.
 * SSR/scripting:none fallback: the CSS rules for .reveal-heading etc. resolve
 * to opacity:1 under (scripting: none) and (prefers-reduced-motion: reduce).
 * No JS = no observer = element stays at opacity:1 (base style from app.css).
 */

export type RevealRole = 'heading' | 'body' | 'card' | 'line';

export interface RevealOptions {
	role?: RevealRole;
	/** Card stagger index, drives --i CSS variable for cascade delay */
	i?: number;
}

export function reveal(
	node: HTMLElement,
	options: RevealRole | RevealOptions = 'body'
) {
	const opts: RevealOptions =
		typeof options === 'string' ? { role: options } : options;
	const role: RevealRole = opts.role ?? 'body';
	const index = opts.i ?? 0;

	// Apply base + role class before intersection (hidden state)
	node.classList.add('rv', `rv-${role}`);
	node.style.setProperty('--i', String(index));

	// Bail in reduced-motion or no-JS environments (SSR: this never runs)
	if (typeof window === 'undefined') return {};
	const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (mql.matches) {
		node.classList.add('in-view');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.12 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
