---
name: Auto-sweep when voice rules are added
description: When a new rule lands in ai/skills/voice.md (or a sibling style skill), dispatch the sweep on affected docs in the same turn; don't ask whether to apply
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When a new rule is added to `ai/skills/voice.md` (or a sibling style/style-adjacent skill), dispatch the sweep on the affected docs in the SAME TURN. Don't ask "want me to sweep?"; that's a confirm-the-obvious gate Josh has already approved by adding the rule.

**Why:** 2026-04-25, Josh: "Also just do the sweeps automatically." After three rounds of "fold the rule in" → "want a sweep?" → "yes" the asking became friction. The act of adding a rule to the skill is the signal to apply it; the sweep is the test. Auto-dispatching keeps the rhythm of rule-then-test in one turn.

**How to apply:**

- Add the rule to the skill, commit, push.
- Dispatch the sweep on every affected doc immediately, parallel where possible. Bible + tech-context for prose rules; just bible for narrative-shape rules; both for any general voice rule.
- Use a fresh codename per sweep. Pick from the rotating pool (GF / Hitchhiker's / Oddworld / Omori / Outer Wilds + Martha).
- Brief includes: read the updated skill at the new head, scope-filter to the new rule, conservative bias (one change per paragraph max for additive rules, often none).
- Report back with the SHA and a short summary; don't gate on Josh.

**When to ask first (carve-outs):**

- The rule is contentious or experimental and you want Josh to confirm the framing first. Ask BEFORE adding to the skill, not after.
- The sweep is going to be huge (more than two or three docs, or rewriting major sections). Confirm scope.
- The rule contradicts an existing rule. Resolve the conflict in conversation, then both rule and sweep land together.
- The sweep is for a positive/additive rule (e.g. "use literary devices sparingly") AND the agent has shown a pattern of overshooting on additive sweeps. In that case, the brief should heavily emphasise the cap, but still auto-dispatch unless Josh has flagged caution.

This is the prose-equivalent of "go" dispatching the swarm: the trigger is implicit in the action that came before.
