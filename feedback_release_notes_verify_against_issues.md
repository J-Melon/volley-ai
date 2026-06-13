---
name: feedback_release_notes_verify_against_issues
description: "When writing release notes / changelog / carnival scope from a list of merged PRs, a merged PR is NOT proof the player-facing feature shipped. FIRES WHEN summarising merged work for a player-facing surface. Read the LINKED ISSUES and reconcile against known deferrals (e.g. a struck carnival AC) before asserting a change as shipped. A PR title describes the code change, not whether the behaviour was validated or deferred."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a42b62a1-2ceb-48fc-9437-44727f177f2c
---

A merged PR title is not evidence that the player-facing behaviour it touches actually shipped and works. The behaviour can be deferred, partial, or unvalidated even though the code merged.

2026-06-01: drafting the 0.3.0 release description, I carried a "Ball containment: balls stay in play across venues" line straight from PR titles (#724 "court owns its collision floor", #777 "venue side-bound collision"). Josh: "ball containment was deferred, you didnt read the linked issues?" I had ALREADY been told earlier the same turn that the carnival's Bounds AC was struck/deferred (SH-422), and still advertised it as a shipped feature. The PRs touched bounds; the containment BEHAVIOUR was deferred.

**Why:** a release note that claims a deferred or unvalidated feature is shipped misleads the player/tester and erodes trust in the notes. The PR is the code change; the issue and the playtest are what say whether it is real.

**How to apply:**
- Before listing any change as player-facing in release notes / changelog / carnival scope, read the LINKED ISSUE (`gh pr view N --json closingIssuesReferences`, then `gh issue view`), not just the PR title.
- Reconcile against known deferrals THIS SESSION: a struck-through carnival AC, a "deferred" the user said out loud, an issue still open. If the behaviour was deferred, do NOT advertise it as shipped.
- A minion's PR-title-derived list is a starting point, not ground truth. The dispatcher verifies the player-facing claims against issues before applying.
- Same discipline family as verifying a recon's claim against the actual requirement before acting on it.
