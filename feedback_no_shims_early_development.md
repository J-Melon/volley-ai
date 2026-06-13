---
name: early-development-principle-aim-for-the-right-shape-no-transitional-shims
description: "When refactoring config / data / API surfaces in a young codebase, don't ship intermediate shapes that keep the legacy surface working. Bigger scope now beats compounding tech debt later."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

In Volley's current stage of development, refactor work should aim directly at the right architectural shape, not transitional shims that preserve the legacy call-site surface. Carrying a shim "for now" pushes the real refactor into a later, bigger, riskier PR — and the shim itself becomes a thing future contributors have to remember.

**Why:** Reinforced 2026-05-13 on SH-316 PR #651. Faraday extracted `PaddleConfig` from `BaseStatsConfig` and used `GameRules.base_stats = BASE.to_dict() | PADDLE.to_dict()` to keep every existing `ItemManager.get_stat(&"paddle_speed")` call site working with zero changes. The merge is a shim: a flat-string-keyed dictionary built from two typed configs, preserving the legacy API. Hooke flagged the silent-collision risk; Josh: "we are way too early in development to be thinking about shims, we should aim towards the right shape."

**How to apply:**

- When extracting a domain from a grab-bag (per [[feedback_extract_with_feature_not_after]]), the call-site refactor lands with the extraction. No "keep the old API working" merge / facade / proxy / forwarding layer.
- When a refactor's scope grows because the right shape needs more touched, that's the expected cost — surface to Josh but don't default to shimming.
- The "right shape" is usually structured typed access (`GameRules.paddle.paddle_speed`) plus a domain-aware accessor for things that genuinely need runtime resolution (item modifiers, dev panels). Flat string-keyed namespaces are the legacy shape that the refactor is trying to leave.
- This is an early-development rule. Once the game ships, transitional shims become reasonable to avoid breaking save formats or save-compatible APIs. While the prototype is in flight, prefer breaking changes that land the real shape.
