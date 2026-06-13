---
name: Implementer minions cannot dispatch reviewers; Gru fires them post-PR
description: General-purpose and specialist implementers do not have the Agent tool, despite PARALLEL.md saying they should dispatch reviewers themselves; Gru is the only role that can fan out
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
Implementer minions (general-purpose dispatched as implementers, and the typed specialist implementers) do **not** have the Agent tool in their actual runtime, despite `ai/PARALLEL.md` step 5 instructing them to "dispatch matching specialists from `.claude/agents/`" after `gh pr create`. abe and dave both correctly flagged the gap when given the standard brief.

**Why:** the brief tells implementers to do something their tool surface cannot reach, costing a round-trip every PR. Either PARALLEL.md should change to put the reviewer fan-out on Gru explicitly, or the implementer agent definitions should grow the Agent tool. Until the doc/runtime is reconciled, Gru must fire the reviewer fan-out as a follow-up step in the dispatcher session, not delegate it into the implementer brief.

**How to apply:** When a code-shipping minion reports back with PR open + auto-merge enabled, immediately dispatch the path-mapped reviewer set yourself. Don't ask the implementer to do it. Brief implementers without the "dispatch reviewers" line - or include it as a heads-up that Gru will fan out, not as a task they own.
