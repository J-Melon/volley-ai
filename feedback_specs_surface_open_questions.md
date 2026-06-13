---
name: Specs surface open questions; don't assume answers
description: When writing a spec, decisions I'm not sure of go in an "Open questions" section, not assumed and written as settled. Stop and ask before fabricating defaults.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
When drafting a spec, the temptation is to make it sound complete by picking a side on every contested point. That fabricates settled answers. The right move: when I hit a decision I do not have a confirmed answer to, surface it as an open question for Josh, not as a default I wrote in.

This applies even when the assumption sounds reasonable. "Reasonable" is not "what Josh decided." Examples I baked into the SH-309 spec without asking:

- Whether back-miss should harmonise with side-miss (same roll-out behaviour) or stay distinct.
- Whether the rest-roll loses energy from floor friction, body damping, or both.
- Whether the bound's height lands on a Resource now or as a loose `@export`.
- How the drag-handoff frame window is handled (does a held-body-in-flight ever fire side-miss).

Each of those is a feel/design decision, not an implementation detail. Each should have been an open question, not a settled assertion.

**Why:** Josh has corrected this multiple times across the session. The pattern is: I write something that sounds confident, he asks "why did you decide that?", and the answer is "I assumed." A spec full of my unmarked assumptions reads as authoritative when it isn't, and the implementer downstream takes my guesses as settled.

**How to apply:**

- While drafting, every assertion runs through a check: do I know Josh has decided this, or am I guessing? If guessing, it goes to the "Open questions" section at the bottom of the spec, named explicitly.
- Open questions are written as questions, not as "TBD" placeholders. They name the decision space (e.g. "energy loss from floor friction, body damping, or both?"), not just "TBD on rest-roll".
- The "Open questions" section sits **at the end of the doc**, not in line with the affected section. Body prose stays declarative on what is decided; uncertainties are gathered in one place at the bottom so the reader sees the decided spec first and the contested points after.
- For specs in flight: flag the open questions in chat to Josh, don't bury them only in the doc. He should see what is unresolved before he reads.
- Pair with `feedback_ask_more_questions`: prefer asking before drafting than asking after. But when something only surfaces during drafting, the right move is to stop and ask, not to ship a guess.
- The "Open questions" section is a normal part of a working spec; it shrinks as decisions land. A spec with no open questions is either fully decided or hiding its uncertainties.
