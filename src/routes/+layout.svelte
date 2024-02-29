<script>
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { GithubSolid, NpmSolid } from 'flowbite-svelte-icons';
	import { site } from './data.js';
	import '../app.postcss';
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="google-site-verification" content={site.googleVerificationCode} />
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotTrail="place-content-end">
			<div class="bold text-2xl">
				{site.repo.split('/').at(-1)}
			</div>
			<div class="my-1 text-sm text-primary-500/95">{site.description}</div>
			<svelte:fragment slot="trail">
				<div class="flex items-center gap-x-4">
					<nav class="flex items-center gap-x-2" aria-label="External links">
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
