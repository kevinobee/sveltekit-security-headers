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

<pre><code>npm install {npmPackage}</code></pre>

<p>
	Then run the web application using <code>npm run dev</code> or
	<code>npm run build && npm run preview</code>.
</p>

<h2>Source Code</h2>

<p>
	Source code for the <code>{npmPackage}</code> package is maintained on
	<a href="https://github.com/kevinobee/{title}">GitHub</a>.
</p>
