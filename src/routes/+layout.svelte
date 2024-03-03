<script>
	import '../styles/app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	const title = 'sveltekit-security-headers';
	const description = 'Add HTTP Security Response Headers to any SvelteKit application';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="google-site-verification" content="8k3oeXaNn3LevaZpA9VGwV1dE1MvqW-8l1VqVX_MOHc" />
</svelte:head>

<main>
	<slot />
</main>
