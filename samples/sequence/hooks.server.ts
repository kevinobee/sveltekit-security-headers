// samples/sequence/hooks.server.ts
// copy to src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitSecurityHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = sequence(
	/* existing Hook code , */
	SvelteKitSecurityHeaders().handle
);
