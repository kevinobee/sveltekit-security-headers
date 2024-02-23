import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
	test('should not have any automatically detectable accessibility issues', async ({ page }) => {
		await page.goto('/');

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.disableRules(['color-contrast']) // because of comments in code blocks within rendered  Markdown
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
