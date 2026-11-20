# SAM.exe chat performance upgrade

## What changed

- The chat route requests OpenAI-compatible streaming from EURI and forwards generated text as a plain-text stream.
- Both the portfolio chat panel and the 3D avatar chat now render text incrementally. The 3D avatar still speaks after the complete response arrives, preserving its existing audio/lip-sync pipeline.
- The system prompt is assembled from profile facts and up to three projects selected for the visitor's latest question, instead of sending the entire project catalogue on every request.
- The request history sent to the model is capped at the latest six messages.
- Identical single-question requests can use a short-lived, bounded in-memory cache on a warm server instance. This cache is opportunistic and is not shared across serverless instances.
- Added unit tests for stream consumption and query-focused context selection.

## Compatibility and safety

- Existing UI, 3D rendering, voice controls, section navigation, and EURI environment variables are preserved.
- No API key or secret is committed.
- If EURI does not return an event stream for the configured model, the route supports a normal JSON completion response, but that provider response cannot be displayed incrementally.
- Provider streaming is parsed as OpenAI-compatible Server-Sent Events. Confirm the configured EURI model supports stream=true in the deployed account.

## Verification

Run from the repository root:

    npm ci
    npm run typecheck
    npm test
    npm run build

Manual smoke test:
1. Open the standard portfolio chatbot and ask about ARGUS AI.
2. Confirm text appears before the full answer is complete.
3. Ask about NEXUS and confirm the response stays grounded in its documented prototype limitations.
4. Repeat the same single-turn question and inspect the X-SAM-Cache response header on a warm instance.
5. Open the 3D SAM.exe avatar, ask a question, and confirm streamed text appears while voice playback still starts after the completed answer.
6. Confirm section navigation and email-draft actions still work.

## Deployment

Do not deploy until typecheck, unit tests, production build, and the manual smoke test pass with the production EURI key/model configuration.
