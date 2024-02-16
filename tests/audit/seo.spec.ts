import { expect, test } from '@playwright/test';

test.describe('SEO tests', async () => {
	['/'].forEach((p) => {
		test(`'${p}' page has description metadata`, async ({ page }) => {
			await page.goto(p);
			const metaDescription = page.locator('meta[name="description"]');
			await expect(metaDescription).toHaveAttribute('content');
		});
	});
});
