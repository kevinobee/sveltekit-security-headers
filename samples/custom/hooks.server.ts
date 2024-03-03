// samples/custom/hooks.server.ts
// copy to src/hooks.server.ts
import { SvelteKitSecurityHeaders, RuleSet } from '@faranglao/sveltekit-security-headers';

export const handle = SvelteKitSecurityHeaders({
	headers: [
		...RuleSet.SvelteKitSpecific,
		...RuleSet.OwaspRecommendedMinimal,

		// Access-Control-Allow-Origin header to allow requests
		// from your domain .. override value
		{
			name: 'Access-Control-Allow-Origin',
			value: 'https://sveltekit-security-headers.vercel.app'
		}

		// .. add custom headers
	],
	verbose: true
}).handle;
