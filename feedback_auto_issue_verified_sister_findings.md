---
name: Auto-issue Gru Sisters' non-player-facing findings once verified
description: Margo and Edith's code-review or follow-up findings skip the confirm-before-issues gate; Gru verifies each as a real problem and files directly
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Gru Sisters' Ride or Carnival findings that are NOT player-observable (so: code-review items, follow-up bug candidates on internals) can be filed as Linear issues directly once Gru verifies they're real problems. No confirm-before-issues step. Josh doesn't need to approve each one; he trusts the Sisters + Gru's verification pair.

**Verification gate:** Gru reads the code path the finding names, confirms the hypothesis lands, THEN files. A speculative finding that turns out not to reproduce doesn't get filed. Verification is the load-bearing step.

**Why:** Reinforced 2026-04-24 after Kyle Patrol's Ride. Margo and Edith surfaced ~10 non-player-facing findings between them; pausing to confirm each with Josh individually is the wrong friction given he's already said "trust the Sisters + Gru to file the real ones." Narrower than `feedback_confirm_before_tickets` on purpose; that rule still holds for scoping/strategy issues and new features; this one handles the Sisters' review output.

**How to apply:**
- When Margo or Edith names a code-review / follow-up / bug-candidate finding, Gru verifies by reading the relevant file paths the Sister cited.
- If verified real: file the issue directly (bug or feature per shape), project matching the affected area, title state-assertion-shaped per `feedback_ticket_writing`.
- If not verified (finding doesn't reproduce, is speculative, or is already covered): drop it, note why in the Ride debrief.
- Scope of this exception: Gru Sisters' Ride + Carnival outputs only. Other sources (user requests, design spikes, mid-session observations) still go through `feedback_confirm_before_tickets`.
- Player-facing findings from the Sisters still get added to the Ride issue's AC, not filed as separate issues; that's unchanged.
- List the filed issues in the Ride debrief so Josh sees the batch without approving one by one.
