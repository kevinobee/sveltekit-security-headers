import type { Handle } from '@sveltejs/kit';
import { HttpResponseHeaders } from './headers.js';

export const handleHttpResponseHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	HttpResponseHeaders.applySecurityHeaders(response.headers);
	return response;
};
