import { expect, test, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Home page', () => {
	const homepage = '/';
	const expectedOrg = 'faranglao';
	const expectedName = 'sveltekit-security-headers';
	const packageName = `@${expectedOrg}/${expectedName}`;

	let page: Page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	test.afterAll(async () => {
		await page.close();
	});

	test('has h1 containing NPM package name', async () => {
		await page.goto(homepage);
		await expect(page.getByRole('heading', { name: expectedName })).toBeVisible();
	});

	test('body contains NPM package installation instructions', async ({ page }) => {
		const expectedInstallationCommand = `npm install ${packageName}`;
		await page.goto(homepage);
		await expect(
			page.locator('pre').filter({ hasText: expectedInstallationCommand })
		).toBeVisible();
	});
});
