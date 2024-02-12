import { describe, it, expect } from 'vitest';
import { HttpResponseHeaders } from './headers.js';
import type { SecurityHeader } from './types.js';

describe('HttpResponseHeaders', () => {
	describe('Rules', () => {
		describe('SecurityHeaders', () => {
			it('are defined', () => {
				expect(HttpResponseHeaders.Rules.SecurityHeaders).toBeDefined();
			});

			it('defines headers missing from SvelteKit required to achieve securityheaders.com A grade', () => {
				const missingHeaders: string[] = [
					'X-Frame-Options',
					'X-Content-Type-Options',
					'Referrer-Policy',
					'Permissions-Policy'
				];

				missingHeaders.forEach((header) => {
					expect(
						HttpResponseHeaders.Rules.SecurityHeaders.find((x) => x.name === header)
					).toBeTruthy();
				});
			});
		});
	});

	describe('applySecurityHeaders', () => {
		it('removes header when value is undefined', () => {
			const headers: Headers = new Headers();
			headers.append('X-Foo', 'value');

			const securityHeaders: SecurityHeader[] = [{ name: 'X-Foo', value: undefined }];

			HttpResponseHeaders.applySecurityHeaders(headers, securityHeaders);

			expect(headers.has('X-Foo')).toBe(false);
		});

		it('adds new header', () => {
			const headers = new Headers();
			const securityHeaders: SecurityHeader[] = [{ name: 'X-New', value: 'foo' }];

			HttpResponseHeaders.applySecurityHeaders(headers, securityHeaders);

			expect(headers.get('X-New')).toBe('foo');
		});

		it('updates existing header value', () => {
			const headers = new Headers([['X-Test', 'old']]);
			const securityHeaders = [{ name: 'X-Test', value: 'new' }];

			HttpResponseHeaders.applySecurityHeaders(headers, securityHeaders);

			expect(headers.get('X-Test')).toBe('new');
		});
	});
});
