import type { Handle } from '@sveltejs/kit';
import type { SecurityHeader } from './types.js';

const Rules = {
	SecurityHeaders: [
		{ name: 'X-Frame-Options', value: 'DENY' },
		{ name: 'X-Content-Type-Options', value: 'nosniff' },
		{ name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
		{ name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' }
	]
};

const applySecurityHeaders = (headers: Headers, securityHeaders: SecurityHeader[]) => {
	securityHeaders.forEach((header) => {
		if (header.value !== undefined) {
			if (headers.get(header.name) !== header.value) {
				// console.log('Set response header', {header});
				headers.set(header.name, header.value);
			}
		} else {
			if (headers.has(header.name)) {
				// console.log('Remove response header', {name: header.name, value: headers.get(header.name)});
				headers.delete(header.name);
			}
		}
	});
};

const applySecurityHeadersHandler: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	applySecurityHeaders(response.headers, Rules.SecurityHeaders);
	return response;
};

export const HttpResponseHeaders = {
	handle: applySecurityHeadersHandler,
	applySecurityHeaders,
	Rules
};
