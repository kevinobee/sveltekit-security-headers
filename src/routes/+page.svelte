<script lang="ts">
	import '../app.css';

	const title = 'sveltekit-security-headers';
	const description = 'Add HTTP Security Response Headers to any SvelteKit application';
	const npm = `@faranglao/${title}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1>{title}</h1>

<p>
	Add HTTP Security Response Headers to any <a href="https://kit.svelte.dev/">SvelteKit</a> application by adding the <code>{npm}</code> package using NPM.
</p>

<h2>Source Code</h2>

<p>
	Source code for the <code>{npm}</code> package is maintained
	on <a href="https://github.com/kevinobee/svelte-http-security-headers">GitHub</a>.
</p>
