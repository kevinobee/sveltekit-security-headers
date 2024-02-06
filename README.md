# Svelte HTTP Security Headers

> A simple way to add HTTP Security Response Headers to a SvelteKit application.

Take a look at the OWASP [HTTP Security Response Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) to find out why you should be doing this.

## Sveltekit Example

The repository contains a simple app built using [SvelteKit](https://kit.svelte.dev/).

The HTTP Response Headers for the site can be set can be set using Environment variables

The application uses a SvelteKit [server hook](https://kit.svelte.dev/docs/hooks) to improve the security posture of the web application. Appropriate HTTP response headers can be returned from the server when handling requests.

To run the app use the following commands:

```shell
npm install
npm run dev
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

## HTTP Security Headers Scanning

To test the production website running on [Vercel](https://vercel.com/) using [OWASP Zed Attack Proxy (ZAP)](https://www.zaproxy.org/) run:

```shell
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://svelte-http-security-headers-tawny.vercel.app/
```
