import { describe, it, expect } from 'vitest';
import { RuleSet } from './ruleset.js';

describe('RuleSet configuration', () => {
	describe('includes preset rule sets', () => {
		['SecurityHeaders', 'SvelteKitSpecific', 'OwaspRecommendedMinimal', 'OwaspRecommended'].forEach(
			(ruleSet) => {
				it(ruleSet, () => {
					expect(RuleSet).toHaveProperty(ruleSet);
				});
			}
		);
	});

	describe('rule sets contain HTTP response headers to apply', () => {
		it('SecurityHeaders', () => {
			expect(RuleSet.SecurityHeaders).not.toHaveLength(0);
		});

		it('SvelteKitSpecific', () => {
			expect(RuleSet.SvelteKitSpecific).not.toHaveLength(0);
		});

		it('OwaspRecommended', () => {
			expect(RuleSet.OwaspRecommendedMinimal).not.toHaveLength(0);
		});

		it('OwaspRecommended', () => {
			expect(RuleSet.OwaspRecommended).not.toHaveLength(0);
		});
	});
});
