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
		...SecurityHeaders,
		{ name: 'Content-Type', value: 'text/html; charset=UTF-8' },
		{ name: 'Expect-CT', value: null },
		{ name: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
		{ name: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
		{ name: 'Cross-Origin-Resource-Policy', value: 'same-site' },
		{ name: 'Server', value: 'webserver' },
		{ name: 'Public-Key-Pins', value: null }
	])
];

export const RuleSet = {
	SecurityHeaders,
	SvelteKitSpecific,
	OwaspRecommended
};
