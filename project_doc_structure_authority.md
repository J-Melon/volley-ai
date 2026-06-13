---
name: project_doc_structure_authority
description: "the SINGLE authority for how designs/ is organised is the doc-structure README; read it before answering any \"where does this doc go / how is designs organised\" question instead of reconstructing the rules from scattered memories"
metadata: 
  node_type: memory
  type: project
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

The authority for the designs/ doc structure is the doc-structure README (designs/README.md, or the structure section of designs/INDEX.md if not yet split out). Read it before answering any "where does this doc live", "how are the docs organised", or "index properly" question. Do NOT reconstruct the structure from fragments.

The structure in brief (README is the full, current source of truth):
- **Two folder kinds.** *Discipline* folders (art, narrative, tech-art, ai, process, research, characters, concept, audio, effect-system) hold settled work owned by that discipline. *Phase* folders (01-prototype, 03-alpha, 03-beta, 04-content) hold drafts/decisions tied to a life stage.
- **Lifecycle.** Work starts in the active phase folder, gets argued, then bubbles/promotes into the matching discipline folder when it earns settled status. A phase doc that reads as settled is a signal to promote.
- **Inside a phase folder:** `{design, tech, narrative}` subfolders (content split: design = feel/meaning, tech = mechanism/spec). See [[feedback_prototype_design_tech_subfolders]]. Sub docs there are named with a `YYYY-MM-DD` date prefix; see [[feedback_sub_doc_naming]].
- **AI-facing docs** live in `ai/`. See [[project_ai_facing_docs_live_in_ai_folder]].
- **Cross-links live in the folder's INDEX, not inline in body prose.** See [[feedback_cross_links_in_index_not_body]].
- **Each folder has an INDEX.md** that must stay in sync with the files on disk.

**Why:** Josh: "we need a readme on the overall doc structure, you should have a memory for this." The doc-structure rules were spread across ~12 memories with no single authority, so I rebuilt the structure piecemeal when asked. Per [[feedback_rule_reconciliation]], this memory is now the pointer and the README is the authority; the scattered structure memories defer to the README.

**How to apply:** structure question -> read the README first. When the structure changes, update the README (the authority) and let this pointer ride; do not re-document the rules across many memories.
