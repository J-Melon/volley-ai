---
name: Narrative docs lead with the story; cut technical detail
description: Open every narrative doc in designs/narrative/** with what happens in the story; defer mechanic, animation, and tooling specifics to system docs
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
Narrative docs (`designs/narrative/outline.md`, `designs/narrative/discipline.md`, and any siblings under `designs/narrative/**`) should open with a tight summary of the story - who the protagonist is, what they do, what changes, what the player carries away. Mechanic-level detail (apex-bounce physics, animation per-frame requirements, friendship-bound reach mechanics, scope-with-Aubrey notes) does not belong in the narrative doc; it belongs in the relevant system doc under `designs/01-prototype/`, `designs/art/`, or `designs/process/`.

**Why:** the narrative doc is the one place in the repo that should answer "what is the story" without making the reader assemble it from setting, geography, mechanic, and tooling sections. `outline.md` currently opens with "Setting" (period and place), then "Two worlds", then "The garden as meeting point", then "One locked gate", and the actual story - what the protagonist does, what unravels, how it lands - emerges only after wading through. A reader trying to remember "what happens in Volley!" has no top-of-doc summary to anchor on. Josh: "the narrative docs are hard to follow, don't really summarise the story nearer to the top, and describe some odd technical parts that don't really need to be there."

**How to apply:**
- **Lead with story, two-to-four paragraphs at the top.** Concrete, present-tense or past-tense as the doc voice prefers, but story-shaped: who, what they do, what changes, why it lands. The cliff and the call belong in this summary, not buried after fifteen subsections.
- **Defer or relocate technical detail.** "The court has no top wall" + apex mechanics belongs in `designs/01-prototype/` (game-feel or court doc). "A reaction per rally point is animated state... worth scoping with Aubrey" belongs in `designs/art/` or a tooling note. The narrative doc references these by short pointer, not by inline specification.
- **Discipline docs (`discipline.md`) stay craft-only.** Voice, dialogue rules, scene construction, tone modulation. Keep the story off these - `outline.md` carries that.
- **When sweeping, lead with the story extraction.** Don't try to keep both the technical interleavings and a new summary; pick the new shape and relocate.
