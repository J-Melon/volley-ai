---
name: Design prose explains the system; name what it does, its powers, its limits
description: A design doc about a system or concept (friendship, bonds, the spirit) tells the reader what it does, how much it can do, what bounds it. Don't write evocatively to a reader who already knows; teach the system.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When a design doc introduces a system or named concept, it explains what the system does, what its powers are, what its limits are. The reader is learning the system; the prose teaches it. Evocative prose written as though the reader already knows is a failure mode: the doc sounds true to insiders and reads as empty to anyone else.

**Why:** 2026-05-10. Friendship redrafts kept landing in lyrical or declarative-but-thin registers ("It lifts the ball at the apex. It holds the protagonist a beat above the floor"). Josh: "explain what friendship actually does, what is the limit, what is the power; these are more important. You write like they already know." A design doc about friendship has to answer: what does it do, what scales it up or down, what bounds it, what powers it, what breaks it. Without that, the doc is sentences about a thing the reader cannot yet picture.

**How to apply:**

- For each named system or concept the doc introduces, name: what it does (effect on the world); the power range (how big can it get, how small); the limits (what bounds it, what stops it); the source (what feeds it).
- Stop and ask Josh when any of these are unknown rather than fabricating. Pairs with `feedback_specs_surface_open_questions.md` and `feedback_ask_more_questions.md`.
- A reader test: someone who has not seen the chat, has not read other Volley docs, opens this one. Can they tell what the system does? If no, expand. Can they tell its limits? If no, expand.
- Pairs with `feedback_style_md_scope.md` (specs answer what AND why) and `feedback_design_docs_lead_with_story.md` (narrative leads with story). This rule extends the principle to system-shaped design prose: lead with what it does, then how it works.
- Evocative prose still has its place, but only after the reader can picture the system. Lyric over a placed picture lands; lyric over a vague one is fluff.
- **Explain in narrative, not in design/tech mode.** The explanation does the work of teaching the system, but in literary prose: sustained sentences, image-thinking, the concept developing across paragraphs. The bullet-list of effects and the define-then-list opener are design/tech shape. Surfaced 2026-05-10 on the friendship redrafts: "we do actually need to explain this but not in the design or tech way." The aphorism is too clipped; the bullet-list is too mechanical. The right form is essay-prose unfolding the concept.
