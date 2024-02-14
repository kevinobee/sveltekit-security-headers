import { expect, test } from '@playwright/test';

test.describe('HTTP Security Response Headers', () => {
	const homepage = '/';

	const expectedSecurityHeaders = [
		{ name: 'X-Frame-Options', recommendedValue: 'DENY' },
		{ name: 'X-Content-Type-Options', recommendedValue: 'nosniff' },
		{ name: 'Referrer-Policy', recommendedValue: 'strict-origin-when-cross-origin' },
		{ name: 'Permissions-Policy', recommendedValue: 'geolocation=(), camera=(), microphone=()' }
	];

	expectedSecurityHeaders.forEach(({ name, recommendedValue }) => {
		test(`${name} header is set to '${recommendedValue}'`, async ({ page }) => {
			const response = await page.goto(homepage);
			expect(await response?.headerValue(name)).not.toBeNull();
			expect(await response?.headerValue(name)).toBe(recommendedValue);
		});
	});
});
