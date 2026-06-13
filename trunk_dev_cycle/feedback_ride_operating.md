---
name: operating-around-a-ride-announce-file-shape-capture-then-dandori-reopen-source
description: "lead with the filed Ride issue; its title/priority/body/blocking shape; during a Ride capture findings and stop, dandori only once done; a Ride-found defect reopens the source issue forward and the fix PR links both"
metadata: 
  parent: feedback_ride_definition_and_lifecycle
  node_type: memory
  type: feedback
  originSessionId: bed3f3f3-f3c4-4328-a4ef-01f91f897589
---

How the dispatcher acts around a Ride. For what a Ride *is* and its lifecycle, see [[feedback_ride_definition_and_lifecycle]].

## Announce the filed Ride, lead with it

When Gru files a Ride issue, lead the response with it: Josh is Agnes and can't act on it if it's buried under minion dispatch or mission state. First line after filing: `Ride filed: SH-<N>; <one-line scope>. <URL>. Ready for your playtest as Agnes.` Dispatch announcements come AFTER, never interleaved. Name the ID and scope, not just the URL, so he can track on mobile. (Reinforced 2026-04-24 after SH-228 got lost in Margo/Edith dispatch traffic: "Remember i need a ride issue too?")

### Ride issue shape
- **Title:** bare mission codename or feature tag (e.g. `Anteater`). No "Ride:"/"Playtest:" prefix, the `ride` label handles type. No issue IDs in the title; wire sources via Linear `relatedTo`. (2026-05-24 on SH-426: I filed `Ride: Anteater`; Josh: "no title was correct label handles type.")
- **Priority:** High (2), so it surfaces ahead of Vault work.
- **Body:** user story (`As a player / I want <capability> / So that <payoff>`) then the AC checklist. Not a system-story VERIFY shape. (2026-05-24 on SH-426: filed system-story; Josh: "have you looked at previous?")
- **Blocking:** an active Ride blocks every **tech** issue (`feature`/`bug`/`spike`) AND every **sfx** issue. Art/music/writing/design (study, asset, revision, concept, cue, rework, draft, rewrite, discovery, tune) are NOT blocked. On mixed labels, a tech label dominates and the Ride blocks it; sfx does not confer that override (sfx is blocked because the discipline rides second to feature, not because it is tech). (Reinforced 2026-04-24: "Ride also blocks all other tech in cycle", "sfx is second to feature", "sfx is not tech".)

## During the Ride: capture, don't dispatch

While Josh is actively riding, capture each finding as a filed issue and stop. Don't dispatch fixes mid-Ride, don't propose wave 1 / wave 2, don't propose action plans or prioritisations. (2026-04-24 mid-SH-228: "just note until everything is in then make an action dandori." Reactive per-finding dispatch fragments attention and pulls Gru out of capture mode while Josh plays.)

- Each finding: file the issue (bug-format, priority per impact, in cycle as Ready, related to the source feature + Ride issue). Acknowledge briefly. Stop.
- When Josh signals done ("ride done" / "that's everything" / "move on"), THEN dandori: cluster findings by area, mark blocking vs cosmetic, propose dispatch order, file a sub-mission codename if warranted. Treat it as a Dossier-shaped pre-mission move: estimate, name the cast, line up dependencies, propose, get the go.

## A Ride-found defect reopens the source issue

When a Ride surfaces a defect in a feature merged in the same bundle, the source feature issue is not closed. It moves *forward* to Challenged (never back to Ready/Dispatched; see [[feedback_linear_state_forward_only]]) and stays there until the fix lands and a follow-up Ride accepts it. The fix PR body links BOTH the Ride issue and the source feature issue via `Closes`/`Relates to`. (2026-05-14: Ride SH-403 found SH-316 shipped with `paddle_return_angle_max_degrees = 0.0`; PR #668 declared `Closes SH-403` but didn't link SH-316, leaving the regression untraceable.)

- Even if the defect is mechanical and the source ACs still pass on paper, link from the fix PR so the regression chain is traceable without commit archaeology.
- A second Ride or focused playtest on the fix is what closes the source issue forward to Completed.
