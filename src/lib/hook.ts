import type { Handle } from '@sveltejs/kit';
import type { SecurityHeader, SvelteKitResponseHeadersConfig } from './types.js';
import { RuleSet } from './config.js';

const setHeaderDiag = (name: string, value: string) => `setting '${name}' header to '${value}'`;

const deleteHeaderDiag = (name: string, currentValue: string) =>
	`deleting '${name}' header, removing '${currentValue}' setting`;

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
		const name = securityHeader.name.trim();
		const value =
			typeof securityHeader.value === 'string' ? securityHeader.value.trim() : securityHeader.value;

		const currentValue = headers.get(name);

		if (value !== null) {
			if (config.verbose) console.log(setHeaderDiag(name, value!));

			if (currentValue == null) {
				headers.set(name, value!);
			} else {
				if (currentValue !== value) {
					headers.set(name, value!);
				}
			}
		} else {
			if (currentValue) {
				if (config.verbose) console.log(deleteHeaderDiag(name, currentValue));
				headers.delete(name);
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
