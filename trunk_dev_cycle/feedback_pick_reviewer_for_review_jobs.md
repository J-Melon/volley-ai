---
name: feedback_pick_reviewer_for_review_jobs
description: "for a review job dispatch a read-only reviewer, never an Edit/Write author; agents live in .claude/agents/{authors,reviewers,analysts}/ by role; a tool-permission refusal on a dispatch is a stop sign, switch agent type, do not add worktree isolation to force the wrong agent through"
metadata: 
  parent: feedback_what_to_delegate
  node_type: memory
  type: feedback
  originSessionId: 7390513b-744d-4dd5-a1b9-ae6a7ccce387
---

When the job is to review (judge a diff, check accuracy, audit style), dispatch a read-only agent from `.claude/agents/reviewers/`, never an author from `.claude/agents/authors/`. The roster is foldered by role (`authors/` write, `reviewers/` judge a diff read-only, `analysts/` investigate / plan / verify); the split exists so role is legible at selection time. Reviewers carry no `Edit`/`Write` by contract and by tool grant.

**Why:** 2026-05-30, during the #794 battle I sent an accuracy *review* to `docs-tender`, an editor. The dispatch refused it for having write tools on a review job; instead of switching to a read-only reviewer I bolted `isolation: worktree` onto the editor to force it through. That treated the guardrail as an obstacle. Josh: "you tried an edit agent for a review job," then "it's structural, are they not in subfolders?" They were flat; the fix was PR #796 (author/reviewer/analyst folders + strip `Edit` from the four reviewers that still carried it).

**How to apply:**
- Review job: pick from `reviewers/`. Author job (write code/docs/tests/tickets): `authors/`. Investigate/plan/verify without judging a diff: `analysts/`.
- A dispatch refused for "edits files / must isolate / wrong agent type" is a STOP sign. Switch to the right agent type. Never add `isolation: worktree` to push an editor into a review slot.
- Claude Code scans `.claude/agents/` recursively and addresses agents by `name` frontmatter, so the folders do not change dispatch; `subagent_type` is still the bare name. Keep `name` unique across the whole tree (a duplicate silently wins). Relates to [[feedback_reviewer_no_checkout_in_main_worktree]] and [[feedback_my_branches_go_in_a_worktree]].
