---
name: feedback-converge-needs-all-reviewers
description: "Fire the bot synthesis verdict only after every dispatched reviewer has reported; a missing reviewer blocks convergence"
metadata: 
  node_type: memory
  parent: feedback_verdict
  type: feedback
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

The battle converge step must collect ALL dispatched reviewers' verdicts before resolving and firing the bot-review workflow. A reviewer that has not reported yet is a blocker on convergence, not something to approve around.

**Why:** on the #799 battle I dispatched three reviewers (Margo, Nefario, Edith) and fired the bot APPROVE at 15:58Z with only Margo and Nefario back. Edith reported afterward. It happened to be fine (she approved the same fixed head), but if she had found a blocking issue the APPROVE was already posted and Josh could have merged on an incomplete battle. I even noted "Edith never formally reported" and proceeded anyway, which is worse: I saw the gap and approved through it.

**How to apply:**
- Track the set of reviewers dispatched. Do not fire bot-review until every one has returned a verdict (the harness sends a task-notification per agent; wait for all of them).
- If a reviewer is genuinely stuck, surface that to Josh and decide explicitly; never silently treat a non-report as an approve.
- "Two of three are clean" is not a converged verdict.

Related: [[feedback_battle_review_process]], [[feedback_no_fallback_wakeup_for_tracked_work]].
