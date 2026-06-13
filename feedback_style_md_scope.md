---
name: Spec TLDR answers what AND why, given general project knowledge
description: Implementation-spec docs in designs/01-prototype/** open with a TLDR naming the change being made and the experiential payoff that motivates it. Aimed at a project insider; no game-from-scratch, no opaque shorthand, no em dashes. Volley does not use the ADR artefact name.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
STYLE.md voice rules (open with a concrete particular not a thesis, the hook, but/therefore connectors, scene-then-reflect, named-dog specificity) apply to long-form prose: essays, devlogs, public writing, narrative bibles, art bibles, character profiles, the open-development essay. They do **not** apply to technical/system implementation specs under `designs/01-prototype/NN-system.md` and similar reference docs.

Most prototype design docs are **implementation specs**: they propose how to build a piece of the design, and they drive a Linear ticket. Do not call them ADRs in prose; Volley does not maintain an ADR artefact and the term implies a process the project does not run.

The opening is a TLDR that answers two questions for a reader who already knows the project at a general level:

- **What does this spec do?** The implementation change being made, with enough technical shape per affected surface to be unambiguous.
- **Why does this spec exist?** The experiential or design payoff the change delivers that the current state does not. "Because the design says so" is circular: the design itself was decided for reasons, and those reasons (how the rally feels, how the venue reads, what the player understands when a miss happens) are what go in the TLDR.

The reader you write for knows the game, knows the design exists at concept level (terms like *friendship-bound*, *venue*, *bond*, *side-miss* land without inline definition), and has not read this specific doc. The reader you do not write for is a stranger to the project (the README and the public essay serve them) or a future-you with full memory loss (the design docs themselves serve them).

Seven failure modes seen in succession on the SH-309 wall-less-court doc opening:

1. **Narrative hook.** Wrong genre.
2. **Title-restatement.** "The court has no walls. Top is sky..." Zero information.
3. **Reference-style "what is".** Describes existing state instead of naming the change.
4. **Spec-shaped but jargon-loaded.** Names the right things but uses opaque shorthand ("the placeholder", "the doc", a bare ticket number).
5. **Over-explained from first principles.** Treats project terms-of-art as if the reader has never heard them.
6. **What without why.** Names the change cleanly but leaves the reader asking why it is being made.
7. **Why-because-design.** Cites the design as the justification. The design is something the team decided; the real why is the experiential payoff that drove the decision.

Working opening:

> Today the rally tops out with a pong-bounce off a screen-edge ceiling, and balls straying sideways bounce off invisible walls and stay in play. This spec replaces both. At the top, the ball rises past the friendship-bound, arcs back down under gravity, and the rally continues; the player feels the ball being held in by the friendship rather than rebounding off a ceiling. At the sides, the ball rolls out onto the venue floor and lies among the items the player has placed, to be walked back to the rack. The top collider goes; gravity engages while the ball is above a per-venue friendship-bound height, so the ball arcs back into play. The side walls go; a ball crossing either lateral edge fires a side-miss before its body unfreezes and rolls. Paddle line and ground unchanged. Drives SH-309.

That paragraph names current state, the experiential cost of leaving it in place, the player-felt change at each affected surface (why), the implementation per affected surface (what), what stays unchanged so the reader does not assume a broader rewrite, and the ticket. Project term-of-art is used without inline definition.

**Why:** a spec is read by Josh, by future agents on the swarm, and by occasional contributors. They open it asking what is being built and why it should be built that way. A TLDR that answers only one question forces a re-read of the design to understand the second; a TLDR that answers neither is wallpaper.

**How to apply:** when writing or reviewing a spec opening, run two checks.

- *What test.* Could a reader with general Volley knowledge state, in one sentence, what this spec changes? If no, expand the decision.
- *Why test.* Could the same reader state, in one sentence, what the player gains that they did not have before? If no, expand the motivation. "Because the design says so" fails the test; the design's own reason passes it.

Then strip every sentence that fails the cold-insider test: explaining the game, paraphrasing the title, naming defaults that any 2D game shares, repeating design points a project insider already knows.

The "no em dash / no exclamation / no AI vocabulary" rules from STYLE.md apply everywhere. Use a colon, semicolon, comma, or full stop in place of an em dash. The hook, particular-over-thesis, and narrative-momentum techniques do not apply to specs. The word "ADR" does not appear in Volley's prose; call the artefact a spec or a design doc.

**On long-form prose where STYLE.md does apply (narrative, art bible, devlogs, public writing): treat the toolkit as available, do not force it.** Every sentence is a choice. Use a hook when the doc benefits from one; skip it when a clean opener carries more weight. Use particular-over-thesis when the particular earns the line; lead with the thesis when that is the truth of the doc. Reach for named-dog specificity, scene-then-reflect, but/therefore connectors when they earn their place; skip them when they show up as artifice. Forced application reads as cliché and does the prose more harm than reaching for plain language. Surfaced 2026-05-10 on the spirit-of-the-volley narrative draft.
