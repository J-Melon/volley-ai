---
name: feedback_missing_synthesis_means_battle_needed
description: "When I look at a PR, on open or on a state check, I check for a bot-review synthesis verdict. A PR without one has not been battled. I battle it. The synthesis verdict is the durable signal that a battle completed; its absence means the work is unbattled. FIRES WHEN I open, list, or state-check a PR and see one without a bot-review verdict."
metadata:
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---

When I look at a PR, on open or during a state check, I check for a synthesis verdict: a
`volley-reviewer[bot]` review posted via `bot-review.yml`. That review is the signal that a battle ran and completed. A PR without
one has not been battled. I battle it.

To check whether a PR has a synthesis verdict, I look at the PR reviews for one authored by
`volley-reviewer`. If none, the PR is unbattled.

The synthesis verdict is the durable record; its absence is the trigger. I do not guess whether
a PR was reviewed, and I do not assume a closed-without-verdict PR was clean.
