---
name: feedback_verify_reviewer_claims
description: "A reviewer's confident finding is coherence-not-accuracy pointed at someone else's claim: verify its PREMISE against live source before acting. FIRES WHEN a battler/reviewer reports a BLOCK or finding. A finding can be a true observation with a FALSE consequence, or rest on a wrong number. Read the claimed path / config before fixing."
metadata: 
  node_type: memory
  parent: feedback_self_judgment_is_coherence_not_accuracy
  type: feedback
  originSessionId: b9cc1365-db19-4e7b-89f0-c4a831518c24
---

A reviewer's finding lands with the same fluent confidence as my own assertion, and gets the same
gate: it is input to verify, not a fact to act on. Before building a fix in response to a BLOCK,
read the one source that confirms-or-kills its premise (the call path it claims, the config value it
cites, the scene node it says is missing).

Two failure shapes, both 2026-06-09 on #911. True observation, FALSE consequence: a BLOCK said
"GripAnchor absent from partner/martha scenes -> equipping mounts wrong"; the absence was real but
equipping is player-only (the CharacterDropTarget exists only on player_paddle), so the path never
runs. Rests on a WRONG NUMBER: three BLOCKs said "shop file below the 75% floor"; the per-file floor
is 50% and shop passes at 62.5%. I nearly fixed both phantoms before reading the source.

This is [[feedback_self_judgment_is_coherence_not_accuracy]] applied to a reviewer instead of to me;
same instrument, different source. It does not weaken [[feedback_approve_means_verified]] (still need
a real check to APPROVE) nor license dismissing reviewers ([[feedback_collaborate_with_confidence]]:
find the signal even in a wrong-surfaced finding). Verify the premise, then act on what is true.
