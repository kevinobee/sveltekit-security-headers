export type HttpResponseHeader =
	| 'X-Frame-Options'
	| 'X-XSS-Protection'
	| 'X-Content-Type-Options'
	| 'Referrer-Policy'
	| 'Content-Type'
	| 'Set-Cookie'
	| 'Strict-Transport-Security'
	| 'Content-Security-Policy'
	| 'Access-Control-Allow-Origin'
	| 'Cross-Origin-Opener-Policy'
	| 'Cross-Origin-Embedder-Policy'
	| 'Cross-Origin-Resource-Policy'
	| 'Permissions-Policy'
	| 'Server'
	| 'X-DNS-Prefetch-Control'
	| 'Expect-CT'
	| 'X-Powered-By'
	| 'X-AspNet-Version'
	| 'X-AspNetMvc-Version'
	| 'Public-Key-Pins'
	| string;

export type SecurityHeader = {
	name: HttpResponseHeader;
	value: string | null;
};

export interface SvelteKitResponseHeadersConfig {
	headers: SecurityHeader[]
	verbose: boolean;
}
