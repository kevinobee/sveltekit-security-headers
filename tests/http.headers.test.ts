import { expect, test, type Response, type Page } from '@playwright/test';
import type { SecurityHeader } from '$lib/types.js';

test.describe.configure({ mode: 'serial' });

let page: Page;
let response: Response | null;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
});

test.afterAll(async () => {
	await page.close();
});

test('Get request to Homepage', async () => {
	response = await page.goto('/');
	expect(response).not.toBeNull();
	expect(response?.status()).toBe(200);
});

test.describe('HTTP Security Response Headers', () => {
	test.describe('Sveltekit specific headers', () => {
		test.describe('SvelteKitSpecific rule set', () => {
			const expectedSecurityHeaders: SecurityHeader[] = [{ name: 'X-Sveltekit-Page', value: null }];
			verifyResponseHeaders(expectedSecurityHeaders);
		});
	});

	test.describe('Non Sveltekit headers', () => {
		test.describe('NonSvelteKit rule set', () => {
			const expectedSecurityHeaders: SecurityHeader[] = [
				{ name: 'X-Powered-By', value: null },
				{ name: 'X-AspNet-Version', value: null },
				{ name: 'X-AspNetMvc-Version', value: null }
			];
			verifyResponseHeaders(expectedSecurityHeaders);
		});
	});

	test.describe('OWASP Cheat Sheet test suite', () => {
		test.describe('OwaspRecommendedMinimal rule set', () => {
			const expectedSecurityHeaders: SecurityHeader[] = [
				{ name: 'X-XSS-Protection', value: '1; mode=block' },
				{ name: 'Content-Type', value: 'text/html; charset=UTF-8' },
				{ name: 'Expect-CT', value: null },
				{ name: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
				{ name: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
				{ name: 'Cross-Origin-Resource-Policy', value: 'same-site' },
				{ name: 'Server', value: 'webserver' },
				{ name: 'X-DNS-Prefetch-Control', value: 'off' },
				{ name: 'Public-Key-Pins', value: null }
			];
			verifyResponseHeaders(expectedSecurityHeaders);
		});

		test.describe('OwaspRecommended rule set', () => {
			const expectedSecurityHeaders: SecurityHeader[] = [
				{
					name: 'Access-Control-Allow-Origin',
					value: 'https://sveltekit-security-headers.vercel.app'
				}
			];
			verifyResponseHeaders(expectedSecurityHeaders);
		});
	});

	test.describe('SecurityHeaders.com checks', () => {
		test.describe('SecurityHeaders rule set', () => {
			const expectedSecurityHeaders: SecurityHeader[] = [
				{ name: 'X-Frame-Options', value: 'DENY' },
				{ name: 'X-Content-Type-Options', value: 'nosniff' },
				{ name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
				{ name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' }
			];
			verifyResponseHeaders(expectedSecurityHeaders);
		});
	});

	function verifyResponseHeaders(expectedSecurityHeaders: SecurityHeader[]) {
		verifySetHeaders(expectedSecurityHeaders);
		verifyDeleteHeaders(expectedSecurityHeaders);
	}

	function verifyDeleteHeaders(expectedSecurityHeaders: SecurityHeader[]) {
		expectedSecurityHeaders
			.filter((el) => el.value === null)
			.forEach(({ name }) => {
				test.describe(name, () => {
					test('is not in response', async () => {
						expect(await response?.headerValue(name)).toBeNull();
					});
				});
			});
	}
	function verifySetHeaders(expectedSecurityHeaders: SecurityHeader[]) {
		expectedSecurityHeaders
			.filter((el) => el.value !== null)
			.forEach(({ name, value: value }) => {
				test.describe(name, () => {
					test('is set to recommended value', async () => {
						expect(await response?.headerValue(name)).not.toBeNull();
						expect(await response?.headerValue(name)).toBe(value);
					});
				});
			});
	}
});
