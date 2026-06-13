---
name: Run Monday Initiative Flip from Claude Code
description: On Mondays, run the Monday Initiative Flip routine from this session; claude.ai scheduled-task sandbox doesn't receive the Linear Projects connector so the automated version can't run
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Every Monday, run the Monday Initiative Flip: post one Linear initiative update per Active initiative for the cycle just ending, when the next cycle starts within 7 days. Otherwise report "No flip this week" and stop.

Routine spec lives with Josh (he was going to add it somewhere). If he hasn't surfaced it by Monday, prompt him for the file or reconstruct from this memory:

- `list_cycles` → confirm next cycle within 7 days, else exit.
- `list_initiatives` Active. For each: pull projects and in-window issues.
- Per initiative, compute velocity (Completed/Closed in window, exclude Cancelled/Retired), inbound (createdAt in window), quiet projects (two cycles silent), foundation check (projects on the `blocks` side of cross-project relations), next-cycle pointer.
- Post via `save_status_update` on the initiative with health On Track / At Risk / Off Track.
- Skip initiatives with a manual update from the last 3 days.
- Public voice, scrum-native terms, no Lair vocabulary (updates surface in Pulse).

**Why:** Josh set up a claude.ai scheduled task for Mondays 05:09 BST with the Linear Projects connector attached. The scheduled-task runtime doesn't inherit the connector; runs mark successful but the agent exits with no MCP access. Until Anthropic closes that gap, this session is the executor. 2026-04-24.

**How to apply:**
- Trigger on first Monday interaction (or when Josh says "run the flip").
- If today is Monday and I haven't mentioned the flip yet in the session, proactively offer to run it.
- Dry-run first (fetch + draft), show Josh, then post on his go-ahead.
- After posting, log which initiatives got updates, which were skipped and why.
