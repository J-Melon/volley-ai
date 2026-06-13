---
name: implementer-ships-static-no-runtime-qa
description: gdscript-implementer minions ship code + unit/integration tests + validate, green; they do NOT run the CLAUDE.md run(play) QA loop; because no runtime tools are used, they CAN run in worktree isolation; runtime feel-check is Josh's playtest on the open PR before merge, heavy runtime is the Ride
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

`gdscript-implementer` minions ship the diff with `validate` + unit/integration tests green. They do **not** run the CLAUDE.md final-QA loop (`run(play)`, `state_inspect`, `ui_map`, `input`, screenshots) as part of their dispatch.

**Why:** Josh, 2026-05-12: "We don't self qa at this point." Confirmed by how missions actually run (SH-437, 2026-05-30: all implementers dispatched in isolation, static-only, shipped green). The runtime feel-check is Josh's own playtest, which happens on the open PR before he merges; there is no per-PR runtime-verifier ([[feedback_pair_implementer_with_runtime_verifier]]); heavy runtime exercise is the Ride at mission close.

**How to apply:**
- Implementer briefs: write code, write/update tests, `validate`, run the suite, commit, push. No `run(play)` step, no screenshots, no self-QA loop.
- Because no runtime tools are used, implementer dispatches **run in worktree isolation** by default. (This updates [[feedback_godotiq_worktree_isolation]]: that file's "implementers needing runtime go in the main worktree" applies only to the rare explicit-runtime brief, not the normal static dispatch.)
- Do not append "runtime verification still owed" to a report; that is the agent's habit, not a gap ([[feedback_pair_implementer_with_runtime_verifier]]).
- If a brief or rule cites an implementer "self-QA"/`run(play)` step as normal, treat it as stale and fix it.
