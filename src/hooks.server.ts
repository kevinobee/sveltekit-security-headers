// src/hooks.server.ts

// scenario - no existing Hook defined
export { handleHttpResponseHeaders as handle } from './lib/hook.js';

// scenario - existing handle Hook defined
// import { handleHttpResponseHeaders } from "$lib/hook.js";
// import type { Handle } from "@sveltejs/kit";
// import { sequence } from "@sveltejs/kit/hooks";
// export const handle: Handle = sequence( /* existing Hook code , */ handleHttpResponseHeaders );
