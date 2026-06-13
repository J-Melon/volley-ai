---
name: feedback_brief_names_judgment_not_mechanics
metadata:
  node_type: memory
  type: feedback
  parent: feedback_what_to_delegate
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

**A minion brief names the artifact and the task-specific judgment, and trusts the minion's skill for every mechanic.** The brief carries only what the dispatcher knows and the skill cannot: the PR number and HEAD, the files, the questions to interrogate, the chosen path on a fork. Output format, posting mechanism, severity vocab, comment caps, commit shape, label discipline, the comment rules, all live in the skills the minion reads at start. The mechanical bans (no em dashes, body caps, the Bash and memory guards) are enforced by PreToolUse hooks, which fire on a subagent's tool calls the same as on mine (confirmed 2026-06-12). So both layers, skill and hook, hold without the brief; it stays silent on them and names only the judgment.

This is independent of length: a short brief that still commands mechanics breaks the rule just as a long one does. The danger is not token cost (that is [[feedback_agent_prompt_economy]]); it is that **restating a mechanic in the brief OVERRIDES the skill that owns it**, and my hand-rolled restatement drifts from the canonical version, so the minion follows my drifted copy instead of the skill.

Two incidents, same shape: 2026-05-24 on #724, my reviewer briefs said `gh pr comment 724`, contradicting the reviewers skill's inline-only rule; all four reviewers posted on the conversation tab. 2026-06-12 on #943, my brief restated the `issue:`/300-char/comments-array contract, and the reviewer posted `**BLOCK -**` paragraphs over the cap. Both times the skill was right and my brief crowded it out. Josh: "let them do their jobs"; "briefs should not be commands or detailed, that's what the minion skills are for."
