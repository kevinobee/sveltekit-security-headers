import { describe, it, expect } from 'vitest';
import { SvelteKitSecurityHeaders, RuleSet } from './index.js';

describe('SvelteKitSecurityHeaders server hook is exported', () => {
	it('is defined', () => {
		expect(SvelteKitSecurityHeaders).toBeDefined();
	});

	it('returns object with handle property', () => {
		expect(SvelteKitSecurityHeaders()).toHaveProperty('handle');
	});
});

describe('Pre-configured rule sets are available', () => {
	it('RuleSet is exported', () => {
		expect(RuleSet).toBeDefined();
	});
});
