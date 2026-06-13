---
name: discipline-folders-are-design-home
description: "designs/art, designs/narrative, designs/tech-art, designs/process, designs/research are the future home for settled design; designs/01-prototype, 02-alpha, etc. are working drafts that move there once playtest settles them"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4dad3edf-7aab-45db-b2b2-dcb44948c612
---

The directory layout under `designs/` is split by purpose:

- **Discipline folders are the future home for settled design.** `designs/art/`, `designs/narrative/`, `designs/tech-art/`, `designs/process/`, `designs/research/`, `designs/characters/`, etc.; these are where mature docs will live once playtest settles them. They organise by craft discipline. (`concept` is NOT a design-doc folder: "concept" means concept ART at the repo-root `/concepts/`; see [[project_concepts_folder_is_art_at_root]]. Newer rule: mature design docs bubble to a flat ENTITY version per [[project_docs_structure_prototype_to_entity]], not into a discipline bucket; this 2026-04-26 memory predates that.)
- **Phase folders are working drafts.** `designs/01-prototype/`, `designs/02-alpha/`, `designs/03-beta/`, `designs/04-content/`; these are working surfaces tied to a development phase. Content lives here while it's still being worked on; once it matures and stays put, it moves to a discipline folder.

**Why:** Josh established 2026-04-26: discipline folders are the main stays for where things go; stuff in prototype is really workings until it is settled later. The two layouts are different jobs: discipline folders ARE the wiki, phase folders are the per-development-phase scratch space.

**How to apply:**
- When a doc graduates from "we're figuring this out" to "this has settled through playtest," move it from the phase folder to the matching discipline folder. Update cross-refs.
- The artist-world-bible.md that was built in this session lives at `designs/01-prototype/artist-world-bible.md`. Per this rule, once that material is stable enough, it moves to `designs/art/bible.md` (and possibly splits between `designs/art/` and `designs/narrative/` if the world+tone content separates from the visual-direction content).
- The OLDER `designs/art/bible.md` is the discipline-folder home; if its content is stale and the matured prototype version is ready, the matured one replaces the older content rather than the matured one staying in 01-prototype.
- Phase folders should NOT host docs that other docs point at as the settled source. If a discipline doc points at a 01-prototype doc as the source for X, that 01-prototype doc has matured and should move.
- The split between art and narrative for a single doc may want a clean break: world + tone go to `designs/art/bible.md`, story beats go to `designs/narrative/outline.md`. Don't restate; pointer.
- This pairs with the "consolidate so we don't restate things" rule: discipline folders are the future home, restating in phase folders is duplication.

**Before killing phase content, run the bubble-up check, then propose.** Phase docs hold a mix: content that duplicates discipline-folder material (safe to kill), content tied to an old roster (kill, no bubble), and content whose SHAPE is matured even if its FRAMING is old (bubble-up CANDIDATE; Josh decides). Name the candidate as a proposal; Josh says bubble or drop. Do NOT save the bubble unilaterally; the author owns the bubble-or-drop call. Sharpened 2026-05-24 on the 02-alpha kill (PR #715): I deleted seven files including `05-clue-ladder.md` without surfacing the bubble candidate; Josh: "remember the bubble up doc pattern?" I recovered the content and proposed a cleaned bubble-up; Josh: "drop that." Triggers before any `git rm` on a phase-folder doc.

**Nothing is settled yet.** Even game-design material in a discipline folder is a working draft until months of play test it. Discipline folders are the future home, not settled-by-virtue-of-location. Use "working spec", "draft", "notes", "design", or just the file name. The banned-word rule lives separately: see [[words-banned-in-memory]].
