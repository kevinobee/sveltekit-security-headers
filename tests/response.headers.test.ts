import { expect, test, type Response, type Page } from '@playwright/test';

test.describe.configure( { mode: 'serial' } );

test.describe('HTTP Security Headers are used', () => {

	const homepage = '/';

	const expectedSecurityHeaders : string[] = [
		'Content-Security-Policy',
		'X-Frame-Options',
		'X-Content-Type-Options',
		'Referrer-Policy',
		'Permissions-Policy'
	];

	let response: Response | null;
	let responseHeaders: { [ key: string ]: string; } | undefined;

	let page: Page;

	test.beforeAll( async ( { browser } ) => {
		page = await browser.newPage();
	} );

	test.afterAll( async () => {
		await page.close();
	} );

	test( 'HTTP response headers are returned from homepage request', async () => {
		response = await page.goto( homepage );
		responseHeaders = await response?.allHeaders();
		expect(responseHeaders).not.toBeNull();
	});

	expectedSecurityHeaders.forEach((expectedSecurityHeader)=> {
		test( `${ expectedSecurityHeader} header is returned`, () => {
			expect(responseHeaders![expectedSecurityHeader]).not.toBeNull()
		});
	});
});
