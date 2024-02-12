import { expect, test, type Response, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('HTTP Security Response Headers', () => {
	const homepage = '/';

	const expectedSecurityHeaders = [
		{ name: 'X-Frame-Options', recommendedValue: 'DENY' },
		{ name: 'X-Content-Type-Options', recommendedValue: 'nosniff' },
		{ name: 'Referrer-Policy', recommendedValue: 'strict-origin-when-cross-origin' },
		{ name: 'Permissions-Policy', recommendedValue: 'geolocation=(), camera=(), microphone=()' }
	];
	let response: Response | null;

	let page: Page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		response = await page.goto(homepage);
	});

	test.afterAll(async () => {
		await page.close();
	});

	expectedSecurityHeaders.forEach(({ name, recommendedValue }) => {
		test.describe(name, () => {
			test('header is returned', async () => {
				expect(await response?.headerValue(name)).not.toBeNull();
			});

			test('header is recommended value', async () => {
				expect(await response?.headerValue(name)).toBe(recommendedValue);
			});
		});
	});
});
