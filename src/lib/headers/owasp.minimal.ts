import type { SecurityHeader } from '../types.js';
import { SecurityHeaders } from './securityheaders.js';

export const OwaspRecommendedMinimal: SecurityHeader[] = [
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
