---
name: no-auto-merge-manual-merge-is-approval
description: Do not enable auto-merge. The maintainer reviews and clicks Merge when ready; that manual merge is the approval. Never run gh pr merge --auto.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 07114971-0755-4628-bfe9-5c815fd107cc
---

Do not enable auto-merge on any PR. The maintainer (Josh) reviews and triggers the merge manually (Merge when ready); that act is the approval. Never run `gh pr merge --auto`. CI (`Tests`, `Lint`) and the merge queue still gate; the bot synthesis review is attribution, not a gate.

**Why:** 2026-05-28 (SH-452). The `approved-human` label gate had a hole: a skipped `Human Approved` required check read as passed, so a PR showed "Merge when ready" with no sign-off (the merge queue still blocked the real merge, but the PR signal lied). Josh chose the simpler model, drop the label gate and auto-merge; his manual merge is the approval. This reverses the earlier "enable auto-merge on PR open" rule.

**How to apply:** after `gh pr create`, do NOT enable auto-merge and do not apply approval labels. Leave the PR for the maintainer to merge. Reviewers still run and the organiser posts the bot synthesis review for attribution. The synthesis review body bolds the important parts: a bold **Synthesis: <verdict>.** line, then one line per reviewer with the **reviewer role** bolded, a blank line between each part. The gate retirement (labels, `approval-gate.yml`, `reviewer-re-run.yml`, the `Human Approved` required check) is tracked in SH-452. See [[reference_volley_ci_shape]].
