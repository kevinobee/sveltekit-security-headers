<h1>Svelte HTTP Security Headers</h1>

<p>A simple way to add HTTP Security Response Headers to a SvelteKit application.</p>

<p>
	Take a look at the OWASP <a
		href="https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html"
		>HTTP Security Response Headers Cheat Sheet</a
	> to find out why you should be doing this.
</p>

<h2>HTTP Security Headers in SvelteKit</h2>

<p>
	Running the <a href="https://securityheaders.com/">Security Headers</a> online scan against the
	official
	<a href="https://kit.svelte.dev/">SvelteKit</a>
	website returns a surprising
	<a
		href="https://securityheaders.com/?q=https%3A%2F%2Fkit.svelte.dev%2F&hide=on&followRedirects=on"
		><strong>D</strong>&nbsp;Grade</a
	> summary.
</p>

<img src="kit-svelte-dev.jpg" alt="Security Headers summary for kit.svelte.dev" />
<img src="kit-svelte-dev-missing-headers.jpg" alt="Missing Headers for kit.svelte.dev" />

<p>
	Adding the <code>@faranglao/svelte-http-security-headers</code> package to a vanilla SvelteKit
	website achieves a much more respectable
	<a
		href="https://securityheaders.com/?q=https%3A%2F%2Fsvelte-http-security-headers-tawny.vercel.app&hide=on&followRedirects=on"
		><strong>A</strong>&nbsp;Grade</a
	> summary from the Security Headers scan.
</p>

<img src="a-grade-report.jpg" alt="Grade A Security Report Summary" />

<h2>Installation</h2>

<pre class="command-line">
npm install @faranglao/svelte-http-security-headers
</pre>

<h2>Adding HTTP Security Response Headers</h2>

<p>To add HTTP Security Response Headers to a SvelteKit application follow these steps:</p>

<ol>
	<li>
		Install the <code>@faranglao/svelte-http-security-headers</code> package using
		<code>npm install @faranglao/svelte-http-security-headers</code>.
	</li>
	<li>
		Create a new file called <code>hooks.server.ts</code> in the <code>src</code> directory of the project
		and add the following code:
	</li>
</ol>

<pre class="code">
import &#123;HttpResponseHeaders&#125; from '$lib/response.headers.js';
import type &#123;SecurityHeader&#125; from '$lib/types.js';
import type &#123;Handle&#125; from '@sveltejs/kit';

HttpResponseHeaders.useOwaspRecommended();

export const handle: Handle = HttpResponseHeaders.applySecurityHeaderHook;
</pre>

<p>
	Then run the web application using <code>npm run dev</code> or
	<code>npm run build && npm run preview</code>.
</p>

<h2>OWASP ZAP Scanning</h2>

<p>
	Run a baseline scan of our website on <a href="https://vercel.com/">Vercel</a> using
	<a href="https://www.zaproxy.org/">OWASP Zed Attack Proxy (ZAP)</a> run:
</p>

<pre class="command-line">
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://svelte-http-security-headers-tawny.vercel.app/
</pre>

<h2>Source Code</h2>

<p>
	The source code for the <code>@faranglao/svelte-http-security-headers</code> page is maintained in
	the
	<a href="https://github.com/faranglao/svelte-http-security-headers"
		>svelte-http-security-headers</a
	> repository on GitHub.
</p>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}

	p,
	h1,
	h2 {
		overflow-wrap: break-word;
	}

	img {
		display: block;
		max-width: 100%;
	}

	/* Page CSS */

	:global(body) {
		background-color: hsla(330, 11%, 35%, 0.247);
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif,
			Helvetica,
			sans-serif;
		font-size: 1rem;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		max-width: 76ch;
		margin-inline: auto;
	}

	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1.4rem;
	}

	h1,
	h2 {
		text-wrap: balance;
		padding-block: 1rem;
	}

	p {
		text-wrap: pretty;
		padding-block-end: 0.5rem;
	}

	ol {
		padding-block: 1rem;
		padding-inline: 1rem;
	}

	ol li {
		padding-block-end: 1rem;
	}

	ol li:last-child {
		padding-block-end: 0;
	}

	pre.code,
	pre.command-line {
		display: block;
		background-color: rgba(119, 136, 153, 0.096);

		margin-inline: 0.5rem;
		margin-block-start: 0.5em;
		margin-block-end: 2em;
		padding: 0.5rem;
		border: solid 3px hsla(0, 0%, 0%, 0.082);
		box-shadow: 5px 5px 10px rgba(1, 22, 39, 0.7);
		text-wrap: pretty;
	}

	pre.command-line {
		background-color: rgba(61, 103, 145, 0.137);
	}

	pre.code {
		text-wrap: pretty;
		overflow: auto;
		margin-block-end: 2em;
		line-height: 1.4rem;
	}

	code {
		font-weight: 600;
	}

	img {
		padding: 1rem;
		min-width: 100px;
	}
</style>
