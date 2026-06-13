---
name: feedback_synthesize_from_inline_threads
metadata: 
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**Resolve the verdict from the inline PR threads, the durable record, not from the agents' direct reports.** A reviewer's findings live as inline comments anchored to the diff, and that is what I read to synthesize and what I reply to. The dispatcher-report-back-to-me is for the part a reviewer cannot anchor inline: off-diff findings, confidence, the failure modes it checked and cleared. So when I converge the battle, I `gh api .../pulls/<n>/comments` and read the live threads, rather than leaning on the prose each agent narrated to me; the threads are the source of truth, the report is the supplement.

This means the brief can shrink: tell reviewers to post findings inline and report only the verdict plus anything off-diff, instead of a full restatement to me. Less duplicated text, and the PR carries the record either way. Josh, 2026-06-08: "on review, you don't really need reports from the agents direct?".
