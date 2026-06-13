---
name: Implementer test-fix churn limits live in the skill, dispatched on every brief
description: Pointer to ai/skills/minions/test-churn-limits.md — three attempts per failing test, 80 tool calls per dispatch, 5 minutes per test, escalate with evidence. Brief preamble in ai/skills/gru/dispatch.md mandates reading it.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
Hard caps on implementer test-fix grinding live in `ai/skills/minions/test-churn-limits.md`. The Gru dispatch preamble (`ai/skills/gru/dispatch.md` "Implementer brief preamble") mandates reading it at brief-open for every code-writing minion.

**Why:** 2026-05-11. Hornfels (step 7.7) churned past the safe ceiling on a failing test before Josh interrupted. Memory rules alone don't get into a minion's working set; the skill plus the dispatch-preamble citation does.

**How to apply:**

- When writing an implementer brief, never re-state the limits inline; cite the skill.
- The skill changes when the limits change; this memory entry stays a stable pointer.
- If a returning minion ignored the limits, the report should name it and the next dispatch sharpens the brief.
