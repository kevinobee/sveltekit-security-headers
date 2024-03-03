import { describe, it, expect, beforeEach } from 'vitest';
import { SvelteKitSecurityHeaders } from './hook.js';
import { RuleSet } from './headers/ruleset.js';

import type { RequestEvent } from '@sveltejs/kit';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import type { SvelteKitResponseHeadersConfig } from './types.js';

describe('SvelteKitSecurityHeaders server hook', () => {
	it('is defined', () => {
		expect(SvelteKitSecurityHeaders).toBeDefined();
	});

	describe('handle', () => {
		let mockEvent: DeepMockProxy<RequestEvent>;
		let mockResponse: DeepMockProxy<Response>;

		beforeEach(() => {
			mockEvent = mockDeep<RequestEvent>();
			mockResponse = mockDeep<Response>();
		});

		it('adds new header', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			const config: SvelteKitResponseHeadersConfig = {
				headers: [{ name: 'X-New', value: 'foo' }],
				verbose: false
			};
			await SvelteKitSecurityHeaders(config).handle({ event, resolve });

			expect(mockResponse.headers.set).toHaveBeenCalledWith('X-New', 'foo');
		});

		it('removes header when value is null', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			const config: SvelteKitResponseHeadersConfig = {
				headers: [{ name: 'X-New', value: null }],
				verbose: false
			};

			mockResponse.headers.get.calledWith('X-New').mockReturnValue('a-value');

			await SvelteKitSecurityHeaders(config).handle({ event, resolve });

			expect(mockResponse.headers.delete).toHaveBeenCalledWith('X-New');
		});

		it('should apply security headers to response', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			await SvelteKitSecurityHeaders().handle({ event, resolve });

			expect(mockResponse.headers.set).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
			expect(mockResponse.headers.set).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
			expect(mockResponse.headers.set).toHaveBeenCalledWith(
				'Referrer-Policy',
				'strict-origin-when-cross-origin'
			);
			expect(mockResponse.headers.set).toHaveBeenCalledWith(
				'Permissions-Policy',
				'geolocation=(), camera=(), microphone=()'
			);
		});

		it('should apply response headers once, last wins', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			const config: SvelteKitResponseHeadersConfig = {
				headers: [
					{ name: 'X-Frame-Options', value: 'ALLOW' },
					{ name: 'X-Frame-Options', value: 'ALLOW' },
					{ name: 'X-Frame-Options', value: 'DENY' }
				],
				verbose: false
			};
			await SvelteKitSecurityHeaders(config).handle({ event, resolve });

			expect(mockResponse.headers.set).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
			expect(mockResponse.headers.set).not.toHaveBeenCalledWith('X-Frame-Options', 'ALLOW');
		});

		it('should trim whitespace in Header name and value properties', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			const config: SvelteKitResponseHeadersConfig = {
				headers: [{ name: ' X-New ', value: ' a-value ' }],
				verbose: false
			};

			await SvelteKitSecurityHeaders(config).handle({ event, resolve });

			expect(mockResponse.headers.set).toHaveBeenCalledWith('X-New', 'a-value');
		});
	});
});

describe('Pre-configured rule sets are available', () => {
	it('RuleSet is exported', () => {
		expect(RuleSet).toBeDefined();
	});
});
