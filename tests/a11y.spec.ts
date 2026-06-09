import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const SERIOUS_OR_CRITICAL = new Set(['serious', 'critical']);

/**
 * Resolve the URL of the first blog post so we can audit a real article page.
 */
async function firstPostUrl(page: import('@playwright/test').Page): Promise<string> {
	await page.goto('/blog');
	const href = await page.locator('a[href^="/blog/"]').first().getAttribute('href');
	expect(href, 'expected at least one blog post link').toBeTruthy();
	return href!;
}

async function auditPage(page: import('@playwright/test').Page, url: string) {
	await page.goto(url, { waitUntil: 'networkidle' });

	const results = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa'])
		.analyze();

	const seriousOrCritical = results.violations.filter(
		(v) => v.impact && SERIOUS_OR_CRITICAL.has(v.impact)
	);
	expect(
		seriousOrCritical,
		`serious/critical a11y violations on ${url}: ` +
			seriousOrCritical.map((v) => v.id).join(', ')
	).toEqual([]);

	const contrast = results.violations.filter((v) => v.id === 'color-contrast');
	expect(
		contrast,
		`color-contrast violations on ${url}: ` +
			contrast
				.flatMap((v) => v.nodes.map((n) => n.target.join(' ')))
				.join(', ')
	).toEqual([]);
}

test.describe('accessibility (axe-core, wcag2a + wcag2aa)', () => {
	test('home page has no serious/critical or contrast violations', async ({ page }) => {
		await auditPage(page, '/');
	});

	test('blog index has no serious/critical or contrast violations', async ({ page }) => {
		await auditPage(page, '/blog');
	});

	test('blog post page has no serious/critical or contrast violations', async ({ page }) => {
		const url = await firstPostUrl(page);
		await auditPage(page, url);
	});
});
