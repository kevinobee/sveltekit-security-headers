/**
 * SvelteKit Security Headers adds HTTP response headers to SvelteKit apps.
 * It provides a simple way to add response headers to your SvelteKit app in a few lines of code.
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @faranglao/sveltekit-security-headers
 * ```
 *
 * ## Usage
 *
 * ```ts title="src/hooks.server.ts"
 * import { SvelteKitSecurityHeaders } from "@faranglao/sveltekit-security-headers"
 *
 * export const handle = SvelteKitSecurityHeaders().handle;
 *
 *
 * To customize the HTTP response headers use:
 *
 * import { SvelteKitSecurityHeaders } from "@faranglao/sveltekit-security-headers"
 *
 * export const handle = SvelteKitSecurityHeaders( {
 * 	headers: [
 * 		...new Set( [ // removes duplicates
 * 			...RuleSet.SecurityHeaders,
 * 			...RuleSet.SvelteKitSpecific,
 * 			...RuleSet.OwaspRecommended,
 * 			[
 * 				{ name: 'X-XYZ-HEADER', value: 'value to set' },
 * 				{ name: 'X-XYZ-HEADER-TO-REMOVE', value: null }
 * 			]
 * 		] )
 * 	],
 * 	verbose: true
 * } ).handle;
 * ```
 *
 */

import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import type {
	HttpResponseHeader,
	SecurityHeader,
	SvelteKitResponseHeadersConfig
} from './types.js';
import { applySecurityHeaders } from './headers.js';
import { RuleSet } from './config.js';

async function SecurityHeaders(
	event: RequestEvent<Partial<Record<string, string>>, string | null>,
	resolve: {
		(
			event: RequestEvent<Partial<Record<string, string>>, string | null>,
			opts?: ResolveOptions | undefined
		): MaybePromise<Response>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(arg0: any): any;
	},
	config: SvelteKitResponseHeadersConfig
) {
	const response = await resolve(event);
	applySecurityHeaders(response.headers, config);
	return response;
}

export function SvelteKitSecurityHeaders(
	config = {
		headers: RuleSet.SecurityHeaders,
		verbose: false
	}
): {
	handle: Handle;
} {
	return {
		async handle({ event, resolve }) {
			return SecurityHeaders(event, resolve, config);
		}
	};
}

export type { SvelteKitResponseHeadersConfig, SecurityHeader, HttpResponseHeader };

export { RuleSet };
