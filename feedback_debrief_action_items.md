---
name: Debriefs file their action items, not just narrate them
description: Every mission debrief enumerates action items as filed issues or memory-only decisions; nothing load-bearing stays as unstructured prose
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When Gru posts a mission debrief (project status update on Linear), every action item the debrief names gets routed: either filed as a Linear issue (inline link in the debrief body) or explicitly named as "memory-only, no issue" with a reason. Unstructured prose ("service-account work is its own future issue when prioritised") is how action items vanish.

**Why:** Reinforced 2026-04-24 after the Operation Quiet Library debrief named "service-account work for mobile attribution" and `.claude/agents/*.md` Edit gap as future work, but neither became an issue. Josh spotted the gap: "For the debriefs are you doing anything with the action items?" The debrief is a journal of what happened, but action items inside it need to become trackable work or explicitly deferred.

**How to apply:**
- Debrief body includes an **"Action items"** subsection listing every follow-up the mission surfaced.
- Memory-only is the implicit default; do NOT prefix bullets with "Memory-only." Josh, 2026-05-19: "No need to say memory only this is implied." Only flag the exceptions:
  - **Filed**: prefix with `Filed:` and the issue ID + URL inline. Applies the `feedback_auto_issue_verified_sister_findings` rule if it's a Sister finding; otherwise `feedback_confirm_before_tickets` asks Josh first.
  - **Parked**: prefix with `Parked:` plus a park reason and who reopens (usually Josh on a later pass). Use sparingly.
  - Unlabelled bullets are memory-only. If the action ties to a specific memory file, name it inline ("captured in `feedback_X.md`").
- The "Lessons worth carrying forward" section continues to hold the narrative; "Action items" is the structured delta.
- If a debrief has no action items, say so explicitly ("No follow-up issues required.") rather than leave it implicit.
- Applies to mission debriefs on Linear projects, Carnival debriefs, and any cycle-level reflection.
- **When retiring or killing a concept, check for the existing issue first.** If the concept already has a Linear issue (feature, spike, etc.), retiring that issue IS the kill; don't file a new "retire X" issue on top. Only file a fresh issue when the retirement needs distinct follow-up work (doc updates, cross-repo sweeps, signed-off announcements). Reinforced 2026-04-24 after I filed SH-235 to retire the bark system when SH-65 already existed and just needed its state flipped to Retired.
