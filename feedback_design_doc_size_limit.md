---
name: Design docs over 100 lines have a problem
description: Prototype design docs target under 100 lines. Past that, the doc is doing too many things; trim, split, or move detail into code/tickets.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
A design doc that is climbing past 100 lines is a signal, not a target. Either the doc is covering too many concepts (split it), restating material that lives elsewhere (trim, link), or carrying implementation detail that belongs in tickets or code (kill it).

The 100-line ceiling is a working ceiling for `designs/01-prototype/**` and similar prototype-scope design docs. Larger essays and bibles (`designs/narrative/**`, `designs/art/bible.md`, the open-development essay) live by their own rhythm.

**Why:** Josh called this out after I had reduced `21-ball-dynamics.md` from 351 to 77 lines and `08-court-bounds.md` from 155 to 39 lines, both still readable, still carrying their ideas. The original docs were dense with code snippets, signal-chain references, file paths, and Q&A framing that had outlived its purpose. The 100-line target keeps the doc as a record of *decisions and design ideas*, not a derivation or a reference manual.

**How to apply:**

- Before writing or extending a prototype design doc, target a working ceiling of under 100 lines for the whole file.
- If a section is producing a lot of prose, ask whether the prose is adding ideas or restating the same idea in more words. Cut the restating sentences.
- Code snippets, signal chains, type names, file paths, and line numbers are usually the first things to cut. The implementer can grep; the doc just needs to name the rule.
- Q&A framing (Q1, Q2 with full reasoning) can collapse to the answer in two sentences once the question has been settled. The reasoning belongs in the spike's commit message and the PR body, not in the design doc once it lands.
- If two concepts won't fit under 100 lines together, split into two docs that link.
- Cross-doc duplication should resolve to a forwarding link, not a paraphrase.
