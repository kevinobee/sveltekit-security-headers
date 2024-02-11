<script lang="ts">
	const title = 'sveltekit-security-headers';
	const description = 'Add HTTP Security Response Headers to any SvelteKit application';
	const npmPackage = `@faranglao/${title}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1>{title}</h1>

<p>
	Adds HTTP headers to page responses from any <a href="https://kit.svelte.dev/">SvelteKit</a> web application
	to provide industry expected security when visitors browse your site.
</p>

<h2>Installation</h2>

<p>
To add HTTP Security Response Headers to a SvelteKit application follow these steps:
</p>

<p>1. Install the package.</p>

<pre><code>
npm install {npmPackage}
</code></pre>

<p>
2. Add or update <code>src/hooks.server.ts</code>:  
</p>

<p>
Scenario: no previous Hooks defined in <code>src/hooks.server.ts</code>:
</p>

<pre><code>
import type { Handle } from '@sveltejs/kit';
import { HttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = HttpResponseHeaders.handle;
</code></pre>

<p>
Scenario: existing Hooks defined in <code>src/hooks.server.ts</code>:
</p>

<pre><code>
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { HttpResponseHeaders } from '@faranglao/sveltekit-security-headers';

export const handle: Handle = sequence(async ({ event, resolve }) => {
	// Do something with the inbound request
	const response = await resolve(event);
	// Do something with the outbound response before returning it
	return response;
}, HttpResponseHeaders.handle);
</code></pre>

<p>
Then run the web application using <code>npm run dev</code> or <code>npm run build && npm run preview</code>.
</p>

<h2>Source Code</h2>

<p>
Source code for the <code>{npmPackage}</code> package is maintained on
	<a href="https://github.com/kevinobee/{title}">GitHub</a>.
</p>
