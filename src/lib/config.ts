import { DEV } from 'esm-env';

import type { SecurityHeader } from './types.js';

export const url = DEV ? 'http://localhost:5173/' : 'https://yoursite.com';

// HTTP Security Response Headers Cheat Sheet
// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#http-security-response-headers-cheat-sheet
const SecurityHeaders: SecurityHeader[] = [
	// X-Frame-Options
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-frame-options
	{ name: 'X-Frame-Options', value: 'DENY' },

	// X-Content-Type-Options
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-content-type-options
	{ name: 'X-Content-Type-Options', value: 'nosniff' },

	// Referrer-Policy
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#referrer-policy
	{ name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

	// Permissions-Policy (formerly Feature-Policy)
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#permissions-policy-formerly-feature-policy
	{ name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' }
];

const SvelteKitSpecific: SecurityHeader[] = [
	// X-Sveltekit-Page
	// https://github.com/sveltejs/kit/discussions/9405
	{ name: 'X-Sveltekit-Page', value: null } // removes response header
];

const OwaspRecommendedMinimal: SecurityHeader[] = [
	// remove any duplicates with a Set
	...new Set([
		...SecurityHeaders,

		// X-XSS-Protection
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-xss-protection
		{ name: 'X-XSS-Protection', value: '1; mode=block' },

		// Content-Type
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#content-type
		{ name: 'Content-Type', value: 'text/html; charset=UTF-8' },

		// Expect-CT
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#expect-ct
		{ name: 'Expect-CT', value: null }, // removes response header

		// Cross-Origin-Opener-Policy (COOP)
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#cross-origin-opener-policy-coop
		{ name: 'Cross-Origin-Opener-Policy', value: 'same-origin' },

		// Cross-Origin-Embedder-Policy (COEP)
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#cross-origin-embedder-policy-coep
		{ name: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },

		// Cross-Origin-Resource-Policy (CORP)
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#cross-origin-resource-policy-corp
		{ name: 'Cross-Origin-Resource-Policy', value: 'same-site' },

		// Server
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#server
		{ name: 'Server', value: 'webserver' },

		// X-DNS-Prefetch-Control
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-dns-prefetch-control
		{ name: 'X-DNS-Prefetch-Control', value: 'off' }, // TODO review

		// Public-Key-Pins (HPKP)
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#public-key-pins-hpkp
		{ name: 'Public-Key-Pins', value: null } // removes response header
	])
];

const OwaspRecommended: SecurityHeader[] = [
	// remove any duplicates with a Set
	...new Set([
		...OwaspRecommendedMinimal,

		// Set-Cookie
		// .. override value in `src/hooks.server.ts` of your application
		// .. This is not a security header per se, but its security attributes are crucial.
		// .. The cookie should be set to `secure` and `httponly`.
		// .. The cookie should be set to `samesite=strict` to prevent CSRF attacks.
		// .. The cookie should be set to `max-age` to prevent CSRF attacks.
		// refer to https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies
		// and https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#set-cookie
		// { name: 'Set-Cookie', value: 'override with your own value' },

		// Strict-Transport-Security (HSTS)
		// .. override value in `src/hooks.server.ts` of your application
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#strict-transport-security-hsts
		// { name: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },

		// Content-Security-Policy (CSP)
		// .. override value in `src/hooks.server.ts` of your application
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#content-security-policy-csp
		// { name: 'Content-Security-Policy', value: 'override with your own value' },

		// Access-Control-Allow-Origin
		// .. override value with your domain in `src/hooks.server.ts` of your application
		// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#access-control-allow-origin
		{ name: 'Access-Control-Allow-Origin', value: url }
	])
];

// Not required in SvelteKit, included here for completeness
const NonSvelteKit: SecurityHeader[] = [
	// X-Powered-By
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-powered-by
	{ name: 'X-Powered-By', value: null }, // removes response header

	// X-AspNet-Version
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-aspnet-version
	{ name: 'X-AspNet-Version', value: null }, // removes response header

	// X-AspNetMvc-Version
	// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-aspnetmvc-version
	// Not required in SvelteKit, included here for completeness
	{ name: 'X-AspNetMvc-Version', value: null } // removes response header
];

export const RuleSet = {
	SecurityHeaders,
	SvelteKitSpecific,
	NonSvelteKit,
	OwaspRecommendedMinimal,
	OwaspRecommended
};
