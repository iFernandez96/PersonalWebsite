import { defineConfig } from 'vitest/config';

// Unit-test config for the pure logic in src/lib (posts.ts frontmatter parsing,
// sorting, formatDate). Vitest runs on Vite, so `import.meta.glob` in posts.ts
// resolves the same way it does in the app build.
//
// Playwright specs live alongside these in ./tests but use the `*.spec.ts`
// suffix; we only pick up `*.test.ts` here so the two runners don't collide.
export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
		exclude: ['**/node_modules/**', '**/*.spec.ts']
	},
	resolve: {
		alias: {
			$lib: new URL('./src/lib', import.meta.url).pathname
		}
	}
});
