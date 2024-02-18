import { expect, test } from '@playwright/test';

test.describe('HTTP Security Response Headers', () => {
	const homepage = '/';

	test.describe('securityheaders.com test suite', () => {
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

	test.describe('OWASP Cheat Sheet test suite', () => {
		const expectedSecurityHeaders = [
			{ name: 'X-Frame-Options', recommendedValue: 'DENY' },
			{ name: 'X-Content-Type-Options', recommendedValue: 'nosniff' },
			{ name: 'Referrer-Policy', recommendedValue: 'strict-origin-when-cross-origin' },
			{ name: 'Content-Type', recommendedValue: 'text/html; charset=UTF-8' },
			{ name: 'Expect-CT', recommendedValue: null },
			{ name: 'Cross-Origin-Opener-Policy', recommendedValue: 'same-origin' },
			{ name: 'Cross-Origin-Embedder-Policy', recommendedValue: 'require-corp' },
			{ name: 'Cross-Origin-Resource-Policy', recommendedValue: 'same-site' },
			{ name: 'Permissions-Policy', recommendedValue: 'geolocation=(), camera=(), microphone=()' },
			{ name: 'Server', recommendedValue: 'webserver' },
			{ name: 'Public-Key-Pins', recommendedValue: null }
		];

		expectedSecurityHeaders
			.filter((el) => el.recommendedValue !== null)
			.forEach(({ name, recommendedValue }) => {
				test.describe(name, () => {
					test('is set to recommended value', async ({ page }) => {
						const response = await page.goto(homepage);
						expect(await response?.headerValue(name)).not.toBeNull();
						expect(await response?.headerValue(name)).toBe(recommendedValue);
					});
				});
			});

		expectedSecurityHeaders
			.filter((el) => el.recommendedValue === null)
			.forEach(({ name }) => {
				test.describe(name, () => {
					test('is not in response', async ({ page }) => {
						const response = await page.goto(homepage);
						expect(await response?.headerValue(name)).toBeNull();
					});
				});
			});
	});
});
