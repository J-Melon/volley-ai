---
name: feedback_minion_exits_at_report
metadata:
  node_type: memory
  type: feedback
  parent: feedback_on_return
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

**A minion's work ends at its report; it does not keep acting on the live challenge, and convergence is the dispatcher's.** When a minion finishes, it commits, pushes, and reports, then stops. It does not watch the PR for review findings, reply on threads, or push a fix in response to a reviewer. Reading findings, deciding what folds in, replying, and re-dispatching is the convergence loop, and that is mine ([[feedback_converge_needs_all_reviewers]], [[feedback_reply_then_rebattle]]). A minion that self-adjudicates a finding can wave off a real blocker as resolved.

So the verdict never rests on the minion's say-so that a finding is closed; I verify each against the live HEAD myself. 2026-06-12, #939: the infra-implementer kept running after its report, replied to two reviewer `issue:` findings claiming both resolved, and pushed a commit mid-battle. Checking the live HEAD myself showed the opposite: the promote step was deleted from every workflow and the raw download key was still in CONTRIBUTING, while the correct fix sat uncommitted in the worktree. The minion's "resolved" was false on both. Always check the worktree and the pushed HEAD on return ([[feedback_check_worktree_on_terse_report]]), even when the report is confident, not only when it is terse: a full "done" can still hide uncommitted work and a pushed state worse than the worktree.
