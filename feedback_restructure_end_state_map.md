---
name: Draft the end-state map before the first restructure challenge
description: For multi-folder restructure missions, sketch where every piece will live before the first challenge ships; otherwise the same paragraph gets moved twice
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
For restructure missions touching more than one discipline folder, draft the end-state map of where every piece of design material will live BEFORE shipping the first challenge. The draft is throwaway; what it prevents is review churn.

**Why:** Mission Page One (2026-04-26 evening session). The bible got touched by six challenges (#464 consolidate, #468 sense-pass, #470 cracks fix, #473 trim §5-10, #474 cast split, #476 register stragglers). `designs/INDEX.md` got touched by six challenges over the same span. The cast moved through three structural homes (bible §4 → concept/01 cast section → characters/protagonist + still in bible §4 → split across five characters/* files). Each challenge triggered conflicts in queued ones, ate reviewer attention re-orienting on the same files, and left stragglers (the `register`-as-tone vocabulary needed six sweep rounds).

The cost would have been smaller with a single planning pass that named the end-state up front: bible holds visual + cast visual anchors; characters/* holds interior + arc; concept/* holds structural; outline holds story; phase folders stay working drafts. Then a sequence of one-move-each challenges against that target.

**How to apply:**
- When the mission brief is "restructure" / "consolidate" / "split" / "rename across the corpus"; pause before the first challenge.
- Sketch a plain-text map: which file holds what, what gets killed, what gets renamed, what gets split, what cross-refs exist between the survivors.
- Show the map to Josh. Iterate until the end-state is named.
- Then dispatch challenges against that map. Each challenge moves one piece. No file gets revisited.
- The map itself doesn't need to ship; it can stay in chat. Its job is to prevent the same paragraph being moved twice.
- This pairs with the **trim-and-verify** discipline (when you remove material from one file, verify it lives in the destination before pushing). End-state map handles the structural plan; trim-and-verify handles the per-challenge safety.
- Doesn't apply to small one-challenge cleanups. Applies when scope is a folder, a discipline, or a vocabulary sweep across many files.
