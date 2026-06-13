---
name: Linear cycles created before the Tuesday start setting kept Monday boundaries
description: cycles #3 (Cookie Monster) and #4 (Dougal) were created with Mon boundaries despite the team setting being "cycle starts Tuesday"; boundaries had to be manually shifted
type: reference
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
Linear does not retroactively shift cycle boundaries when the team's "cycle start day" setting is applied; existing cycles keep the boundaries they were created with. Observed on 2026-04-20: team setting was already "Tuesday" but cycles #3 and #4 still had Monday 00:00 BST boundaries (Sun 23:00 UTC).

**How to apply:**
- When a team changes or confirms a cycle-start-day setting, manually audit any cycles already created and shift their `startsAt` / `endsAt` to match if needed.
- GraphQL `cycleUpdate` takes `startsAt` / `endsAt` as ISO timestamps; boundary convention is start-inclusive, end-exclusive.
- For 2-week Tuesday-start cycles in BST: `startsAt` = `YYYY-MM-DDT23:00:00Z` on the Monday before, `endsAt` = same time 14 days later (Monday 2 weeks on).
- Check cycle #5 when it auto-generates; if Linear's scheduler respects the Tuesday setting, the shift-on-create problem is limited to #3 and #4.
