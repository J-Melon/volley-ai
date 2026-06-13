---
name: Minions reason about meaning, not pattern-match substitutions
parent: feedback_on_return
description: Word-replacement briefs require minions to read each occurrence in context and pick a replacement that carries the same specific meaning; mechanical s/old/new/g defeats the point of having a minion at all
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When a "sweep X to Y" or "replace word X" brief lands, the minion's job is to READ each occurrence in context and reason about what X specifically meant there, then pick a replacement that carries the same meaning. Not substitute X with Y everywhere it appears.

**Why:** Josh said directly 2026-04-26: "cozy does not just mean warm, doing a search and replace is something i could do the point of minions is so they can make meaningful decisions based on knowlege, research and prior knowlege". Krabappel's cozy sweep had ended up mostly mechanical (cozy → warm everywhere), losing the specific meaning each occurrence carried (genre framing, player-experience descriptor, market-category label, mood adjective). Each one wanted a different replacement.

**How to apply:**
- Brief minions on word-replacement work with: "for each occurrence, read the surrounding sentence and decide what the word specifically meant there. Pick a replacement that carries that meaning. Don't substitute mechanically."
- Provide a starter palette of likely replacements but make clear it's not exhaustive: "candidates include warm / generous / inviting / earnest / personal / comfortable; pick what fits THIS sentence."
- Allow rewriting the surrounding sentence if the right answer is "the descriptor isn't needed; the picture does the work."
- Acceptance criterion in the brief: every replacement is justified by the sentence around it. The minion's report should show before/after PER occurrence with a one-line reason for the choice.
- This pairs with "less words with more meaning"; sometimes the right move is to drop the word entirely and let the picture stand.
- The same rule applies to ANY taste-based sweep: tone words, register words, qualifier words, anywhere the choice depends on what the sentence is doing rather than which dictionary entry the word appears in.
- If a minion's report shows mostly the same replacement word everywhere, that's the signal it went mechanical. Reject + re-dispatch with stronger context-reasoning brief.

**The specific failure pattern:** the minion grepped for the word, replaced each hit with the first-listed candidate, moved on. Symptoms in the report: "cozy → warm" appearing 14 times in a row across different sentences with no per-occurrence reasoning.
