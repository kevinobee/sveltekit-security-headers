# Svelte HTTP Security Headers

[![Node.js CI](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/node.js.yml/badge.svg)](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/node.js.yml)
[![Lint](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/lint.yml/badge.svg)](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/lint.yml)
[![Playwright Tests](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/playwright.yml/badge.svg)](https://github.com/faranglao/svelte-http-security-headers/actions/workflows/playwright.yml)

Add HTTP Security Response Headers to any SvelteKit application by adding the `@faranglao/svelte-http-security-headers` package using NPM.

## Why

Lets start with the why.

[HTTP Response Headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) count for something in terms of delivering web content securely and ensuring your application gets served in the way that you intended.

Take a look at the OWASP [HTTP Security Response Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) to find out why you should be paying attention to what HTTP response headers your site returns to visitors.

### SvelteKit HTTP Headers

[SvelteKit](https://kit.svelte.dev/) is a framework for rapidly developing robust, performant web applications using [Svelte](https://svelte.dev/).

As a framework SvelteKit does not set HTTP response headers to meet specific OWASP recommendations out of the box. That is only a bad thing if you ignore it.

#### Security Headers Scans

To demonstrate the bring your own security hardening approach present in the SvelteKit framework we can use [Security Headers](https://securityheaders.com/) online scanner to run some tests.

Running a scan on the official [SvelteKit](https://kit.svelte.dev/) website gives us a [**D&nbsp;Grade**](https://securityheaders.com/?q=https%3A%2F%2Fkit.svelte.dev%2F&hide=on&followRedirects=on) for missing HTTP headers.

![The Security Headers summary for kit.svelte.dev](./static/kit-svelte-dev.jpg 'Security Headers summary for kit.svelte.dev')

![The Missing Headers for kit.svelte.dev](./static/kit-svelte-dev-missing-headers.jpg 'Missing Headers for kit.svelte.dev')

## A Simple Solution

The good news is that SvelteKit provides the [Hooks](https://kit.svelte.dev/docs/hooks) mechanism to update HTTP headers on the server before sending responses back to the browser.

By adding the `@faranglao/svelte-http-security-headers` package to a vanilla SvelteKit website you can achieve a far more respectable [**A&nbsp;Grade**](https://securityheaders.com/?q=https%3A%2F%2Fsvelte-http-security-headers.vercel.app&hide=on&followRedirects=on) for those HTTP Security Headers.

![Grade A Security Report Summary!](./static/a-grade-report.jpg 'Grade A Security Report Summary')

## Installation

```shell
npm install @faranglao/svelte-http-security-headers
```

### Getting Started

To add HTTP Security Response Headers to a SvelteKit application follow these steps:

1. Install the `@faranglao/svelte-http-security-headers` package using `npm install @faranglao/svelte-http-security-headers`.
2. Create a new file called `hooks.server.ts` in the `src` directory of the project and add the following code.

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
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://svelte-http-security-headers.vercel.app/
```

## Source Code

The source code for `@faranglao/svelte-http-security-headers` package is maintained here in the [svelte-http-security-headers](https://github.com/faranglao/svelte-http-security-headers) repository on GitHub.
