---
name: Pass Linear status by ID, not by name; fuzzy-match collides Completed and Closed
description: Volley's Shuck team has separate `Completed` (work merged) and `Closed` (mission terminal) statuses; passing `state: "Completed"` by name fuzzy-matches to `Closed` and skips the intermediate state
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
When flipping a Linear issue's status, pass the **status ID** rather than the name. Volley's Shuck team has two completed-type statuses, and the API's name-based fuzzy match can pick the wrong one.

**Status IDs (Shuck team, 2026-04-28):**
- Triage: `cdf77f16-d947-4aea-b1f9-de1e8073e2fa`
- Vault: `d41fb73e-32af-40b2-a7e5-5052900ab0fc`
- Ready: `3db79f36-2f0e-4952-91fe-dea458d1a69f`
- Dispatched: `671b8c1c-7337-4a4a-a48d-4806706fa4b5`
- Challenged: `a2547b77-a928-4d91-afeb-129b990d5480`
- **Completed**: `07c11470-64f6-41b8-87f6-26245d055b08` (work merged, timer stops)
- **Closed**: `8e7da1c7-dda3-4bcf-a023-fb71f0fdeda5` (mission terminal, after debrief)
- Retired: `f1623898-f526-4f81-a361-91f7440c3774` (cancelled)

**Why:** SH-313 / SH-307 / SH-311 all needed Dispatched → Completed flips after #506 + #526 merged. I passed `state: "Completed"` and got `status: "Closed"` back; the API's loose match took the first completed-type status alphabetically (Closed < Completed). Closed means "mission debriefed, terminal", which the work was not yet at. Caught and fixed in the same turn but the slip is silent if not verified.

**How to apply:**
- For status flips on the Shuck team, always pass the status ID via `mcp__linear__save_issue` `state` field.
- Re-fetch the team's statuses with `list_issue_statuses` if any get added or renamed; this list is authoritative against the API at the time of writing.
- After any save_issue call that flips status, verify the response's `status.name` matches the intended one. Don't assume the name input got the right state.
- The names "Closed" and "Completed" both have `statusType: "completed"`, which is why the type-based filter in any helper code will conflate them. The id is the only reliable disambiguator.
