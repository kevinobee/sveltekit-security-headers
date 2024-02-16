import type { SecurityHeader } from './types.js';

const Rules = {
	SecurityHeaders: [
		{ name: 'X-Frame-Options', value: 'DENY' },
		{ name: 'X-Content-Type-Options', value: 'nosniff' },
		{ name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
		{ name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' }
	]
};

const applySecurityHeaders = (
	headers: Headers,
	securityHeaders: SecurityHeader[] = Rules.SecurityHeaders
) => {
	securityHeaders.forEach((header) => {
		if (header.value !== undefined) {
			const currentValue = headers.get(header.name);
			if (currentValue == null) {
				headers.set(header.name, header.value);
			} else {
				if (currentValue !== header.value) {
					console.log(
						`WARN: setting ${header.name} HTTP response header to '${header.value}', replacing '${currentValue}' value`
					);
					headers.set(header.name, header.value);
				}
			}
		} else {
			if (headers.has(header.name)) {
				headers.delete(header.name);
			}
		}
	});
};

export const HttpResponseHeaders = {
	applySecurityHeaders,
	Rules
};
