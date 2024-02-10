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
	Add HTTP Security Response Headers to any <a href="https://kit.svelte.dev/">SvelteKit</a> application by adding the <code>{npmPackage}</code> package using NPM.
</p>

<h2>Installation</h2>

<pre><code>
	npm install {npmPackage}
</code></pre>

<h2>Source Code</h2>

<p>
	Source code for the <code>{npmPackage}</code> package is maintained
	on <a href="https://github.com/kevinobee/{title}">GitHub</a>.
</p>
