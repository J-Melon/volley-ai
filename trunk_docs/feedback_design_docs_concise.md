---
name: Design docs are concise; state decisions, not deliberation
parent: trunk_docs
description: Every design doc is terse. State the decision and the shape, not the reasoning that produced it. The deliberation belongs in the conversation or a scratchpad, not the committed doc.
type: feedback
originSessionId: current
---
Design docs are concise. State the decision and the shape; cut the deliberation that produced it. A reader wants what the design IS, not the argument that got there. Lean toward an outline: no intro paragraph, just the decided shape as bullets and a table. Match or beat the register of `designs/01-prototype/design/items.md`: terse bullets, tables over prose, no explanatory padding, no framing.

**Why:** 2026-05-25, the starter-items design doc. I briefed a writer with the full reasoning (every group's why, every exclusion's justification) and got a 92-line doc; Josh: "the doc so far is way too wordy, all designs should be concise." Trimmed to 33 lines; still "too big, just outline what we have, no intro or anything", landed at 15 (a one-line source, the five-slot table, cut/out/TODO bullets). The target is an outline, not a tidy essay.

**How to apply:** when writing or briefing a design doc, give the decisions and the shape, not the path to them. Reasons land as a short clause at most ("Ceiling cut: felt only at the top"), never a paragraph. The deliberation lives in the chat or a gitignored scratchpad. This is a contributor-facing standard and should also live in the design style guide; propose the addition when next touching it. Pairs with [[feedback_state_positive_shape]].
