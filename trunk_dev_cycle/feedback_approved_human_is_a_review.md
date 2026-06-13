---
name: merge-gate-is-a-review
description: "When measuring or describing PR review coverage, the human merge is a review. Distinguish the merge gate (Josh's manual merge) from specialist fan-out (agent reviewers); never collapse a `reviews=0` read into 'zero reviews' or 'unreviewed'."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_battle_review_process
  originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---

A PR that Josh merged has been reviewed: he reads it and clicks Merge, and that act is the review. `gh pr view <N> --json reviews` returning `reviews=0` only tells you formal GitHub review records are empty; it does not tell you the PR went unreviewed.

**Why:** Reinforced 2026-05-11 after Josh corrected a debrief claim that "seven stacked PRs landed with zero reviews": the human merge is a review. A CI pattern-mining pass used `gh pr view --json reviews` as the review-coverage check and called `reviews=0` unreviewed. That collapses two distinct review surfaces into one.

**The two review surfaces in Volley:**
1. **Merge gate**: Josh's manual merge (Merge when ready). This is the mandatory human approval; without it the PR cannot land. There is no approval label and no auto-merge; the merge click is the gate. (The old `approved-human` label that used to carry this was retired; do not look for it.)
2. **Specialist fan-out**: agent reviewers posting inline findings, the organiser firing one bot synthesis review per round under `volley-reviewer[bot]`. The optional but high-value pre-merge pass that catches what the merge gate has no time for. The floor is one independent reviewer ([[feedback_review_needs_one_independent_reviewer]]).

**How to apply:**
- Say which surface you mean. "No specialist fan-out" is fine when accurate; "no review" is wrong if Josh merged it.
- A PR that Josh merged with no specialist pass is still a finding worth naming, but the framing is "merge-gate only, no specialist pass," not "unreviewed."
