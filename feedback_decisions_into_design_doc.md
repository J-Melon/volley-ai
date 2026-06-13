---
name: Design decisions land in the design doc, and impl reads the doc first
description: When Josh makes a design call mid-mission, update the relevant design doc with the call before dispatching impl; brief the implementer to read the doc, not just the issue
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When Josh makes a design call (architecture choice, behaviour shape, edge-case rule) mid-mission or in a fix-sweep, the call lands in the relevant design doc as the settled record before any implementer is dispatched. The implementer brief tells the implementer to read the doc, not just the Linear issue and the chat thread.

**Why:** 2026-05-10, Banana Tank PR #600 fix sweep. Solanum's brief enumerated three design calls inline and let the implementer resolve them. The implementer made reasonable but unilateral choices that diverged from what Josh wanted (apex const placement, small-speed-snap deferral). The Linear issue and the chat are ephemeral; the design doc is the settled record. Calls captured only in chat get re-litigated each time someone touches the code, and implementers without the chat context can't audit themselves against intent.

**How to apply:**

- When Josh makes or confirms a design call, find the relevant `designs/**` doc (or create one) and write the decision into it before any implementer dispatch. The doc names the call, the why in one line, and the rejected alternatives if non-obvious.
- **SETTLED, not in-progress.** The doc records a call once it has landed, not after each turn of working it out with Josh. While the shape is still being found together, stay in the conversation, do not commit a doc edit per exchange. The tell is write-rewrite-rewrite churn: if I am rewriting the same section three turns running because Josh keeps correcting the shape, I am writing too early, the discussion is the work, the doc comes after. Same principle as [[feedback_write_memories_after_the_work]] (a thing written before it settles captures a guess that gets reversed). Josh 2026-06-06: after I committed three successive rewrites of a TimeoutController-decomposition finding mid-discussion, "stop writing until we have a shape." When unsure whether a call is settled, ask "is this the shape?" before writing, not commit-and-find-out.
- Implementer briefs read: "Read `designs/<path>.md` first. The decisions in §X bind. Do not re-litigate." This replaces the failure pattern of enumerating calls in the brief itself.
- Pairs with `feedback_ask_more_questions.md`: surface the call to Josh, get the answer, write the answer to the doc, then dispatch.
- Pairs with `feedback_design_doc_hygiene.md`: design docs stay design-only; codenames and issue lists do not belong here, but binding decisions do.
