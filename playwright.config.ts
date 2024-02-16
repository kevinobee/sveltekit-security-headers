import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		stdout: 'ignore',
		stderr: 'pipe',
	},
	testDir: 'tests',
	reporter: process.env.CI
		? [
				[ 'github'],
				[ 'html', { open: 'never' } ]
			]
		: 'list',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
