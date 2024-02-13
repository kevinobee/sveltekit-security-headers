/** @type {import('./$types').PageLoad} */
export async function load() {
	const md = await import('../lib/docs/README.md');

	const content = md.default;

	return {
		content
	};
}
