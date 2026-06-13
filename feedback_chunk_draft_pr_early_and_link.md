---
name: feedback_chunk_draft_pr_early_and_link
description: "FIRES WHEN starting a new chunk of a chunked multi-PR effort. Open the chunk's DRAFT PR early (after the first commit, not at chunk end) and LINK it to the ticket immediately (GraphQL attachmentLinkGitHubPR, linkKind contributes for a multi-PR issue). The link from the start keeps the ticket reflecting in-flight work and accumulates the per-chunk trail; waiting until the chunk is done leaves the ticket looking idle."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

For chunked work (one ticket, several PRs), each chunk gets its DRAFT PR opened early, right after
the first commit lands on the fresh branch, and linked to the ticket the same turn. Do not treat
"open the PR" as an end-of-chunk step.

- Branch: `feature/<gh-number>-...-N` for chunk N is fine, a chunk increment is legible and is NOT
  the parked area-iteration "2" naming (different thing).
- Link via GraphQL `attachmentLinkGitHubPR` with `linkKind: contributes` (multi-PR issue; links
  accumulate, never pruned, see [[feedback_branch_name_drives_linear_automove]]).
- The link from the start drives the Shuck PR automations (draft -> Dispatched) and keeps the
  ticket showing the chunk is in flight; the per-chunk attachments are the record of how the work
  progressed.

Josh, 2026-06-03, mid SH-430 chunk 2: "you do need to remember to link it tho with a draft pr."
Pairs with [[feedback_chunked_pr_500_lines]]-style chunking and [[feedback_read_queue_when_merging]].
