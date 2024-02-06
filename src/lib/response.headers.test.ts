import { describe, it, expect } from 'vitest';
import { HttpResponseHeaders } from './response.headers.js';
import type { SecurityHeader } from './types.js';

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
