# SvelteKit Security Headers

Enhance visitor security in [SvelteKit](https://kit.svelte.dev) apps. Add those [missing HTTP response headers](https://securityheaders.com/?q=https%3A%2F%2Fkit.svelte.dev%2F&hide=on&followRedirects=on).

[![Node.js CI](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml)
[![Lint](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml)
[![Playwright Tests](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml)

## Install

```shell
npm install @faranglao/sveltekit-security-headers
```

## Usage

```ts
// src/hooks.server.ts
import { SvelteKitSecurityHeaders } from '@faranglao/sveltekit-security-headers';

export const handle = SvelteKitSecurityHeaders().handle;
```

To add HTTP response headers to your application install the package and export the `handle` function from `SvelteKitSecurityHeaders`. The `handle` function is a SvelteKit [Server Hook](https://kit.svelte.dev/docs/hooks#server-hooks) exported in `src/hooks.server.ts`.

## Default Response Headers

The `SvelteKitSecurityHeaders` server hook adds the following response headers to routed HTTP requests:

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## Customizing Response Headers

The code below shows how to apply both pre-configured headers and add customer values to your HTTP responses.

```ts
// samples/custom/hooks.server.ts
// copy to src/hooks.server.ts
import { SvelteKitSecurityHeaders, RuleSet } from '@faranglao/sveltekit-security-headers';

export const handle = SvelteKitSecurityHeaders({
  headers: [
    ...RuleSet.SvelteKitSpecific,
    ...RuleSet.OwaspRecommendedMinimal,

    // Access-Control-Allow-Origin header to allow requests
    // from your domain .. override value
    {
      name: 'Access-Control-Allow-Origin',
      value: 'https://sveltekit-security-headers.vercel.app'
    }

    // .. add custom headers
  ],
  verbose: true
}).handle;
```

## Multiple Server Hooks

The [sequence helper function](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks) is used to call multiple server hook functions as shown below.

```ts
// samples/sequence/hooks.server.ts
// copy to src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitSecurityHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = sequence(
  /* existing Hook code , */
  SvelteKitSecurityHeaders().handle
);
```

## Test Security Headers

Having already delivered over 250 million scans the [Security Headers](https://securityheaders.com/) site is a useful tool for analyzing HTTP headers.

The scan returns a score from an A+ grade down to an F grade. You can find more information on scoring on Scott Helme's [Security Headers](https://scotthelme.co.uk/tag/security-headers/) blog.

The `SvelteKitSecurityHeaders` server hook adds the HTTP response headers required to achieve an **A&nbsp;grade** score on [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fsveltekit-security-headers.vercel.app%2F&followRedirects=on)

## Source Code

Source code for the package is maintained on [GitHub](https://github.com/kevinobee/sveltekit-security-headers).

The package is published on [NPM](https://www.npmjs.com/package/@faranglao/sveltekit-security-headers).
