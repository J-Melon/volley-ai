---
name: feedback_label_matches_work_type
description: "CLAUDE.md's default Feature label is wrong outside tech work; pick by AUDIENCE (who reads and acts on it), not by whether code is involved. art/concept (visual exploration), design/spec (designer: feel/tuning/player-experience, even if resolving it writes code), tech/{feature,bug,spike} (engineer: how it is built), writing/narrative, audio/sfx."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

The Linear label families are typed. After the 2026-05-29 trim to labels in real use: `tech/{feature,bug,spike}`, `art/{concept,asset}`, `design/{spec}`, `writing/{narrative}`, `audio/{sfx}`, `test/{ride,carnival}`, and the `music` group (no leaf yet). Pick the one that matches the work. CLAUDE.md names `feature` as the default, but that default only applies to tech work; using it on an art jam or narrative authoring mislabels the ticket.

The discipline pairing matters because different people have different skill sets, and the label needs vocabulary that fits the discipline. `art/concept` for visual exploration: concept art is the industry-standard term; "art study" reads as a personal preparatory exercise (this is why the old `study` leaf was dropped, not just renamed).

**Why:** Josh asked "Why is the art jam a feature?" after I tagged SH-343 (a visual-direction exploration) with `feature`. The right label was `art/concept`. The CLAUDE.md default tripped me into the wrong family.

**How to apply:** When filing any ticket, look at the work first. Visual exploration goes to `art/concept`. Finished art asset goes to `art/asset`. Design work (speccing how a feature should work) goes to `design/spec`. Narrative doc authoring (profiles, outlines, lore) goes to `writing/narrative`. A sound effect goes to `audio/sfx`. New gameplay capability goes to `tech/feature`. Broken system goes to `tech/bug`. Technical unknown goes to `tech/spike`. The CLAUDE.md "default" only kicks in if the work is genuinely a tech feature.

**Concept art is `art/concept`, not `art/asset`.** `art/asset` is reserved for visual elements that ship into the game (sprites, scenes, finalised in-game art). Concept art is reference for production, still in the exploration-to-commit arc, so it carries `art/concept`. The fact that a concept piece is "finalised" does not make it an asset; only in-game integration does.

**Route by AUDIENCE, not by whether code is involved.** Ask who reads the issue and acts on it. An issue that touches code is NOT automatically tech. `spec`'s audience is the **designer**: an open question about feel, tuning, balance, what the player experiences, the output is a design decision even if resolving it later writes code. `tech` (spike/feature/bug)'s audience is the **engineer**: a technical unknown, a capability, a defect, the output is code. SH-469 (per-hit speed increment observability) exists so a designer can TUNE the increment by observation, so it is `design/spec`, not `tech/spike`, although it will touch code. Mislabelled it `spec`-then-`spike`-then-back; Josh: "should be spec, audience is designer." Led with the testability benefit when the real purpose was tuning. Find the purpose, then its audience.

**Label, body framing, AND format all key off the audience.** Getting the tag right is only the first third.
- The **body** must address the same reader: on SH-469 I set `spec` but wrote the body as a tester's complaint ("only testable by mirroring the formula, two tests cut"). A designer-facing spec opens with the design/feel question and demotes the engineering origin to a footnote.
- The **format** follows too. A **User Story** (As a [role] / I want / So that + AC) is for any human USER of the thing, NOT player-only: the role can be the player, the designer, OR the team itself using its own workflow/tooling/tracker ("As a contributor working the board..."). Josh: "for me a user story is not confined to a player, we have to use this thing too." Use a **System Story** (`[VERB] the system does X`) only when the subject genuinely is the system with no human user to name. Do not reflexively reach for System Story just because no player is involved. SH-469 landed as a User Story; SH-470 (project naming) is a User Story with the contributor as the user, not a System Story. One audience, three surfaces to match (label, body, format).
