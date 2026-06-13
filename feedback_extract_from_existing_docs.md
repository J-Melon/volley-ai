---
name: Extract from existing design docs when writing a new one
description: When creating or promoting a design doc, grep the project for the standard noun and pull existing material from the most authoritative sources before writing. Don't paraphrase from a derivative source.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When creating or promoting a design doc (a new narrative file, an art doc, anything in a discipline folder), grep the project first for the standard noun. Pull existing material from `designs/narrative/`, `designs/art/`, `designs/research/`, `story.md`, `outline.md`, `bible.md`, the open-development essay, and any other surface that already discusses it. Compose from the most authoritative sources available; don't paraphrase a derivative source.

**Why:** 2026-05-10. Promoted "spirit of the volley" / "friendship" content into a new `designs/narrative/friendship.md`. Wrote it by paraphrasing the section in `01-prototype/design/08-court-bounds.md`, which itself was paraphrasing earlier prose. The prototype design doc is downstream of the settled material, not the source of it. Existing prose in `story.md`, `outline.md`, `art/bible.md`, and the open-development essay had richer, truer material on friendship that the new file should have led with. Josh: "you didn't extract from the others?" Pairs with `feedback_essay_as_voice_anchor.md` (read the essay for voice) — this rule is about content extraction, not voice calibration.

**How to apply:**

- Before writing a new design doc, run `grep -rn '<standard-noun>' designs/` and read the matched paragraphs in their original docs.
- Identify the most authoritative source(s): discipline folders (narrative/, art/, research/) outrank phase folders (01-prototype/).
- Compose the new doc from those quotations and adjacent context. Where existing prose lands the point, lift it; rewrite only when adapting voice or tightening.
- The new doc references the sources it draws from when the link earns the cross-reference.
- Common mistake to watch for: paraphrasing from one paraphrasing source. If you find yourself writing "Friendship is what a committed rally is doing" off the design doc, stop and grep for what `bible.md` and `outline.md` already say about friendship.
