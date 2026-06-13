---
name: Reviewer shape lives in a skill
description: Review-comment shape lives in ai/skills/minions/reviewers.md; reviewer agents point at it. Skill tree splits gru/ vs minions/ so reviewer rules only land in minions/
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Reviewer challenge comment conventions (verdict shape, bold-name prefix, brevity caps, label call, em-dash ban, AI-tell list) live in a single skill file at `ai/skills/minions/reviewers.md`. Every reviewer agent def carries a one-line pointer at the end of its Output section: "Before posting any comment, read `ai/skills/minions/reviewers.md`". The inline prescriptions that used to live in each agent (prefix with `**<role-name>**`, cap at N words, no em dashes) are deleted from the agent defs.

**Why:** 10 reviewer agents were each carrying the same prescriptions, and when a rule shifted (add brevity caps, rename label, change prefix convention), 10 files needed edits. Landing the shape in one skill means one edit propagates to every reviewer. Rule proposed by Josh 2026-04-23 after a brevity sweep was about to touch 10 agent defs with near-identical paragraphs.

**How to apply:** when a new rule shapes how reviewers write comments, edit `ai/skills/minions/reviewers.md`, not the individual agent defs. When adding a new reviewer agent, point it at the skill. If a reviewer agent has a genuinely role-specific output convention (the structured `{verdict, summary, items}` shape used by save-format-warden and supply-chain-scout), that stays in the agent; the skill covers the cross-cutting part.
