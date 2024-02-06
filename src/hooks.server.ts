import { HttpResponseHeaders } from '$lib/response.headers.js';
import type { Handle } from '@sveltejs/kit';

HttpResponseHeaders.useOwaspRecommended();

HttpResponseHeaders.useHeaders([
	{ name: 'X-Sveltekit-Page', value: undefined } // remove a SvelteKit header
	// { name: 'X-Powered-By', value: 'internet' }  // overwrite a header
]);

export const handle: Handle = HttpResponseHeaders.applySecurityHeaderHook;
