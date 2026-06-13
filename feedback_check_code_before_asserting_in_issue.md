---
name: feedback_check_code_before_asserting_in_issue
description: "FIRES WHEN an issue body (or any claim) asserts how the production code currently works. Read the code first (grep / file_context), do not draft the premise from memory of the system. A wrong code-fact in an issue mis-scopes the work and survives until someone checks."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Before stating in an issue (or anywhere) what the code currently does, READ it. A grep or
`file_context` is cheap; an invented code-fact in an issue body mis-scopes the whole ticket and
is believed until someone checks against the source.

SH-469 (2026-06-03): I wrote the user story around "a designer can't tune the increment, only
change it blind", asserting the value was buried in `GameRules`. One grep showed
`ball_speed_increment` is already an `@export` on `BaseStatsConfig`: the tunable knob exists; only
the live readout (the gauge) is missing. The real gap was narrower and different from what I filed.
Josh: "they can't even tune that now right?", which forced the check I should have run before
writing the premise.

How to apply: any clause of an issue that describes current behaviour ("X folds into Y with no
seam", "this is hardcoded", "there is no way to") is a code-fact, verify it with a read before it
goes in the body. This is the issue-writing instance of
[[feedback_self_judgment_is_coherence_not_accuracy]] (route the claim to ground truth, not to my
mental model) and pairs with [[feedback_write_memories_after_the_work]] (check, then write).
