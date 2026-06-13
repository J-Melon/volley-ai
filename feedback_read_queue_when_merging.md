---
name: feedback_read_queue_when_merging
description: "Volley's main has a MERGE QUEUE (ruleset rule on main: merge_queue). So a merge is QUEUED, not instant: on merge the PR enters the queue, queue-CI runs, then it lands in order. When Josh says a PR is merging/landing, read state live with gh that turn and expect mergeStateStatus QUEUED -> then merged; do not expect mergedAt to populate immediately, and do not say 'I'll wait' (read it)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Volley's `main` ruleset includes a `merge_queue` rule. A merge therefore goes through the queue:
the PR is queued, the queue runs its CI, and it merges in order, not the instant the button is hit.
So "merging" means "entering the queue".

**A PR merges while we keep working; that branch's job is then done.** This is the normal rhythm,
Josh merges, the queue lands a squash some turns later, and continued work just cuts a fresh branch
off the new main. So when more changes follow a merge, expect to start fresh: pull main, branch,
carry the new change forward. The "Create a pull request for '<branch>'" hint on push is the simple
signal the PR already landed (a quick `gh pr view <n> --json state` confirms); take it as "this one
shipped, start the next branch," routine, not alarm.

When Josh signals a PR is in motion ("merging", "landing this"), read the actual state that turn
with `gh` and report what the queue is doing, do not say "I'll wait":
`gh pr view <n> --json state,mergeStateStatus,mergedAt` (mergeStateStatus shows `QUEUED` while it
is in the queue, then `state` flips to MERGED), or check `git log origin/main` for the landed
commit. There is no push channel: webhooks/queue events post to a server, not into this session, so
I only learn state by pulling it. For a one-off, read it now; to track across turns, a `/loop` or
`ScheduleWakeup` polls (don't poll faster than the queue actually advances).

Pairs with the pr-mention-state-check Stop hook (a live `gh` read on any PR-state reference) and
[[feedback_verify_state_dont_echo_success]] (read ground truth, don't assert). Sharpened 2026-06-03
after I twice said "I'll wait" instead of reading the queue; Josh: "remember queue?" then "no the
merge queue?".
