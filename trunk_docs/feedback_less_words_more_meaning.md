---
name: Less words with more meaning
parent: trunk_docs
description: Josh values concision; every sentence in design/narrative prose should carry weight and land a specific meaning the reader couldn't have guessed from the surrounding sentences
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Every sentence in narrative prose, design docs, and bible entries should land a specific meaning the reader couldn't have guessed from the surrounding sentences. A sentence that circles a meaning without naming it is the failure mode.

**Why:** Josh said directly 2026-04-26: "i value less words with more meaning." Concrete trigger: the art bible's Real paragraph ("Not ugly or hostile, just ordinary, familiar, and carrying things the constructed world was built to cover") was flagged as fluff because it lists qualities adjacent to the picture without ever placing the picture itself.

**How to apply:**
- Test every sentence against whether removing it would lose a specific meaning. If the next sentence works fine without it, the sentence is filler.
- Adjective stacks ("ordinary, familiar, and carrying things") and qualifier stacks ("not X, just Y, and also Z") signal the writer circling a meaning without naming it. Replace with one concrete particular.
- "The X is the Y, and also a Z" tries to land three meanings in one sentence; usually one is doing real work, two are filler. Pick the one and let it land.
- Name the meaning directly with a particular rather than circling it with qualifiers.
- This pairs with the existing "lead with what things are" rule; both target the same failure mode (the sentence reaches for evocation without supplying material).
- Specific to design and narrative prose. Memos, status updates, and conversational replies still benefit but the bar is lower.
- Calibration anchor: the open-development essay (`designs/research/the-case-for-open-development.md`) and the visual-positioning essay (`designs/research/visual-positioning.md`); both pack meaning per sentence.

**A confident short sentence carries more weight than a sprawling one.** Reinforced 2026-04-26 by Josh. Writing reaches for length thinking length signals seriousness. The truth: a confident short sentence carries more weight because the reader trusts a writer who lands a meaning and stops. Length earns its place when it carries a specific picture or rhythm; otherwise it's hedging.

**How this shows up in revision:**
- Spotting filler: read each sentence and ask "does the next sentence depend on this one carrying its meaning?" If the next sentence works fine without it, the sentence is filler.
- Spotting hedging: "ordinary, familiar, and carrying things"; three near-synonyms stacked is the writer evading commitment to one. Pick the one. Drop the stack.
- Spotting evocation-without-supply: "Quieter palette, looser edges, light falling where it falls, things where they actually are." It sounds like description but leaves the palette, the edges, the light, the things unnamed. The picture isn't placed; only adjectives circle it.
- The short confident sentence: states the picture directly and stops. "The kitchen has just been used. A kettle clicks off. A back at the window." Three sentences, three particulars, no adjective stack carrying their weight.

**Developing an idea is a reductive process.** When Josh says "run with this idea," he means develop it down to the gem by stripping clutter and tics with each pass. The prose emerges as fewer words landing sharper meanings. Surfaced 2026-05-10 on the friendship redraft: "running with it does not mean more words, it means developing the idea, this is a reductive process until we hit the gem." A "tic" is a phrasing pattern that fills space without adding meaning ("who keep showing up for each other," "in small repeated gestures," qualifier-stacks). Reading aloud catches them: where the voice softens through filler, cut.
