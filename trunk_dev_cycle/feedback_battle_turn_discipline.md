---
name: Battle turn discipline: dispatch, end turn, carry incomplete reviews
description: "After dispatching reviewers for a PR battle, end the turn. Minion reports surface through the session harness when each finishes. A report without a verdict section is the complete report; the minion stopped. Carry that review surface yourself. Ground every PR-state claim with a live gh read before stating it."
metadata:
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: current
---

**Dispatch, then end the turn.** After fanning out reviewers via `swarm_dispatch`, stop. The session harness delivers each minion's report when it finishes; the reports land naturally at the turn boundary. The gap between dispatch and report is capacity for small as-we-go work, not for status polling.

**A minion report is complete when it arrives.** If a report ends with an "In Progress" heading or lacks a verdict section, the minion finished its session at that point; it did not error, it stopped. Verify once that the file on disk contains no further content, then carry that review surface yourself. Do not wait for a verdict that will never arrive.

**Ground every claim with a live read.** Before stating a PR's merge state, CI status, or review count in a verdict or to Josh, run the live `gh` query. Never carry state from memory across turns; the hydrate hook exists because memory is wrong more often than the check.

**Fix discovered issues, then fire the bot review.** Post findings inline at the relevant `path:line`. Push fixes, verify CI resolves, then fire the bot review naming the resolved SHA.

**Why:** 2026-06-15 on #973: after dispatching 4 reviewers, I polled `swarm_status` twice in 20 seconds, read mid-progress reports as if they might update, and shared observations from incomplete reports as if they held. 3 of 4 minions produced reports with no verdict; I treated them as "still running" rather than finished. Josh: "add to memory to end turns instead of constant checks" and "they didnt error, they finished with that mid report report." The hydrate hook also caught me claiming PR state without a live `gh` read.
