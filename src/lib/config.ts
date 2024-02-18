import type { SecurityHeader } from './types.js';

const SecurityHeaders: SecurityHeader[] = [
	{ name: 'X-Frame-Options', value: 'DENY' },
	{ name: 'X-Content-Type-Options', value: 'nosniff' },
	{ name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' }
];

const SvelteKitSpecific: SecurityHeader[] = [
	{ name: 'X-Sveltekit-Page', value: null } // removes response header
];

const OwaspRecommended: SecurityHeader[] = [
	...new Set([
		// removes duplicates
		...SecurityHeaders
	])
];

export const RuleSet = {
	SecurityHeaders,
	SvelteKitSpecific,
	OwaspRecommended
};
