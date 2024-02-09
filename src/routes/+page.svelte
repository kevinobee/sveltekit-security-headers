<script lang="ts">
	import '../app.css';

	const title = 'Svelte HTTP Security Headers';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>Svelte HTTP Security Headers</h1>

<p>
	Add HTTP Security Response Headers to any SvelteKit application by adding the <code
		>@faranglao/svelte-http-security-headers</code
	> package using NPM.
</p>

<h2>Why</h2>

<p>Lets start with the why.</p>

<p>
	<a href="https://developer.mozilla.org/en-US/docs/Glossary/Response_header"
		>HTTP Response Headers</a
	>
	count for something in terms of delivering web content securely and ensuring your application gets
	served in the way that you intended.
</p>

<p>
	Take a look at the OWASP <a
		href="https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html"
		>HTTP Security Response Headers Cheat Sheet</a
	> to find out why you should be doing this.
</p>

<h3>SvelteKit HTTP Headers</h3>

<p>
	<a href="https://kit.svelte.dev/">SvelteKit</a> is a framework for rapidly developing robust,
	performant web applications using <a href="https://svelte.dev/">Svelte</a>.
</p>

<p>
	As a framework SvelteKit does not set HTTP response headers to meet specific OWASP recommendations
	out of the box. That is only a bad thing if you ignore it.
</p>

<h3>Security Headers Scans</h3>

<p>
	To demonstrate the bring your own security hardening approach present in the SvelteKit framework
	we can use <a href="https://securityheaders.com/">Security Headers</a> online scanner to run some tests.
</p>

<p>
	Running a scan on the official
	<a href="https://kit.svelte.dev/">SvelteKit</a>
	website gives us a
	<a
		href="https://securityheaders.com/?q=https%3A%2F%2Fkit.svelte.dev%2F&hide=on&followRedirects=on"
		><strong>D</strong>&nbsp;Grade</a
	> for missing HTTP headers.
</p>

<img src="kit-svelte-dev.jpg" alt="Security Headers summary for kit.svelte.dev" />
<img src="kit-svelte-dev-missing-headers.jpg" alt="Missing Headers for kit.svelte.dev" />

<h2>A Simple Solution</h2>

<p>
	The good news is that SvelteKit provides the <a href="https://kit.svelte.dev/docs/hooks">Hooks</a>
	mechanism to update HTTP headers on the server before sending responses back to the browser.
</p>

<p>
	By adding the <code>@faranglao/svelte-http-security-headers</code> package to a vanilla SvelteKit
	website you can achieve a far more respectable
	<a
		href="https://securityheaders.com/?q=https%3A%2F%2Fsvelte-http-security-headers.vercel.app&hide=on&followRedirects=on"
		><strong>A</strong>&nbsp;Grade</a
	> status for those HTTP Security Headers.
</p>

<img src="a-grade-report.jpg" alt="Grade A Security Report Summary" />

<h2>Installation</h2>

<pre class="command-line">
npm install @faranglao/svelte-http-security-headers
</pre>

<h2>Getting Started</h2>

<p>To add HTTP Security Response Headers to a SvelteKit application follow these steps:</p>

<ol>
	<li>
		Install the <code>@faranglao/svelte-http-security-headers</code> package using
		<code>npm install @faranglao/svelte-http-security-headers</code>.
	</li>
	<li>
		Create a new file called <code>hooks.server.ts</code> in the <code>src</code> directory of the project
		and add the following code.
	</li>
</ol>

<pre><code
		>import &#123;HttpResponseHeaders&#125; from '$lib/response.headers.js';
import type &#123;SecurityHeader&#125; from '$lib/types.js';
import type &#123;Handle&#125; from '@sveltejs/kit';

HttpResponseHeaders.useOwaspRecommended();

export const handle: Handle = HttpResponseHeaders.applySecurityHeaderHook;</code
	></pre>

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
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://svelte-http-security-headers.vercel.app/
</pre>

<h2>Source Code</h2>

<p>
	The source code for <code>@faranglao/svelte-http-security-headers</code> package is maintained
	here in the
	<a href="https://github.com/kevinobee/svelte-http-security-headers"
		>svelte-http-security-headers</a
	> repository on GitHub.
</p>
