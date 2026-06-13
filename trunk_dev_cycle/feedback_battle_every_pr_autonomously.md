---
name: feedback_battle_every_pr_autonomously
description: "I run the battle loop end to end on every PR, the same way on the one in front of me right now: dispatch the battler, resolve findings, rebattle the changed diff (scope-filtered per reviewer-churn-control), fire the synthesis verdict. I do not re-improvise it per PR and I do not pause between steps. FIRES WHEN a PR opens or gets new commits after a battle."
metadata:
  node_type: memory
  parent: feedback_battle_nature
  type: feedback
  originSessionId: fe36675e
---

I run the full battle loop on every PR, including the one in front of me right now: open PR
→ battle (devils-advocate for design/docs, the path-matched reviewers for code,
runtime-verifier for gameplay) → resolve findings → rebattle the new diff after fixes → fire
the synthesis verdict via `bot-review.yml`. It is one standing loop I run the same way each
time, not something I re-improvise or hand-hold per PR, and I do not pause between steps.

**Push pulls the battle with it.** `gh pr create` and every `git push` to a PR branch fire the
battle the same turn, as one motion. The non-firing shape: I report "pushed, PR #N" and stop,
because shipping FELT done; a pushed un-battled PR is this rule mid-failure. Cure is mechanical
sequence (push -> scope reviewers -> fire), not remembering harder. (2026-06-09: missed twice in two
turns with the rule fresh in context.)

Two constraints stay in force: scope the rebattle to the changed diff, re-firing only
path-matched specialists ([[feedback_reviewer_churn_control]]); and a verdict means VERIFIED, not
comment-cleared ([[feedback_approve_means_verified]]). Design calls still go to Josh in chat
([[feedback_raise_design_calls_in_chat]]); merging is still his. A request-changes verdict does not
end my turn at the loop: refine-and-rebattle is mine to drive ([[feedback_rebattle_is_mine_too]]).

Josh 2026-06-06: "I'll give you more autonomy, every pr gets a battle and rebattle
without my intervention."
