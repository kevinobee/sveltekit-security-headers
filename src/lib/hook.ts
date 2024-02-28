import type { Handle } from '@sveltejs/kit';
import type { SecurityHeader, SvelteKitResponseHeadersConfig } from './types.js';
import { RuleSet } from './config.js';

const setHeaderDiag = (header: SecurityHeader) =>
	`setting '${header.name}' header to '${header.value}'`;

const deleteHeaderDiag = (header: SecurityHeader, currentValue: string) =>
	`deleting '${header.name}' header, removing '${currentValue}' setting`;

const uniqueHeaders = (headers: SecurityHeader[]) => {
	const unique: SecurityHeader[] = [];
	headers.forEach((h) => {
		const item = unique.find((u) => u.name === h.name);
		if (!item) {
			unique.push(h);
		} else {
			item.value = h.value;
		}
	});

	return unique;
};

const applySecurityHeaders = (headers: Headers, config: SvelteKitResponseHeadersConfig): void => {
	uniqueHeaders(config.headers).forEach((securityHeader: SecurityHeader) => {
		const currentValue = headers.get(securityHeader.name);

		if (securityHeader.value !== null) {
			if (config.verbose) console.log(setHeaderDiag(securityHeader));

			if (currentValue == null) {
				headers.set(securityHeader.name, securityHeader.value);
			} else {
				if (currentValue !== securityHeader.value) {
					headers.set(securityHeader.name, securityHeader.value);
				}
			}
		} else {
			if (currentValue) {
				if (config.verbose) console.log(deleteHeaderDiag(securityHeader, currentValue));
				headers.delete(securityHeader.name);
			}
		}
	});
};

export function SvelteKitSecurityHeaders(
	config: SvelteKitResponseHeadersConfig = {
		headers: RuleSet.SecurityHeaders,
		verbose: false
	}
): {
	handle: Handle;
} {
	return {
		async handle({ event, resolve }) {
			const response = await resolve(event);
			applySecurityHeaders(response.headers, config);
			return response;
		}
	};
}
