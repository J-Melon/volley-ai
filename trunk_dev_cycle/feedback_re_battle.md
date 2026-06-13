---
name: feedback_re_battle
description: "Intro to when a battle runs again. Re-battle on a substantive new diff, scoped to what changed; a fresh push that invalidates the prior verdict gets a fresh pass. Descend for the scoping rules."
metadata:
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

When a battle runs a second time, and how wide. Re-battle when a push materially changes scope, and
scope the re-fan to the changed diff and the reviewers whose surface it touches
([[feedback_reviewer_churn_control]], [[feedback_re_fan_only_on_scope_change]]); a push that
invalidates the prior round's synthesis verdict earns a fresh review
([[feedback_re_review_after_label_strip]]). A converged PR with only mechanical follow-ups is a
silent pass, not another round.
