---
name: stub-when-fiction-not-set
description: "In fiction-bearing docs, stub the section if fiction is not set; do not invent forward"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4dad3edf-7aab-45db-b2b2-dcb44948c612
---

When drafting or sweeping a doc that *is* fiction (the narrative outline, the bibles, character profiles, concept docs in `designs/concept/`), if the underlying fiction for a section is not yet decided, the section gets a one-line stub naming what is open. Do not write speculative prose that reads as committed fiction.

**Why:** the outline rework (PR #715) shipped Act III + Ending committing to items-invoke-memories and a final-memory-gives-the-key beat that Josh had not decided. Reviewers then chased the speculation across `art/bible.md` §8/§14, audio bible, glossary, treating it as settled to align to. Speculative prose in a fiction-bearing doc costs the next sweep more than the missing section would have.

**How to apply:** in fiction-bearing docs (narrative/**, concept/**, characters/**, art/bible.md, audio/bible.md), when a section's underlying fiction is undecided, write one sentence naming the question and stop. Form: "Reconstruction mechanic is TBD; what invokes a memory is open." Not: a paragraph guessing the mechanic. Related: [[narrative-only-established-fiction]] (reference direction), [[describe-before-naming]] (build the picture before the proper noun). This rule covers the forward direction, when you are the one writing fiction and don't have it yet.
