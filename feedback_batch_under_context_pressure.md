---
name: When Josh signals limit/context pressure, batch and decide
description: phrases like "I'm hitting the limit", "just batch", "wrap it up" mean stop asking clarifying questions, pick the obvious choice, and ship the remaining work in one pass
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
When Josh signals he's running out of context, tokens, or patience ("hitting the limit", "just batch", "wrap up", "ship it"), switch to batched-decision mode for the rest of the thread:

- Stop asking clarifying questions. Pick the most defensible default and execute.
- Combine all pending edits, commits, dispatches into one tool batch when possible.
- Skip nice-to-haves (follow-up tickets, memory polish, agent dispatches) unless the work explicitly depends on them.
- Surface the choices made in one terse summary at the end, so Josh can correct any later if needed.

**Why:** When Josh hits a limit, every back-and-forth question burns turns he doesn't have. He has already given enough direction; the cost of me picking wrong is small (he'll correct), the cost of asking is a wasted turn. Established 2026-04-30 mid-PR-#560: I asked Josh to disambiguate a debounce rule when he had already approved the direction, and he told me to just batch.

**How to apply:**
- Treat the pressure signal as standing authorisation to make pending judgement calls.
- The "obvious choice" is whatever I would have proposed if asked. Default to the simpler/smaller variant.
- Still respect hard rules (no force-push without consent, no merge without `Human Approved`, etc).
