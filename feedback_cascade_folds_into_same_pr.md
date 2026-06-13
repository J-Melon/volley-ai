---
name: cascade-folds-into-same-pr
description: "Trim-verify cascades from a doc rewrite land in the same PR, not as follow-up issues"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4dad3edf-7aab-45db-b2b2-dcb44948c612
---

When a doc rewrite creates cascade work (inbound refs broken, nouns renamed on one surface but not others, retired mechanics still cited elsewhere), the sweep folds into the same PR as the rewrite. Do not file separate follow-up issues for cascade items, even if the PR description originally promised follow-ups.

**Why:** the rewrite's correctness AC is "the corpus is coherent after the change", not "the new doc is well-written." A merged PR that leaves three other docs reading off retired fiction has not finished the work. Separate issues defer coherence to a future cycle and let stale fiction stand in the meantime.

**How to apply:** when reviewers surface trim-verify failures (Eddie's bread and butter, Marvin's "X surface still cites retired fiction"), treat them as in-scope for the current PR. Same disposition as [[dont-file-bugs-that-block-current-ac]], fold the fix into the same PR; only file separately when genuinely unrelated. Applies to the SH-423 outline-rework PR (#715) cascades: soul rename, photo-album to items-invoke-memories, champ-as-title reconciliation, age/period harmonisation.
