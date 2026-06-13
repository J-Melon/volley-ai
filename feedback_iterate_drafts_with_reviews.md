---
name: Iterate drafts with adversarial review agents until nits, not rewrites
description: When drafting anything non-trivial (upstream issues, challenge descriptions, proposals), run successive adversarial review agents until they stop producing substantial rewrites.
type: feedback
originSessionId: 473c2f98-7fb4-46f3-8541-a31e65bc776f
---
For upstream issues, challenges, and any non-trivial written artefact, iterate through rounds of adversarial review agents before shipping. Each round should be told to default to "this can be better" and only accept real problems, not style preferences. Stop when the next round produces small nits instead of substantial rewrites.

**Why:** Multiple drafts is how humans write. Jumping to the finished version skips the real work. Sycophantic reviewers that just approve don't catch the factual errors and framing traps that kill a proposal in review. Adversarial reviewers with real repo access (gh, web, docs fetch) catch rename-direction inversions, fake-precedent analogies, mischaracterised related issues, and kill-phrases the prior pass missed. When a round's corrections shrink from "rethink the shape" to "tighten one sentence," the draft has converged.

**How to apply:**
- Dispatch each reviewer as a separate Agent with a distinct first name (per existing codename rule).
- Give each reviewer full context: prior findings already applied, specific checks to run, the draft text.
- Tell them explicitly to only report real problems and to ground critiques in evidence.
- Apply every real finding between rounds. Don't defend the draft.
- Signal to stop: the round's edits are phrase-level, not structural. Verdicts move from "rethink" to "ship after these edits" to "ship."
- Don't rush the user past iterations. If the current round produced substantive changes, do another.
