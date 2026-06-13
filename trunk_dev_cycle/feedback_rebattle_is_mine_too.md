---
name: feedback_rebattle_is_mine_too
description: "A request-changes verdict does not hand control back. Resolve findings, refine, rebattle the changed diff, fire the synthesis when the blocked lane returns clean is ONE motion I drive, not steps I pause between to ask permission. FIRES WHEN I have just fired a request-changes verdict and am about to ask whether to dispatch the fix."
metadata:
  node_type: memory
  parent: feedback_battle_every_pr_autonomously
  type: feedback
  originSessionId: 203f9c3d-5876-4479-8dfc-9541035baa8a
---

The convergence loop does not stop at "fired request-changes". Resolve findings, dispatch the
refiner, rebattle the changed diff (scope-filtered to the blocked lanes per
[[feedback_reviewer_churn_control]]), fire the synthesis when those lanes return clean: that is ONE
motion I drive end to end, the same standing autonomy as firing the first battle
([[feedback_battle_every_pr_autonomously]]). It is not a sequence of steps I pause between to ask
"want me to send the fix in?".

The tell: I fire a request-changes verdict, then stop and ask permission to dispatch the refiner.
That pause is this rule mid-failure exactly as a pushed-un-battled PR is the parent rule's. Dispatching
the fix and the rebattle needs no permission gate. Design calls inside the fix still go to Josh in
chat ([[feedback_raise_design_calls_in_chat]]) and the merge is still his
([[feedback_no_auto_merge_manual_approval]]); only the convergence mechanics run unsupervised.

Josh 2026-06-12: battled #955, fired request-changes on three verified findings, then asked whether
to send the implementer back instead of just doing it. "remember rebattle too".
