---
name: new-issues-fold-or-next-cycle-unless-complete
description: "Only file a new Linear issue when the work can't be covered by the current/existing issue. A new issue goes into the next cycle, never the current/active cycle, unless its work is already complete (then current cycle). Triggers on every save_issue/issueCreate. Josh promotes issues into the active cycle himself."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 07114971-0755-4628-bfe9-5c815fd107cc
---

Two gates, one before filing and one on placement.

**1. Only if it can't be folded.** Create a new issue only when the work genuinely cannot be covered by the current in-flight issue or PR. A bug or follow-up that fits the current issue's scope or AC folds into that PR instead (see [[dont-file-bug-tickets-that-block-the-current-feature-ac-fold-them-in]]). Under-30-minute work is done inline, not ticketed. Confirm with Josh before filing; he owns backlog shape (see [[Confirm before creating Linear issues]]).

**2. Never bring an issue into the active cycle without Josh's express permission.** (Josh, 2026-05-29.) The active cycle is committed scope; cycle membership is Josh's call alone, not a default I apply. A new issue defaults to the **next** cycle, never the current/active one. Beginning work on an issue does not move it into the active cycle; Josh promotes it himself. This holds even for a Ride successor filed to Ready: Ready is the status, but the cycle is still Josh's to grant.

Watch the auto-assignment: `issueCreate` with a project can land the issue in a cycle automatically (SH-457 auto-landed in cycle 6, the *next* cycle, on filing). That was harmless because it was not the active cycle, but it was not chosen by Josh either. After filing, check `issue.cycle`; if it auto-landed in the **active** cycle, pull it out and surface it. Never leave an issue in the active cycle that Josh did not put there.

## How to apply

- Query cycles; the next cycle is the lowest-numbered cycle whose `startsAt` (or `endsAt`, if it is the latest) is in the future. Pass its `id` as `cycleId`.
- Completed-work issue: use the current/active cycle's `id` instead.
- State, label, assignee, and the Triage-default trap: [[feedback_new_issue_create_fields]].
- Josh's redirects ("active cycle", "Vault", "no cycle") override the default; apply it without asking, surface only the unusual.
