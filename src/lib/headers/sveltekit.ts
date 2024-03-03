import type { SecurityHeader } from '../types.js';

export const SvelteKitSpecific: SecurityHeader[] = [
	// X-Sveltekit-Page
	// https://github.com/sveltejs/kit/discussions/9405
	{ name: 'X-Sveltekit-Page', value: null } // removes response header
];
