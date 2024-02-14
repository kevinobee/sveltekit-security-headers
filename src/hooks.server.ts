// src/hooks.server.ts
import { handleHttpResponseHeaders } from './lib/hook.js';
import type { Handle } from '@sveltejs/kit';

// import sequence for scenario 2
// import { sequence } from "@sveltejs/kit/hooks";

// scenario 1: no previous handle Hook defined
export const handle: Handle = handleHttpResponseHeaders;

// scenario 2: existing handle Hook defined
// export const handle: Handle = sequence( existingHook, handleHttpResponseHeaders );
