# sveltekit-security-headers

[![Node.js CI](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml)
[![Lint](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml)
[![Playwright Tests](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml)

## Installation

```shell
npm install @faranglao/sveltekit-security-headers
```

Adds HTTP headers to page responses from any SvelteKit web application to provide industry expected security when visitors browse your site.

### Getting Started

To add HTTP Security Response Headers to a SvelteKit application follow these steps:

1. Install the `@faranglao/sveltekit-security-headers` package using `npm install @faranglao/sveltekit-security-headers`.

1. Add or update the [hooks.server.ts](./src/hooks.server.ts) file to the `src` folder.

- Scenario: no previous Hooks defined in `src/hooks.server.ts`:

```ts
import type { Handle } from '@sveltejs/kit';
import { HttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = HttpResponseHeaders.handle;
```

- Scenario: existing Hooks defined in `src/hooks.server.ts`:

```ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { HttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = sequence(async ({ event, resolve }) => {
	// Do something with the inbound request
	const response = await resolve(event);
	// Do something with the outbound response before returning it
	return response;
}, HttpResponseHeaders.handle);
```

Then run the web application using `npm run dev` or `npm run build && npm run preview`.

## Source Code

Source code for the <code>sveltekit-security-headers</code> package is maintained on [GitHub](https://github.com/kevinobee/sveltekit-security-headers).
