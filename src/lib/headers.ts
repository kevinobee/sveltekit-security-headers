import type { SecurityHeader, SvelteKitResponseHeadersConfig } from './types.js';

const setHeaderDiag = (header: SecurityHeader) =>
	`setting '${header.name}' header to '${header.value}'`;

const deleteHeaderDiag = (header: SecurityHeader, currentValue: string) =>
	`deleting '${header.name}' header, removing '${currentValue}' setting`;

export const applySecurityHeaders = (
	headers: Headers,
	config: SvelteKitResponseHeadersConfig
): void => {

	config.headers.forEach((securityHeader: SecurityHeader) => {
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
