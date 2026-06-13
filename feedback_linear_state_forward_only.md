---
name: feedback_linear_state_forward_only
description: "Never transition a Linear issue to an earlier-in-lifecycle state. Volley lane is Vault, Ready, Dispatched, Challenged, Completed, Closed (Triage sidelines incoming, Retired sidelines cancelled). If a state was overshot, leave it; do not rewind."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Volley's Linear team uses these statuses (verified 2026-05-14):

| Name | Type | Position |
|---|---|---|
| Triage | triage | sideline (external/incoming) |
| Vault | backlog | start of lane |
| Ready | unstarted | next |
| Dispatched | started | next |
| Challenged | started | next |
| Completed | completed | next |
| Closed | completed | end of lane |
| Retired | canceled | sideline (cancelled work) |

Forward lane: **Vault → Ready → Dispatched → Challenged → Completed → Closed.** Once an issue advances along the lane, never move it backward, even if a rework cycle suggests "back to Dispatched." The state records the most-advanced step the work has reached.

Committed source of truth: `designs/ai/lane-semantics.md` (human-visible; this memory and the Linear status descriptions both point there).

**State meanings (Josh, 2026-05-29):**
- **On a bug/feature issue, Completed = merged.** That is all it means. It is a MANUAL move on merge: the team merge automation is no-action and branches are GitHub-facing, so nothing auto-completes ([[feedback_dispatched_on_dispatch]]); no `Closes #N` trailer. Verification does NOT live on the issue's state.
- **Verification lives in the Ride, not on the issue.** A **closed Ride** means the merged work was ridden and confirmed. The bug issues go Completed on merge; the Ride is the separate confirmation pass that certifies they hold.
- **Closed** = released to production via the cycle release carnival, and the **carnival is the regression test** (the gate confirming nothing else broke before shipping). The pipeline sets it; it is NOT a manual hand-move.
- **Never write `Closes #N` in a PR body.** It fires GitHub's own issue-close, which overshoots the Linear lane. The Linear integration already moves the issue to Completed on merge via the branch name; the `Closes` trailer is redundant and harmful. Use a plain `#N` reference if you want a link.

**Why:** 2026-05-14, end of Ride SH-403. Josh: "never move linear state back only forward." Standing principle.

**How to apply:**
- Before any `save_issue` that changes `state`, check the current state. If the new state is earlier in the lane, do not apply it.
- A ride that needs rework stays at its current state (Challenged); the rework happens, and the next transition is forward to Completed or Closed.
- If a state was set by mistake (e.g., Completed set prematurely), reach for Josh rather than rewinding it.
- **Regression exception (2026-05-24):** when a Ride or post-merge playtest catches an AC re-breaking on an already-Completed bug, comment the new repro on the original issue and move it back to Ready. The lane rewinds because the work is genuinely re-opened, not because state was overshot. New, distinct symptoms still get their own bug.
- "In Progress" / "In Review" / "Done" are NOT Volley statuses. Linear's name fuzzy-match may quietly land on the wrong status if those defaults are passed; pass the correct Volley name or status ID.
- Pairs with [[feedback_linear_status_use_id]]: forward-only also means pass the right state ID; name fuzzy-match can land on a sibling and read as a quiet rewind.
