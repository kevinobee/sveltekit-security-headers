// src/hooks.server.ts
import { SvelteKitSecurityHeaders, RuleSet } from '$lib/index.js';

export const handle = SvelteKitSecurityHeaders({
	headers: [
		// remove any duplicates with a Set
		...new Set([
			...RuleSet.SecurityHeaders,
			...RuleSet.SvelteKitSpecific,
			...RuleSet.OwaspRecommendedMinimal,

			// Access-Control-Allow-Origin header to allow requests from https://sveltekit-security-headers.vercel.app
			{
				name: 'Access-Control-Allow-Origin',
				value: 'https://sveltekit-security-headers.vercel.app'
			}
		])
	],
	verbose: true
}).handle;
