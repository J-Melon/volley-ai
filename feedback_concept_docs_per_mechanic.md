---
name: feedback_concept_docs_per_mechanic
description: "SUPERSEDED: wrongly codified designs/concept/ as a per-mechanic design-spec folder. In Volley concept means ART (label concept, parent art); design docs are SPEC (label spec, parent design). See project_concepts_folder_is_art_at_root"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

**This rule was wrong and is retired.** It claimed `designs/concept/` is a discipline folder for per-mechanic design specs. It is not. The project vocabulary (verified from the Linear label taxonomy) is:
- **spec** (parent **design**): the design-doc kind, "work through an open design question toward a realised idea".
- **concept** (parent **art**): visual exploration, lives at `/concepts/` at the repo root, images not prose.

So design docs are **spec**, and "concept" means art. See [[project_concepts_folder_is_art_at_root]] and [[project_doc_structure_authority]].

The SH-423 exchange ("concepts should be per mechanic or set of mechanics") was about scoping a mechanic-doc set (one doc per mechanic-set, not per content-unit), not an endorsement of a "concept" path as their home. That scoping idea survives; the folder name does not. Mature design docs bubble to a flat entity version per [[project_docs_structure_prototype_to_entity]].

**Do not route design docs to any concept/ path.** Tombstone kept so the old rule is not re-derived from a stale index entry.
