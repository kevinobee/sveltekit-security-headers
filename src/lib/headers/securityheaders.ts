import type { SecurityHeader } from '../types.js';

// HTTP Security Response Headers Cheat Sheet
// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#http-security-response-headers-cheat-sheet
export const SecurityHeaders: SecurityHeader[] = [
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
