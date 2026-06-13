---
name: feedback_my_direct_commits_skip_standing_rules
description: "my own in-thread direct actions (commits, dispatches) skip standing rules that dispatched agents reliably follow, because the discipline lives in agent briefs not my hands; the fix is mechanical gates, not more remembering"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

When I act directly in-thread (commit, dispatch an agent), I repeatedly skip standing rules that my *dispatched agents* follow reliably. The agents follow them because their briefs spell them out; my own hands lack that scaffolding, so I drop them under load, especially late in a long session.

Instances, 2026-05-29, one session:
- Dispatched agents in the FOREGROUND, missing the always-background flag, so Josh had to background them ([[feedback_agents_default_background]]).
- Committed `db6f9e64` / `f8a420b1` WITHOUT `-s`, failing DCO on #784 and #785 ([[feedback_always_signoff_commits]]).
- Edited infra freehand in the main worktree on a feature branch, twice ([[feedback_my_branches_go_in_a_worktree]]).

The pattern: the rule is known and correct; my direct action skips it anyway. More memory does not fix it, the rule was already in memory each time. The durable fix is a MECHANICAL GATE that catches the miss at the action, the recall-fails-so-wire-it insight behind this session's hooks: require-background-agent.sh (blocks an Agent call missing run_in_background), the check_commit_msg.sh signoff check (blocks a commit missing Signed-off-by, PR #786), the em-dash and state-check hooks.

**How to apply:** when I catch myself, or Josh catches me, skipping a standing rule on a direct action, do not just re-read the rule; ask whether a gate can enforce it at the action, and prefer building or using that gate. Until a gate exists, slow down on direct commits and dispatches and run the rule's checklist by hand: `-s` on every commit, `run_in_background: true` on every Agent call, `git branch --show-current` before an infra edit.
