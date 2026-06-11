import { test, expect } from '@playwright/test';

test.describe('home page', () => {
	test('loads with a non-empty title containing "Israel"', async ({ page }) => {
		await page.goto('/');
		const title = await page.title();
		expect(title.trim().length).toBeGreaterThan(0);
		expect(title).toContain('Israel');
	});

	test('logs no console errors on load', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		page.on('pageerror', (err) => errors.push(err.message));

		await page.goto('/', { waitUntil: 'networkidle' });

		expect(errors).toEqual([]);
	});

	test('in-page nav updates the hash and reveals the section', async ({ page }) => {
		await page.goto('/');

		// Resilient: match a nav link by its accessible name / text.
		const skillsLink = page.getByRole('link', { name: /skills/i }).first();
		await skillsLink.click();

		await expect(page).toHaveURL(/#skills/);

		const section = page.locator('#skills');
		await expect(section).toBeVisible();
	});
});

test.describe('theme toggle', () => {
	test('persists the selected theme across reloads', async ({ page }) => {
		await page.goto('/');

		const html = page.locator('html');
		const before = await html.getAttribute('data-theme');

		const toggle = page
			.getByRole('button', { name: /theme|dark|light|appearance/i })
			.first();
		await toggle.click();

		// data-theme should flip to a different value.
		await expect(html).not.toHaveAttribute('data-theme', before ?? '');
		const after = await html.getAttribute('data-theme');
		expect(after).not.toBeNull();
		expect(after).not.toEqual(before);

		// localStorage should record the choice.
		const stored = await page.evaluate(() => localStorage.getItem('theme'));
		expect(stored).toBeTruthy();

		// And it should survive a reload.
		await page.reload();
		await expect(html).toHaveAttribute('data-theme', after ?? '');
		const storedAfterReload = await page.evaluate(() => localStorage.getItem('theme'));
		expect(storedAfterReload).toEqual(stored);
	});
});

test.describe('blog', () => {
	test('lists posts and navigates into a post', async ({ page }) => {
		await page.goto('/blog');

		// At least one post link pointing at /blog/<slug>.
		const postLinks = page.locator('a[href^="/blog/"]');
		await expect(postLinks.first()).toBeVisible();
		expect(await postLinks.count()).toBeGreaterThan(0);

		await postLinks.first().click();

		await expect(page).toHaveURL(/\/blog\/[^/]+$/);

		const article = page.locator('.post-content');
		await expect(article).toBeVisible();
	});
});
