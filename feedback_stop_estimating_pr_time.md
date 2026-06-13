---
name: stop-estimating-elapsed-time-around-pr-landing-or-cycle-boundaries
description: "Minion PRs land fast (reference point, around 30 minutes from dispatch to merge for a small bug-fix fanout); don't propose cycle-roll plans based on assumed multi-day latency"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

Don't frame dispatch plans around assumed PR latency. A typical minion-driven bug-fix PR lands within the same working block as its dispatch. The reference point Josh gave on 2026-05-24 during the Anteater fanout: "these prs will land within the next 30 mins" for a five-issue parallel dispatch.

**Why:** I kept proposing cycle-roll fallbacks (Doglion vs Ernie) and "anything not landing today rolls into the next cycle" framing as if PR turnaround was multi-day. The bug-fix fanout's actual cycle is sub-hour: dispatch, implementer commits, PR opens, reviewers fire, auto-merge clears. Cycle-boundary worry was noise in the plan.

**How to apply:**

- Don't add "if it doesn't land today" or "rolls into next cycle" clauses to dispatch plans by default. Bug-fix and small-feature minion PRs land in the same session block.
- Don't ask Josh which cycle to file into based on imagined turnaround. File into the active cycle; if it slips, Josh moves it.
- Don't put a duration estimate on PR landing in plan tables, status updates, or AskUserQuestion options.
- The exception is genuinely long-running work: large refactors, multi-stage spikes, or anything blocked on external review. Those can warrant time framing, but state the reason rather than guessing.
- When tempted to write "Doglion ends tomorrow, anything not landing rolls into Ernie", just dispatch and let the merges resolve.

Cross-link: [[feedback_dandori_is_planning_not_execution]] (plan, then stop). The plan does not need a calendar.
