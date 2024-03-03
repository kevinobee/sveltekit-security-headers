import type { SecurityHeader } from '../types.js';
import { env } from '$env/dynamic/private';

export const VercelSpecific: SecurityHeader[] = [
	// Cross-Origin-Embedder-Policy
	// MDN ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
	// Allow Comments workflow collaboration in preview and development environments
	{
		name: 'Cross-Origin-Embedder-Policy',
		value:
			env.VERCEL_ENV === 'preview' || env.VERCEL_ENV === 'development'
				? 'unsafe-none'
				: 'require-corp'
	}
];
