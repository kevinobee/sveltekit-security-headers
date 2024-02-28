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

import type {
	HttpResponseHeader,
	SecurityHeader,
	SvelteKitResponseHeadersConfig
} from './types.js';
import { RuleSet } from './config.js';
import { SvelteKitSecurityHeaders } from './hook.js';

export type { SvelteKitResponseHeadersConfig, SecurityHeader, HttpResponseHeader };

export { SvelteKitSecurityHeaders, RuleSet };
