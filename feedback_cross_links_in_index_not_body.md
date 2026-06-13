---
name: Cross-references live in INDEX docs, not inline in body prose
description: discipline-folder INDEX.md is the cross-reference surface for Volley; don't proliferate inline links between sibling design/spec docs in body prose
type: feedback
originSessionId: current
---

**The rule.** Docs are additive: each one adds what the others don't, so repetition defeats the point. `designs/INDEX.md` and per-folder INDEX docs are where structural cross-references live. A new design/spec doc does not need to inline-link every related sibling, and a specific-scope doc references the general one (a starter-set doc pointing at the general items doc) through the index, never by restating or inline-linking it in the body. When two sibling docs both live under the same folder (e.g. both under `designs/01-prototype/design/`), the reader finds the relationship via the folder INDEX, not via prose cross-links inside each doc. ("concept" means art, not design docs; see [[project_concepts_folder_is_art_at_root]].)

**How to apply.** Adding any design/spec, narrative, or character doc: write the body to stand on its own fiction. Don't add inline links to sibling or related docs. This includes cross-discipline links (a character doc linking to the bible, a spec doc linking to a narrative doc). The reader finds the relationship through the relevant INDEX, not by an in-prose link. The body is settled; the index is the map.

The only inline links that survive: links the body cannot speak around because they reference a specific section or paragraph of another doc as load-bearing evidence inside an argument (a rare structural beat citing the bible's § 9 staging by name, for example). Even those are sparing.

**One instance of a single-source principle: the relation lives in the structural surface, not duplicated in prose.** Here that surface is the index; for Linear issues it is the native relation field ([[feedback_use_linear_native_relations]]); the shared parent is [[feedback_rule_reconciliation]] (don't restate what another surface holds, two copies drift). Same shape across all of them.

**Origin.** Volley outline rework SH-423: I proposed adding a cross-link to `the-game.md` from `concept/milestones.md` for duel rules. Josh: "no indexes ref links for this reason". Then in the next turn I drafted a champ.md rewrite with the existing cross-discipline link to `bible.md`, leaning on a "different discipline" exception. Josh: "remember index holds links". The exception was generous; the rule is the index carries links, body stands alone. Reinforced 2026-05-25 on `starter-items.md`: I inline-linked `items.md` from the body; Josh: "docs are generally additive, repetition defeats that" and "index points". The link moved to the prototype index under Items.
