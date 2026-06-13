---
name: reference_linear_cycle_archive_one_way
description: "An archived Linear cycle cannot be un-archived: the API has cycleArchive but NO cycleUnarchive, and the docs' restore action omits cycles. Past-cycle visibility is governed forward-only by the auto-archive period, not by un-archiving."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 6e68bffd-7c3f-4cda-81d4-9afc186a3d07
---

A Linear cycle archive is a **one-way door**, unlike an issue ([[reference_linear_unarchive_via_api]]
restores issues via `issueUnarchive`). There is no way to un-archive a cycle:

- The GraphQL schema has `cycleArchive` but **no `cycleUnarchive`** (verified 2026-06-11 against the live
  mutation list: cycleCreate, cycleUpdate, cycleArchive, cycleShiftAll, cycleStartUpcomingCycleToday).
- The docs' "Restore issues" action names only issues, projects, initiatives, NOT cycles.

So a past cycle that auto-archived is gone from the cycle list for good. Data is not lost (its issues and
history are kept, read-only, in the team archive at `G X`), but it cannot return to the Cycles page.

**The only lever is forward.** Past cycles stay in the Cycles page's past-(unarchived)-cycles list until
the **auto-archive period** elapses, then they sweep into the archive. That period lives in Team Settings
> Issue statuses & automations, NOT the Cycles settings page (Cycles only holds cadence + auto-add). To
keep recent previous cycles visible in the list, lengthen the auto-archive period. Josh set it 2026-06-11
because archived cycles were buried and he wanted the previous-cycle list populated.
