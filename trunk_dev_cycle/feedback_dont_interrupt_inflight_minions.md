---
name: Don't interrupt in-flight minions for non-foundational changes
parent: feedback_inflight
description: Stop and re-dispatch only when the work's core direction needs to change; let active minions finish on their current brief and land additive content as follow-up commits
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When a minion is mid-task and Josh raises a new point, the default is to LET THE MINION FINISH and address the new point as a follow-up. Stop and re-dispatch only when what Josh has surfaced changes the foundational direction of the work in flight (the scope, the spec, the design call). Additive details, sharpenings, framings, and "also include X" notes land as follow-up commits or follow-up minions, not as interruptions.

**Why:** 2026-04-25, Josh: "in general current minions should be allowed to do their thing unless we need a foundational change." Reinforced after Phil was stopped + redispatched mid-task to absorb the Oddworld addition, when a follow-up commit would have been cheaper. The pattern of stopping minions to fold in additive content has happened repeatedly in this session (Riebeck three times on the SH-251 round, Phil once on the calibration round). Each stop costs setup + context-loading time that the minion has to redo. Most of those interruptions were not foundational; they were sharpenings.

**Foundational vs non-foundational triggers:**
- **Foundational (DO stop):** the design model under the work has changed. The spec the minion is working against is now wrong. The minion is heading down a path Josh has just realised won't work. Examples: Riebeck's "physics extends to venue, shop, racks" → "racks are not physics" was foundational; the regime spec changed mid-work.
- **Non-foundational (DON'T stop):** Josh names an additional reference, an additional framing, an extra section to add, a clarifying point to weave in. These land as follow-up commits after the minion's current brief is complete. Examples: "also include Oddworld in the painterly references", "also weave in the strategic differentiation frame", "Machinarium fits the calibration too." Add these via follow-up minions or follow-up commits.

**How to apply:**
- When Josh raises a new point mid-task, ask: does this change what the in-flight minion is doing, or does it add to what comes next? If add-to-what-comes-next, queue it for after; let the current minion finish.
- Acknowledge the point in conversation without dispatching; Josh sees the queue forming.
- After the in-flight minion lands and any necessary Battle clears, dispatch the follow-up.
- Multiple follow-ups can batch into one minion if the additions are coherent in scope. Don't dispatch a minion per sentence.
- The Battle / re-Battle rhythm absorbs follow-up commits naturally; reviewers scope-filter to the new diff.

**Carve-out:** in the heat of an active conversation where Josh is actively iterating, the minion's brief may not yet reflect the latest call. If Josh's point lands BEFORE the minion has used a meaningful number of turns, stopping is sometimes still cheaper than queueing. The signal is the minion's tool-use count: a minion at 0-3 turns in is cheap to stop; a minion at 20+ turns is expensive. Default still favours letting them finish.
