# sveltekit-security-headers

Adds HTTP headers to page responses from any SvelteKit web application enhancing security for visitors browsing your site.

[![Node.js CI](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml)
[![Lint](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml)
[![Playwright Tests](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml)

## Installation

```shell
npm install @faranglao/sveltekit-security-headers
```

## Getting Started

To add HTTP Security Response Headers to a SvelteKit application follow these steps:

1. Install the `@faranglao/sveltekit-security-headers` package using `npm install @faranglao/sveltekit-security-headers`.

2. Add the `handleHttpResponseHeaders` Hook in [src/hooks.server.ts](./src/hooks.server.ts):

- Scenario 1: no previous `handle` Hook defined in `src/hooks.server.ts`:

```ts
import type { Handle } from '@sveltejs/kit';
import { handleHttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = handleHttpResponseHeaders;
```

- Scenario 2: existing `handle` Hook defined in `src/hooks.server.ts`:

Use [the sequence helper function](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks) to wrap the existing hook and `handleHttpResponseHeaders` handler as shown below.

```ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleHttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = sequence(existingHook, handleHttpResponseHeaders);
```

Then run the web application using `npm run dev` or `npm run build && npm run preview`.

## Source Code

Source code for the <code>sveltekit-security-headers</code> package is maintained on [GitHub](https://github.com/kevinobee/sveltekit-security-headers).
