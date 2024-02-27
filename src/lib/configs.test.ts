import { describe, it, expect } from 'vitest';
import { RuleSet } from './index.js';

describe('RuleSet configuration', () => {
	describe('includes preset rule sets', () => {
		['SecurityHeaders', 'SvelteKitSpecific', 'OwaspRecommendedMinimal', 'OwaspRecommended'].forEach(
			(ruleSet) => {
				it(ruleSet, () => {
					expect(RuleSet).toHaveProperty(ruleSet);
				});
			}
		);

		it('rule sets contain at least one header', () => {
			expect(RuleSet.SecurityHeaders).not.toBe([]);
			expect(RuleSet.SvelteKitSpecific).not.toBe([]);
			expect(RuleSet.OwaspRecommendedMinimal).not.toBe([]);
			expect(RuleSet.OwaspRecommended).not.toBe([]);
		});
	});
});
