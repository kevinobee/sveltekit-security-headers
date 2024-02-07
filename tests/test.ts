import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Svelte HTTP Security Headers' })).toBeVisible();
});

test('index page has expected npm package instructions', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.locator('pre').filter({ hasText: 'npm install @faranglao/svelte' })
	).toBeVisible();
});
