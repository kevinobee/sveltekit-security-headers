export async function load(): Promise<{ content: unknown }> {
	const md = await import('$lib/docs/README.md');

	const content = md.default;

	return {
		content
	};
}
