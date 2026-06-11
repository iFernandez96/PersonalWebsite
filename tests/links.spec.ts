import { test, expect } from '@playwright/test';

// In-page section anchors that the navbar links to. Each must resolve to a real
// element on the homepage.
const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact'];

test.describe('in-page nav anchors', () => {
	test('every nav anchor target exists on the homepage', async ({ page }) => {
		await page.goto('/');

		for (const id of SECTION_IDS) {
			const target = page.locator(`#${id}`);
			await expect(target, `#${id} section should exist`).toHaveCount(1);
		}
	});

	test('every nav link points at a real section element', async ({ page }) => {
		await page.goto('/');

		// Collect hrefs of in-page (hash) nav links.
		const hashHrefs = await page
			.locator('nav a[href^="#"]')
			.evaluateAll((els) =>
				els
					.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
					.filter((h) => h.length > 1)
			);

		expect(hashHrefs.length).toBeGreaterThan(0);

		for (const href of hashHrefs) {
			const id = href.slice(1); // drop the leading '#'
			await expect(page.locator(`#${id}`), `${href} should resolve`).toHaveCount(1);
		}
	});
});

test.describe('blog post links', () => {
	test('every /blog post link resolves without a 404', async ({ page, request }) => {
		await page.goto('/blog');

		const hrefs = await page
			.locator('a[href^="/blog/"]')
			.evaluateAll((els) =>
				els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
			);

		// There should be at least one post linked.
		expect(hrefs.length).toBeGreaterThan(0);

		// De-duplicate, then assert each resolves to a 200 and renders an article.
		for (const href of [...new Set(hrefs)]) {
			const res = await request.get(href);
			expect(res.status(), `${href} should not 404`).toBe(200);

			await page.goto(href);
			await expect(page.locator('.post-content')).toBeVisible();
		}
	});
});
