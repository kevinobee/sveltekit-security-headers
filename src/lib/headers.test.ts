import { describe, it, expect } from 'vitest';

import { RuleSet, type SecurityHeader } from './index.js';
import { applySecurityHeaders } from './headers.js';

describe( 'HttpResponseHeaders', () => {
	describe( 'RuleSet', () => {
		describe( 'SecurityHeaders', () => {
			it( 'are defined', () => {
				expect( RuleSet ).toHaveProperty('SecurityHeaders');
			} );

			it( 'defines headers missing from SvelteKit required to achieve securityheaders.com A grade', () => {
				const missingHeaders: string[] = [
					'X-Frame-Options',
					'X-Content-Type-Options',
					'Referrer-Policy',
					'Permissions-Policy'
				];

				missingHeaders.forEach( ( header ) => {
					expect(
						RuleSet.SecurityHeaders.find( ( x ) => x.name === header )
					).toBeTruthy();
				} );
			} );
		} );
	} );

	describe( 'applySecurityHeaders', () => {
		it( 'removes header when value is null', () => {
			const headers: Headers = new Headers();
			headers.append( 'X-Foo', 'value' );

			const securityHeaders: SecurityHeader[] = [ { name: 'X-Foo', value: null } ];

			applySecurityHeaders( headers, { headers: securityHeaders, verbose: true } );

			expect( headers.has( 'X-Foo' ) ).toBe( false );
		} );

		it( 'adds new header', () => {
			const headers = new Headers();
			const securityHeaders: SecurityHeader[] = [ { name: 'X-New', value: 'foo' } ];

			applySecurityHeaders( headers, { headers: securityHeaders, verbose: true } );

			expect( headers.get( 'X-New' ) ).toBe( 'foo' );
		} );

		it( 'updates existing header value', () => {
			const headers = new Headers( [ [ 'X-Test', 'old' ] ] );
			const securityHeaders = [ { name: 'X-Test', value: 'new' } ];

			applySecurityHeaders( headers, { headers: securityHeaders, verbose: true } );

			expect( headers.get( 'X-Test' ) ).toBe( 'new' );
		} );
	} );
} );
