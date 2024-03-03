<script>
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { GithubSolid, NpmSolid } from 'flowbite-svelte-icons';
	import { site } from './data.js';
	import '../app.postcss';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="google-site-verification" content={site.googleVerificationCode} />
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotTrail="place-content-end">
			<div class="bold hidden text-2xl lg:block">
				{site.repo.split('/').at(-1)}
			</div>
			<div class="my-1 w-1/2 text-sm text-primary-500/95">{site.description}</div>
			<svelte:fragment slot="trail">
				<div class="flex gap-x-4">
					<nav class="flex gap-x-2" aria-label="External links">
						<a href={site.repo}>
							<GithubSolid class="opacity-85" ariaLabel="GitHib code repository" size="lg" />
						</a>
						<a href={site.npm}>
							<NpmSolid class="opacity-85" ariaLabel="NPM package registry" size="lg" />
						</a>
					</nav>
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
