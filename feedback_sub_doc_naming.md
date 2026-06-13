---
name: feedback_sub_doc_naming
description: "single authority for naming sub docs in designs/01-prototype/{design,tech,narrative}/: a YYYY-MM-DD date prefix is the ONLY scheme; folder-internal NN- numbering is retired; numbered TOP-LEVEL cluster docs keep their NN-. FIRES WHEN naming any spike/ownership/topic sub doc"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

Sub docs in the discipline subfolders (`designs/01-prototype/{design,tech,narrative}/`) are named **`YYYY-MM-DD-<topic-slug>.md`**, date leading so the folder sorts chronologically. Example: `2026-06-03-surface-physics-ownership-spike.md`. The date is the creation/decision date, not last-edited; do not re-date on edit.

**This is the only sub-doc scheme.** The old folder-internal `NN-` numbering (`tech/01-court-control.md`, `tech/02-ball-lifecycle.md`) is retired. Date is the single ordering key.

**Top-level cluster docs are different:** the numbered top-level prototype docs (`01-prototype/08-venue.md` etc.) keep their `NN-` cluster scheme. Dating applies to the discipline-subfolder sub docs only. Whether cluster numbering itself ever retires was parked for the docs-restructure work.

**Why:** Josh, 2026-06-03: "actually lets start dating the sub docs instead", then "date is the only sub-doc scheme". Chronological "when was this thought" was invisible under topic-slug-only and folder-internal numbers, and the folder mixed two schemes (numbered `01-court-control` plus unnumbered `ball-state-ownership-spike`).

**How to apply:**
- New sub doc -> `YYYY-MM-DD-<topic-slug>.md`, today's date.
- Existing differently-named sub docs (folder-numbered or undated topic) are NOT renamed in a sweep. Rename one to dated form only when a PR's scope already touches it (clean-as-we-go). A rename updates the file plus every reference: `grep -rln OLD_NAME designs/ scripts/`.
- INDEX row keeps the design-cluster label and links to the dated sub-doc filename. Cluster label and the sub-doc's own name stay independent.

Consolidates and supersedes the former `feedback_tech_folder_own_numbering` and `feedback_date_prefix_sub_docs`. Ties to [[project_doc_structure_authority]] and [[feedback_cross_links_in_index_not_body]].
