/**
 * Shared rAF-throttled scroll/resize watcher.
 *
 * Registers a single passive scroll + resize listener pair. The callback is
 * invoked at most once per animation frame, and the returned cleanup function
 * removes both listeners and cancels any pending frame.
 *
 * Usage (inside onMount):
 *   const cleanup = createScrollWatcher(() => { ... });
 *   return cleanup;
 */
export function createScrollWatcher(callback: () => void): () => void {
	let rafId = 0;

	function onScroll() {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			callback();
			rafId = 0;
		});
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
		if (rafId) cancelAnimationFrame(rafId);
	};
}
