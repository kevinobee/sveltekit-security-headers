import { SecurityHeaders } from './securityheaders.js';
import { SvelteKitSpecific } from './sveltekit.js';
import { VercelSpecific } from './vercel.js';
import { OwaspRecommendedMinimal } from './owasp.minimal.js';
import { OwaspRecommended } from './owasp.recommended.js';

export const RuleSet = {
	SecurityHeaders,
	SvelteKitSpecific,
	OwaspRecommendedMinimal,
	OwaspRecommended,
	VercelSpecific
};
