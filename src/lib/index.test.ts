import { describe, it, expect, beforeEach } from 'vitest';
import { SvelteKitSecurityHeaders, RuleSet } from './index.js';
import type { RequestEvent } from '@sveltejs/kit';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';

describe( 'SvelteKitSecurityHeaders', () => {
	it( 'is defined', () => {
		expect( SvelteKitSecurityHeaders ).toBeDefined();
	} );
} );

describe( 'Pre-configured rule sets are available', () => {
	it( 'RuleSet is exported', () => {
		expect( RuleSet ).toBeDefined();
	} );

	describe( 'rule sets contain HTTP response headers to apply', () => {

		it( 'SecurityHeaders', () => {
			expect( RuleSet.SecurityHeaders ).not.toHaveLength( 0 );
		} );

		it( 'SvelteKitSpecific', () => {
			expect( RuleSet.SvelteKitSpecific ).not.toHaveLength( 0 );
		} );

		it( 'OwaspRecommended', () => {
			expect( RuleSet.OwaspRecommended ).not.toHaveLength( 0 );
		} );
	} );

	describe( 'handle', () => {
		let mockEvent: DeepMockProxy<RequestEvent>;
		let mockResponse: DeepMockProxy<Response>;

		beforeEach( () => {
			mockEvent = mockDeep<RequestEvent>();
			mockResponse = mockDeep<Response>();
		} );

		it( 'should apply security headers to response', async () => {
			const event = mockEvent;
			const resolve = () => mockResponse;

			await SvelteKitSecurityHeaders().handle( { event, resolve } );

			expect( mockResponse.headers.set ).toHaveBeenCalledWith( 'X-Frame-Options', 'DENY' );
			expect( mockResponse.headers.set ).toHaveBeenCalledWith( 'X-Content-Type-Options', 'nosniff' );
			expect( mockResponse.headers.set ).toHaveBeenCalledWith(
				'Referrer-Policy',
				'strict-origin-when-cross-origin'
			);
			expect( mockResponse.headers.set ).toHaveBeenCalledWith(
				'Permissions-Policy',
				'geolocation=(), camera=(), microphone=()'
			);
		} );
	} );
} );
