---
name: Playtest ACs only include play-testable items
description: Playtest issues (Ride / Carnival gates) list only failure modes Josh can verify by playing the game; code-inspection items go to Battle or a separate code-review issue
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When bundling ride/carnival findings into a playtest issue's acceptance criteria, include **only** items Josh can verify by playing the built game. Every AC on a playtest issue is something he can observe with hands on the controller.

**What does NOT belong in playtest ACs:**
- Release-build behaviour reasoning (assert-stripped guarantees, invariant documents).
- Staged-bad-data scenarios (corrupt ItemDefinition, null paddle configure, freed-mid-tween teardown). These need a code/test harness, not a play session.
- Code-path validation (grep for warnings, review filter logic).

Those findings still matter. They go to:
- A **Battle** (code reviewer scope) on the originating Challenge.
- A **separate code-review issue** labelled accordingly.
- Or the mission **debrief** if they are observations without a required fix.

**Why:** Josh called this out 2026-04-24 after SH-216 bundled Margo and Edith's code-side findings (unknown-role behaviour, configure-null release, freed-paddle teardown) into a playtest issue Josh was meant to verify by playing. He can't play those; they need code inspection or staging. The playtest issue lost signal because the player-observable gates were mixed with investigations that belong elsewhere.

**How to apply:**
- When filing a playtest issue, ask each AC: "Can Josh verify this with hands on the controller, seeing the built game react?" If no, remove from the issue.
- Route the removed items to Battle, a code-review issue, or the debrief scratchpad.
- Assume code is correct enough by playtest time. Playtest is about feel, flow, and player-observable bugs; not belt-and-braces code audit.
- **An AC names a state at done time, not the verification activity.** "Lifecycle holds in play" is a state. "A playtest session exercising rack, court, timeout, and item handling shows the rally lifecycle holding" is a process description (the playtest IS the activity; AC names the after-state). Sharpened 2026-05-24 on Operation Anteater Ride: I wrote a process-shaped AC; Josh: "that's not an ac." Strip the activity preamble; state the state.
- **An AC is self-contained for the verifier.** Read on its own, the AC tells the verifier what to look for; they should not have to read the milestone description or the constituent issues to know what they're checking. "Anteater-cluster bugs do not surface" is opaque (what bugs?). "Walls hold the ball through long rallies" is self-contained. Sharpened 2026-05-24 on Operation Anteater Ride: Josh: "a verifier needs to know what should or not happen from the ride ac alone." If the AC needs the reader to chase context, rewrite it.
- **AC names a concrete failure mode in game vocabulary, not an abstract invariant.** "Balls cannot go under the starter wall" beats "Walls hold the ball through long rallies": the first names the failure the verifier checks for, in the game's own objects (starter wall, ball); the second is an abstraction that hides what to test. Use the specific game-object names the player would recognise (rack, starter wall, timeout, autoplay), not generic terms (lifecycle, boundary, state).
- **"Cannot X" framing is often sharper than positive invariants.** "Balls cannot overlap in the rack" beats "Each ball takes its own slot" because the failure the verifier looks for is the overlap itself.
- **Drop hedging qualifiers.** "through long rallies", "across a session" weaken testability. The invariant either holds or it doesn't.
- **AC reflects the fix being landed, not the bug ticket's proposed fix.** Josh's call on what gets fixed can change from the bug ticket's body; the AC reflects the current decision, not the proposal. Do not second-guess an explicit AC by appeal to the originating bug's text. Sharpened 2026-05-24 on SH-426 autoplay AC: I flagged "autoplay deactivates on timeout start" as backwards from SH-411's bug description; Josh: "i said what i said, the bug is the paddle stops working, this is the fix." Editor flag once for clarity; accept the call.
