# SvelteKit Security Headers

Enhance visitor security in [SvelteKit](https://kit.svelte.dev) based web applications.

Add those missing HTTP response headers with `sveltekit-security-headers`.

[![Node.js CI](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/node.js.yml)
[![Lint](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/lint.yml)
[![Playwright Tests](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml/badge.svg)](https://github.com/kevinobee/sveltekit-security-headers/actions/workflows/playwright.yml)

## Installation

```shell
npm install @faranglao/sveltekit-security-headers
```

## Getting Started

To add HTTP response headers to your application install the package and export the `SvelteKitSecurityHeaders().handle` function.

The `SvelteKitSecurityHeaders().handle` function is a SvelteKit [Server Hook](https://kit.svelte.dev/docs/hooks#server-hooks) that is exported in `src/hooks.server.ts`.

```ts
// samples/securityheaders/hooks.server.ts
// copy to src/hooks.server.ts
import { SvelteKitSecurityHeaders } from '@faranglao/sveltekit-security-headers';

export const handle = SvelteKitSecurityHeaders().handle;
```

Then run the web application using `npm run dev`.

The `handle` function will add the following headers to your sites HTTP traffic.

```http
# Headers added to HTTP Response
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## Security Headers

Having already delivered over 250 million scans the [Security Headers](https://securityheaders.com/) site is a useful tool for analyzing HTTP headers.

The scan returns a score from an A+ grade down to an F grade. You can find more information on scoring on Scott Helme's [Security Headers](https://scotthelme.co.uk/tag/security-headers/) blog.

With minimal configuration `SvelteKitSecurityHeaders().handle` will add those missing HTTP headers required to achieve an **A&nbsp;grade** score on [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fsveltekit-security-headers.vercel.app%2F&followRedirects=on)

## Customizing Response Headers

The `SvelteKitSecurityHeaders().handle` function makes it possible to fully customize the HTTP response headers returned from your application.

The code below shows how to apply both pre-configured headers and add customer values to your HTTP responses.

```ts
// samples/custom/hooks.server.ts
// copy to src/hooks.server.ts
import { SvelteKitSecurityHeaders, RuleSet } from '@faranglao/sveltekit-security-headers';

export const handle = SvelteKitSecurityHeaders({
  headers: [
    ...RuleSet.SecurityHeaders,
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

The following code sample shows how to use [the sequence helper function](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks) to wrap existing server hook code and invoke the `SvelteKitSecurityHeaders().handle` function.

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

## Source Code

Source code for the <code>sveltekit-security-headers</code> package is maintained on [GitHub](https://github.com/kevinobee/sveltekit-security-headers).
