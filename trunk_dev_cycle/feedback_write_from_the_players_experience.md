---
name: feedback_write_from_the_players_experience
description: "GREATER PRINCIPLE. An issue is not a task or a tech entity, it is the player's SO-THAT, a reason to do work, written from inside the player's experience (what they DO and feel in the game, not how it feels as scenery, not the implementation). FIRES WHEN drafting any issue, title, AC, PR body, commit, or design doc, and whenever I catch myself naming the tech (sprite, FSM, collider) or welding parts with 'and'. The rules across all those surfaces are ONE principle: name the outcome the player gets, never the parts I built."
metadata:
  parent: trunk_dev_cycle
  node_type: memory
  type: feedback
  originSessionId: fe36675e
---

The unifying principle under ticket-titles, PR bodies, commits, ACs, and design docs:
**name what the user gets (the outcome, the so-that), never the parts I built.** Every
one of those surface-rules is this principle wearing a different hat. The user is usually
the player, but per [[feedback_ticket_shape]] it can be any human user (a
designer, the team working its own board); write from whoever's experience the work
serves, not player-only.

- An issue IS its **so-that**: a reason to do work, not a task and not a tech entity. If
  I can't write an honest so-that, there is no story. The title labels the work; the
  body is the player's voice; the so-that is the soul.
- Write **from inside the player's experience**: what they DO in the game (read Sam's
  state mid-rally, walk the venue on a break), not how it looks as scenery ("feels
  alive" is a spectator's mush) and not the mechanism. This is a GAME; the player acts,
  reacts, plays. The animation serves the rally; the movement serves inhabiting a place.
- **ACs are checkable outcomes the player can observe**, two or three, no more. No file
  paths, class/method/field names, no "without reworking gameplay" hedges. The tech
  lives in the linked spike/design doc, attached via `links`.
- An **'and' in a title is the tell** I scoped wrong (two things, or a grab-bag, or
  tech-slicing). One entity, peer-sized. We do not point stories, so issues must be
  roughly equal-sized for the count to estimate honestly; slice by player-facing
  capability, not by tech step.
- **System story is the escape hatch** for irreducibly-internal work with no player
  outcome; use it rarely, never to relabel a tech task. Most "system" work is the HOW of
  a user story, not its own ticket (the TimeoutManager restructure is a prefactor note
  on the venue-movement story, not a separate ticket).

The climb to make every time, instance to root: a clumsy title -> the rule it breaks ->
the link between that rule and the PR/commit/AC rules -> the one thing they all serve,
the creation and the player in it. I keep tunnelling into tech and into mood; the seat
to write from is the player's. Josh 2026-06-07, walking me from a tech-welded "Paddle
animation and collider" title to two honest player stories (SH-475 Sam animation,
SH-476 Venue movement), the character is named Sam, and the Sam Playable project is
itself written as a user story.

Why it keeps not firing, the mechanism: I name from the implementation surface because
as the builder the FILE is vivid. "Paddle" is `paddle.gd`; "Sam" is the purpose. Being
inside the diff is exactly when this should fire and doesn't. 2026-06-08 I filed "Paddle
animation scaffold" and Josh changed it to "Sam Animation Scaffold", and the AC I wrote
was the impl checklist, on a system story, the same Paddle->Sam fix this rule already
recorded the day before. Cure: when the work is a ticket, descend here before drafting
the title, do not name from the file open in front of me.

The children, each the same principle on one writing surface:
[[feedback_ticket_shape]] (ticket prose, points at the tickets skill),
[[feedback_describe_final_state_not_journey]] (PR/commit name the change not the journey),
[[feedback_test_names_flat_condition_outcome]] (name a test by what it tests).

Cross-references, not children (own rules this principle reaches into):
[[feedback_feature_pr_decomposition]] (atomic, peer-sized), [[feedback_no_pointing_issues]]
(size is the estimate), [[feedback_test_behaviour]] (justify or cut a test),
[[feedback_do_the_true_thing]] (the root posture this serves).
