# Vercel Hosting

## Issues

1. `Cross-Origin-Embedder-Policy: require-corp` blocks scripts from Vercel.

   Preview environments load scripts from `vercel.live` domain.

   The browser console logs report the error.

   ```http
   GET https://vercel.live/_next-live/feedback/feedback.js net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep 200 (OK)
   http://localhost:5173/
   ```

   **Background**

   Vercel's [Comments](https://vercel.com/docs/workflow-collaboration/comments) workflow collaboration tool allow Teams and invited participants to give direct feedback on preview deployments.

   **Workaround**

   Set `Cross-Origin-Embedder-Policy` header in `src/hooks.server.ts` by adding `RuleSet.VercelSpecific` to the `headers` array.

   ```ts
   export const handle = SvelteKitSecurityHeaders({
     headers: [
       // .. existing configuration
       ...RuleSet.VercelSpecific
     ]
     // .. existing configuration
   } as SvelteKitResponseHeadersConfig).handle;
   ```

   Refer to the OWASP [Cross-Origin-Embedder-Policy (COEP)](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#cross-origin-embedder-policy-coep) cheatsheet for original recommendation and explanation.

   Refer to [MDN web docs Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) for more information.
