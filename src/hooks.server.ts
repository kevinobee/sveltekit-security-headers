import { SvelteKitSecurityHeaders, RuleSet } from '$lib/index.js';

export const handle = SvelteKitSecurityHeaders({
	headers: [
		...new Set([
			// removes duplicates
			...RuleSet.SecurityHeaders,
			...RuleSet.SvelteKitSpecific,
			...RuleSet.OwaspRecommended
		])
	],
	verbose: true
}).handle;
