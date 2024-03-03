// src/hooks.server.ts
import { RuleSet, type SvelteKitResponseHeadersConfig } from '$lib/index.js';
import { SvelteKitSecurityHeaders } from '$lib/hook.js';

export const handle = SvelteKitSecurityHeaders({
	headers: [
		...RuleSet.SvelteKitSpecific,
		...RuleSet.OwaspRecommendedMinimal,

		// Access-Control-Allow-Origin header to allow requests
		// from your domain .. override value
		{
			name: 'Access-Control-Allow-Origin',
			value: 'https://sveltekit-security-headers.vercel.app'
		},

		...RuleSet.VercelSpecific

		// .. add custom headers
	],
	verbose: true
} as SvelteKitResponseHeadersConfig).handle;
