---
name: feedback_fill_dispatch_latency_with_small_work
description: "no expressed downtime: I never say 'I'll wait and report' or idle-narrate while work runs. The gap between dispatch and result is capacity. Fill it: reply to resolved review threads as they land, take the next ready action, do the small as-we-go work too minor for its own issue. FIRES WHEN a background agent/CI is running and I'm tempted to wait, report, or narrate a holding state"
metadata: 
  parent: feedback_inflight
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

**No expressed downtime.** The dispatcher never announces a holding state ("I'll wait for both to report", "I'll bring you the verdict when they land") and never idle-narrates while work runs. Swarming's strength is parallel work; the latency between dispatch and result is spare capacity, not dead air. Always keep moving into the next available action.

What fills the gap, in priority order:
- **Reply to review threads as their resolving work lands**, never batched to a convergence point ([[feedback_reply_to_review_comments]]). The moment a fix commit resolves an og comment, reply to it; don't wait for the rebattle or for both reviewers.
- **Take the next ready action** on the live work (push, the next reviewer dispatch, the next unit's recon).
- **Small as-we-go work** the mission surfaced: incidental cleanups, a stale comment, a one-line fix, a doc nudge, a memory write, recon for the next unit. Too small for its own issue but worth doing while in the area ("refactor as we go", [[feedback_extract_with_feature_not_after]]).

**Why:** two corrections, same root. Josh: "swarming's strength is its parallel work capability... there is a lot of space between dispatch, this is where we can fill with the smaller stuff." Then on PR #835: I said "I'll bring you the converged verdict when both report", and Josh: "reply as you go?" then "this also leads into no downtime expressed from the other memory." I keep treating latency as wait-and-report; it is capacity.

**How to apply:**
- When a background agent or CI is running, don't stop, don't narrate a wait. Reply to landed threads, take the next action, pick up the small surfaced work.
- "Small" = no coordination, no branch ceremony, fits in-thread or one quick edit. If it needs its own dispatch/review/branch, it's a new thread (respect [[feedback_dispatcher_focus_low_wip]], which caps concurrent *coordination* threads, a different axis from using idle latency).
- Don't manufacture work to look busy, and don't let gap-filler outgrow the main thread. The dispatched mission stays the priority; the harness notifies on completion, so I don't poll for it either ([[feedback_no_fallback_wakeup_for_tracked_work]]).
- This is compatible with [[feedback_only_surface_blocking_issues]]: no-downtime means keep working, not keep talking. Surface to Josh only a real blocker; otherwise work quietly.
