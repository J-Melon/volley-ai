---
name: Writing tone, positive framing, warm everywhere
description: Frame prose positively AND warmly across all Volley writing; warmth is not just for public-facing surfaces
type: feedback
originSessionId: 27679d61-8cd0-4090-824f-949b68f777ed
---
In every piece of Volley writing (design docs, specs, prose, in-code commentary, memory, agent briefs, guides), lead with what a thing *is*, *does*, or *should be*. Avoid structuring descriptions around what it is not. Negations are the exception, not the dominant register. **And keep it warm**; reference-manual flat is not the voice. Josh called this out 2026-04-23: "everything should really be warm in general, it is just more fun."

**Why:** Josh flagged my writing style as abrasive and negation-heavy. Docs that list what NOT to do read as critical and set a defensive tone; docs that describe the intended state read as confident and constructive. The goal is docs that energise the reader.

**How to apply:**
- Prefer "X is Y" over "X is not Z."
- Prefer "X does Y" over "X does not do Z."
- When contrasting two options, describe the chosen one affirmatively; only briefly note what was not chosen if it earns its place.
- "No X" headings should be rewritten as what exists, not what is absent.
- Patterns like "This is not a bug" → "This is by design" or "This is the intended feel."
- Save real negations for cases where absence is genuinely the point (security boundaries, explicit scope boundaries, hard constraints). Even then, follow with the positive form.
- **Parentheticals and asides count.** "(the actual palette, not northern grey)" is still a negation. When applying a correction, don't smuggle the rejected version back in as a contrast; name only what the thing is. If a contrast is genuinely load-bearing, it earns a full clause; if not, drop it.
- **Re-read every revision for "not X" / "rather than X" / "instead of X" before saving.** Corrections are the highest-risk moment for negation-creep because the wrong version is fresh in mind.
- **Realistic terms.** Don't smuggle metaphor in by negating an unrealistic proposition. "It is not owned by the player and does not live in the ball" implies the spirit could live in a ball; nothing lives in a ball, a ball is a ball. Speak about felt qualities of a rally as felt qualities, not as animate entities with locations or chosen actions. Save metaphor for when it earns the clause; drop it when realism reads cleaner. Surfaced 2026-05-10 on the spirit-of-the-volley narrative draft.
- Applies to all written output: doc prose, commit messages, issue descriptions, in-chat explanations, memory files themselves.
- Warmth looks like: short sentences that still breathe, concrete examples over abstractions, a little humour when it fits, second-person-plural ("we") when it suits, and naming the reader's likely feeling when it matters.
