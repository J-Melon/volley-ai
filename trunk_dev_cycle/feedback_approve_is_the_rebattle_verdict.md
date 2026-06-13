---
name: feedback_approve_is_the_rebattle_verdict
description: "A synthesis APPROVE is the verdict the re-battle returned: reviewers re-checked the fix and reported clean. After a block, push the fix, re-dispatch the blocked reviewers on the incremental, and post APPROVE only when their re-battle comes back clean. FIRES WHEN about to synthesise a verdict after fixing blocking findings."
metadata:
  node_type: memory
  parent: feedback_verdict
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

The bot synthesis verdict carries what the battle concluded. After reviewers block: push the fix,
re-dispatch the blocked reviewers on the incremental (`git diff <reviewed-sha>..<fix-sha>`, their
scope only), and post APPROVE once their re-battle returns clean (each replies inline with the fix
SHA and reports approve). The organiser synthesises the re-battle's verdicts.

The ditch: posting APPROVE myself because I fixed the blocks. My edits are my internal coherence
([[feedback_self_judgment_is_coherence_not_accuracy]]); the reviewer re-checking is the external
signal that the fix holds, and that signal is the approve. Same discipline as
[[feedback_converge_needs_all_reviewers]]. Josh, 2026-06-01 (#803): "approve comes from the result
of a battle, not edits."
