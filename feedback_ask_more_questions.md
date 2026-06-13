---
name: Ask more questions before proposing
description: When design intent is being clarified or new structure is being proposed, ask questions instead of guessing; flag uncertainties out loud rather than building on assumptions
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When design intent is being clarified, narrative work is being scoped, or new structure is being proposed for a doc or feature, ASK QUESTIONS rather than proposing. The proposal is the second move; the first move is naming what is uncertain and asking the user to fill it in.

**Why:** 2026-04-25, Josh on the artist world bible re-architect: "i also noticed you are not asking any questions?" I had been guessing at design intent (the three registers, what "combination" meant, what "the crack" meant) rather than asking. Several rounds wasted on getting the architecture wrong. The premissin-interrogation memory rule already exists for missions; this is a session-level extension: it applies whenever narrative or design intent is being discussed, not just at mission start.

**How to apply:**

- When the user clarifies design intent, the first response is to enumerate what is now clear AND list the questions still open. Don't merge "what I now understand" with "what I'll do next" without naming gaps.
- When proposing structure (a doc layout, a feature breakdown, a section list), ask 2-5 specific questions about the parts most likely to vary. Examples: "is X part of register A or its own register?", "does the prototype show all three or just two?", "is the seam a single moment or ongoing?".
- When in doubt about a noun, a relationship, or a registration, ask. Do not guess. Guesses become commits; commits become rework.
- A sign you should be asking instead of proposing: you are about to write a section list, an outline, an architecture diagram, a refactor plan, or a code stub on the basis of a one-line user message. Stop and ask first.
- Carve-out: tight tactical work (a typo fix, a single-file edit Josh has approved, a reviewer dispatch) does not need interrogation. Foundational scope-shaping work does.
- **Implementer briefs are foundational, not tactical, when they contain judgment calls.** If the brief tells the implementer to "decide whether X lives in A or B", "use `<=` or hysteresis — your call", "defer or fold the small-speed snap" — those are design decisions that should be surfaced to Josh in chat before dispatch, not buried in the brief for the implementer to resolve. Only dispatch when the brief is a checklist of unambiguous changes. Surfaced 2026-05-10 on Banana Tank PR #600 fix sweep — solanum's brief mixed clear fixes with three design calls I made unilaterally.

- **Josh's questions are questions, not picks.** When he asks "why can't X?" or "what is this about?" he is exploring the design, not signalling a choice. Treat his question as a question; answer it honestly with the relevant facts; do NOT collapse the conversation by writing "OK, going with X" or telling him I'll dispatch on his interpretation. Reinforced 2026-05-12 twice on PR #652's out_rest field: he asked "C why would this lose tunability?" and I read it as picking C; then "why can't you just change the linear damp value and always apply?" and I read it as picking C again. Both were genuine questions about the design, not decisions. Josh: "No im just asking questions don't assume what I'm thinking."

This pairs with `feedback_premission_interrogation.md` (interrogate before mission proposal) and `feedback_dispatch_first.md` (dispatch is the primary function; but the dispatch must be on the right brief, which interrogation produces).
