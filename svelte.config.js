import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => {
			const parts = filename.split(/[/\\]/);
			if (parts.includes('node_modules')) return undefined;
			if (parts.includes('bootcamp')) return false;
			return true;
		}
	},
	kit: {
		adapter: adapter(),
		// Inline CSS chunks below 8KB into the HTML so first paint doesn't wait
		// on a separate roundtrip. Above this we let the browser cache it.
		inlineStyleThreshold: 8192
	}
};

export default config;
