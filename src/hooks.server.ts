// Scenario: no previous Hooks defined in src/hooks.server.ts
import { HttpResponseHeaders } from './lib/headers.js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = HttpResponseHeaders.handle;

// Scenario: existing Hooks defined in src/hooks.server.ts:
// import { HttpResponseHeaders } from "$lib/headers.js";
// import type { Handle } from "@sveltejs/kit";
// import { sequence } from "@sveltejs/kit/hooks";

// export const handle: Handle = sequence( async ( { event, resolve } ) => {
// 	// Do something with the inbound request
// 	const response = await resolve( event );
// 	// Do something with the response before returning it
// 	return response;
// }, HttpResponseHeaders.handle);
