# Svelte HTTP Security Headers

A simple way to add HTTP Security Response Headers to a SvelteKit application.

Take a look at the OWASP [HTTP Security Response Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) to find out why you should be doing this.

## HTTP Security Headers in SvelteKit

Running a [Security Headers](https://securityheaders.com/) scan on the official [SvelteKit](https://kit.svelte.dev/) website returns a surprising [**D&nbsp;Grade**](https://securityheaders.com/?q=https%3A%2F%2Fkit.svelte.dev%2F&hide=on&followRedirects=on) for missing HTTP headers.

![The Security Headers summary for kit.svelte.dev](./static/kit-svelte-dev.jpg 'Security Headers summary for kit.svelte.dev')

![The Missing Headers for kit.svelte.dev](./static/kit-svelte-dev-missing-headers.jpg 'Missing Headers for kit.svelte.dev')

Adding the `@faranglao/svelte-http-security-headers` package to a vanilla SvelteKit website achieves a more respectable [**A&nbsp;Grade**](https://securityheaders.com/?q=https%3A%2F%2Fsvelte-http-security-headers-tawny.vercel.app&hide=on&followRedirects=on) summary from the Security Headers scanner.

![Grade A Security Report Summary!](./static/a-grade-report.jpg 'Grade A Security Report Summary')

## Installation

```shell
npm install @faranglao/svelte-http-security-headers
```

## Adding HTTP Security Response Headers

To add HTTP Security Response Headers to a SvelteKit application follow these steps:

1. Install the `@faranglao/svelte-http-security-headers` package using `npm install @faranglao/svelte-http-security-headers`.
2. Create a new file called `hooks.server.ts` in the `src` directory of the project and add the following code:

```typescript
import { HttpResponseHeaders } from '$lib/response.headers.js';
import type { SecurityHeader } from '$lib/types.js';
import type { Handle } from '@sveltejs/kit';

HttpResponseHeaders.useOwaspRecommended();

export const handle: Handle = HttpResponseHeaders.applySecurityHeaderHook;
```

Then run the web application using `npm run dev` or `npm run build && npm run preview`.

## OWASP ZAP Scanning

Run an OWASP ZAP [baseline scan](https://www.zaproxy.org/docs/docker/baseline-scan/) of our website on [Vercel](https://vercel.com/) using the [OWASP Zed Attack Proxy (ZAP)](https://www.zaproxy.org/) with the following command:

```shell
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://svelte-http-security-headers-tawny.vercel.app/
```

## Source Code

The source code for the `@faranglao/svelte-http-security-headers` package is maintained in the [svelte-http-security-headers](https://github.com/faranglao/svelte-http-security-headers) repository on GitHub.
