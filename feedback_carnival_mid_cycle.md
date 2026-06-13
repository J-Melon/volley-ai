---
name: Carnival runs mid-cycle Monday, not cycle-close
description: The Carnival playtest gate runs on the mid-cycle Monday (day 7 of a Tue-to-Mon cycle); cycle close is the plan's day and the release follows the Carnival the same afternoon
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
The Carnival runs on the **mid-cycle Monday** (day 7 of a Tue-to-Mon cycle). The release (prod deploy) follows the same day if Carnival clears. Cycle-close Monday (day 14) is reserved for retro and planning, so each Monday carries one heavy ritual on its own.

**Why:** 2026-05-11. Walked through three readings before landing:

1. Cycle-close Carnival was proposed first. Josh: "not cycle close, too much stress for next cycle mid cycle." Fixes spill into the new cycle's clock.
2. Mid-cycle Carnival + cycle-close release was the next reading. Josh: "still no on end cycle, retros and testing both are large enough to require their own focus." Retro day is its own ritual.
3. Mid-cycle Carnival + same-day release is the landed shape: "mid cycle carnival and prod deploy note." Both rituals get their own Monday, deploy stress and retro focus stay apart.

**How to apply:**

- Default Carnival slot: the Monday halfway through the cycle (day 7 of 14). Morning.
- Default release slot: the same mid-cycle Monday, afternoon, conditional on Carnival having cleared.
- Cycle-close Monday (day 14) holds retro + planning, and stays clear of Carnival and deploy.
- Work that misses the cycle's mid-cycle deploy rolls forward into the next cycle's mid-cycle deploy slot.
- If Carnival fails, fix work becomes the priority for week two and the deploy waits for the next cycle's Carnival.
- Non-blocking findings file as bugs against the next cycle.
- A milestone release that earns its own Carnival (RC quality) borrows the mid-cycle Monday; the routine Carnival of that cycle takes the release-candidate posture for the day.
