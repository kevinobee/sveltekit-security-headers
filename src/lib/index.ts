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
 * import { SvelteKitSecurityHeaders, RuleSet } from '@faranglao/sveltekit-security-headers';
 *
 * export const handle = SvelteKitSecurityHeaders({
 * 	headers: [
 * 		...RuleSet.SvelteKitSpecific,
 * 		...RuleSet.OwaspRecommendedMinimal,
 *
 * 		// Access-Control-Allow-Origin header to allow requests
 * 		// from your domain .. override value
 * 		{
 * 			name: 'Access-Control-Allow-Origin',
 * 			value: 'https://sveltekit-security-headers.vercel.app'
 * 		}
 *
 * 		// .. add custom headers
 * 	],
 * 	verbose: true
 * }).handle;
 * ```
 *
 */

import type {
	HttpResponseHeader,
	SecurityHeader,
	SvelteKitResponseHeadersConfig
} from './types.js';

import { RuleSet } from './headers/ruleset.js';
import { SvelteKitSecurityHeaders } from './hook.js';

export type { SvelteKitResponseHeadersConfig, SecurityHeader, HttpResponseHeader };

export { SvelteKitSecurityHeaders, RuleSet };
