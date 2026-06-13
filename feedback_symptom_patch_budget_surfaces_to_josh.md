---
name: Three symptom patches on one smell surfaces to Josh, not an auto-dispatched RCA
description: When the third safety-net patch lands on the same architectural smell within a mission, the orchestrator surfaces the pattern to Josh and waits for the call; it does not auto-dispatch root-cause-analyst or auto-file a spike
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
The third safety-net patch on the same architectural smell within a single mission is the moment to stop patching and ask. The orchestrator names the pattern in chat ("three patches on the `Ball.play_state` vs `ItemManager._placement` disagreement: A, B, C; this is starting to read as one root cause") and waits for Josh to decide: keep patching, dispatch root-cause-analyst, file a spike, escalate to a refactor mission, or accept the safety nets as transient and document them as such.

The orchestrator does not auto-dispatch root-cause-analyst. The orchestrator does not auto-file a spike ticket. The orchestrator does not declare the next patch out of bounds. The call is Josh's.

**Why:** 2026-05-11 Banana Tank debrief. Seven symptom patches landed on the `Ball.play_state` vs `ItemManager._placement` disagreement before SH-378 (the spike) was filed: five Battle safety nets plus `87f9f76` (grab-area-pickable) and `d58a34e` (rack-ghost). Pollux's CI mining proposed an auto-escalation rule ("the third patch triggers root-cause-analyst at Tier 2 or escalation to Josh, not a fourth patch"). Josh sharpened to "surface to me": the auto-dispatch option is wrong; the orchestrator's role is to flag the pattern, not to act on it autonomously.

**How to apply:**

- Track safety-net patches by the smell they patch. A "smell" is identifiable by the disagreeing components, the symptom shape, or the safety-net's defensive guard. Two patches on the same `Ball.play_state` vs `ItemManager._placement` mismatch count as two on one smell; two patches on unrelated null checks do not.
- On the third patch, before dispatching the implementer, surface in chat: "this is the third patch on $smell within $mission; should I dispatch root-cause-analyst, file a spike, or keep patching?"
- Wait for Josh's call. Don't pre-empt with "I'll just file the spike."
- The pattern shows up in CI mining at debrief time too. If a mission shipped with three or more symptom patches on one smell, the debrief names them and the count, and the orchestrator already raised it during the mission.
