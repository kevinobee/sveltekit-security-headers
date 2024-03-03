import { DEV } from 'esm-env';

import type { SecurityHeader } from '../types.js';
import { OwaspRecommendedMinimal } from './owasp.minimal.js';

export const url = DEV ? 'http://localhost:5173/' : 'https://yoursite.com';

export const OwaspRecommended: SecurityHeader[] = [
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
];
