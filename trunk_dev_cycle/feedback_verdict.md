---
name: feedback_verdict
description: "Intro to how a battle's verdict is reached. The verdict comes from the battle itself (reviewer consensus on the current diff), waits for every reviewer, and an approve means the change was verified. Descend for the specific rules."
metadata:
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

How a battle resolves into a verdict. The verdict waits for every dispatched reviewer to report
([[feedback_converge_needs_all_reviewers]]); an APPROVE is the battle's own outcome, earned by a
re-battle of the changed diff, not granted because findings were edited
([[feedback_approve_is_the_rebattle_verdict]]); an approve means the change was verified
against its AC, replying to comments alone does not earn it ([[feedback_approve_means_verified]]);
and a reviewer who approves while flagging a global-state or production-vs-test concern is reporting
a block-worthy caveat, which the organiser weighs ([[feedback_reviewer_caveat_in_approve]]).

The organiser computes the verdict from the SEVERITY of the findings, never from the reviewer's
headline phrase. The headline cuts both ways and is not the reviewer's to set: an approve can hide a
block-worthy caveat ([[feedback_reviewer_caveat_in_approve]]), and a softening summary ("ship with
named changes") over one or more `issue:` findings is still a block, because any `issue:` blocks
([[feedback_reviewer_output_form]]). Read the findings, not the summary tone. Josh, 2026-06-12: I
echoed a reviewer's "ship with named changes" as the standing when his four `issue:` findings defined
a block.
