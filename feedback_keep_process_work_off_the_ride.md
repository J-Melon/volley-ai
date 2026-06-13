---
name: feedback_keep_process_work_off_the_ride
description: "A Ride/bug-pass mission carries only its bug fixes; process, CI, and style/doc work each get their own ticket, never bundled under the Ride's umbrella"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 09ad4ebe-d897-41c7-a7df-7f8c47b9d4bb
---

A Ride or bug-pass mission carries **only the bug fixes that serve its acceptance criteria**. Process docs, CI gates, and style/lint work do not belong under the Ride even when they land in the same session; each gets its own ticket and ships on its own.

**Why:** 2026-05-29, Anteater 2 (SH-434) debrief. Seven PRs landed across the session and got read as one mission. Three of them (#786 commit-msg signoff gate, #787 refactor-as-you-go process doc, #788 STYLE.md tic) are unrelated to the item-lifecycle bug the Ride verifies. Bundling them under the Ride is scope sprawl: it inflates the mission's apparent size, blurs what the Ride actually verified, and mixes player-facing fixes with tooling that has no playtest.

**How to apply:**
- When filing or grouping work under a Ride, ask whether each PR serves the Ride's AC. If it does not, it is a separate ticket, not part of the mission.
- In a debrief, scope the mission to the bug fixes plus the Ride itself; note process/CI/style work separately rather than folding it into the mission footprint.
- This is the scope-discipline sibling of [[feedback_extract_with_feature_not_after]] and [[feedback_ride_definition_and_lifecycle]]: the Ride verifies a bug bundle, not a session's worth of mixed work.
