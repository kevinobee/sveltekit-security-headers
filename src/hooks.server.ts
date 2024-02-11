import { HttpResponseHeaders } from '$lib/headers.js';
import type { Handle } from '@sveltejs/kit';

HttpResponseHeaders.useOwaspRecommended();


export const handle: Handle = HttpResponseHeaders.applySecurityHeaderHook;
