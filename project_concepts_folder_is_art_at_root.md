---
name: ""
metadata: 
  node_type: memory
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

`/concepts/` at the repo root is the concept-ART folder: visual exploration images (characters, garden/venues, balls, gear, movement, soul, the volley board), PNGs plus PSD sources under `concepts/raw/`, with a `.gdignore` so Godot skips importing them. Josh: "concept is not for docs, that is images and such" then "no, root/concepts/".

So in Volley, **"concept" means concept art, not design specs.** Do not treat any `concept/` path as a home for prose design docs.

**Authority: the Linear label taxonomy.** Labels nest under discipline parents and define the vocabulary: `spec` (parent **design**) = "work through an open design question toward a realised idea" is the DESIGN-DOC kind; `concept` (parent **art**) = "explore a visual direction" is art; `asset` (parent art) = finalised visual. Also `narrative` (writing), `spike`/`feature`/`bug` (tech). So design docs are **spec**, not concept. The misnamed `designs/concept/` prose folder should be **spec** (or narrative / flat-entity), never "concept".

`designs/concept/` is a DIFFERENT, misnamed folder that currently holds design/narrative prose (two-styles architecture, Construction/Reality/Reconstruction, the break, the gate, milestones, achievements, venue). That prose is mis-filed and the folder name collides with the art meaning; where that content actually belongs is a separate question for Josh (likely narrative/ or flat-entity bubbles per [[project_docs_structure_prototype_to_entity]]), not concept.

**Corrects:** [[feedback_concept_docs_per_mechanic]] which codified `designs/concept/` as a per-mechanic design-spec discipline folder. That is wrong; concept is art. That memory should be retired/rewritten and the live designs/INDEX.md "Concept | Per-mechanic design specs" row is wrong too.

**How to apply:** never route a design doc to a concept/ path. Concept = the root /concepts/ art folder. When the doc-structure README is written, it states this explicitly so the name stops being ambiguous. Ties to [[project_doc_structure_authority]].
