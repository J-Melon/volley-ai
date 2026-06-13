---
name: gates-must-be-proportionate
description: "Match enforcement weight to drift cost and frequency; don't add NEW server-side gates/workflows (editing existing is fine); prefer memory+review or a light local hook"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 07114971-0755-4628-bfe9-5c815fd107cc
---

Don't build heavy mechanical gates for low-frequency, low-severity, or cosmetic convention slips. Memory plus review is the right weight for those. Reserve hard gates for drift that repeats AND carries high cost AND is cheap and precise to encode (the test in `designs/private/dispatcher-systemised-local.md`).

Josh's rule on server-side gates: **don't add new ones; editing existing workflows is fine.** Standing up a new CI workflow / merge-queue check is too heavy, even when a reviewer argues a local-only hook is "false confidence" because it misses agents or external contributors; Josh accepts that coverage gap to avoid the weight. But reworking an existing workflow (including retiring machinery inside it, like the SH-229 native-review rewire of `approval-gate.yml` / `reviewer-re-run.yml`) is allowed and is not "too heavy". Order of preference for enforcing a convention: memory + review first; a light local hook only if it clearly earns its keep; never a brand-new server-side gate.

**Why:** 2026-05-28, after a Linear ID leaked into a branch and commits, Josh said "we need more than a memory sharpen," so a commit-msg + pre-push gate was built (SH-451 / PR #772). Seeing the devils-advocate's proportion critique, Josh called it "no gate too heavy" and had it dropped. The convention (GitHub `#N` over Linear `SH-N` in surfaces) is low-frequency and cosmetic; it stays a memory+review rule, see [[feedback_design_docs_subject_first_github_ids]].

**How to apply:** When a convention gets violated, fix the instances and trust the existing memory rule; do not reflexively propose enforcement infrastructure. If asked to enforce, weigh cost times frequency first, prefer the lightest mechanism, and name the proportion tradeoff rather than building the maximal gate.
