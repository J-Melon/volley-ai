---
name: feedback_synthesize_from_inline_threads
metadata: 
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

Resolve the verdict from the inline PR threads. The agents' direct reports are
supplementary (off-diff findings, confidence, failure modes checked). The inline
comments are the durable record and the source of truth.

**When:** after every reviewer has reported, before deciding the verdict.

**How:**
```
gh api repos/<owner>/<repo>/pulls/<n>/comments --jq '.[] | {author: .user.login, body: .body[0:120], line: .line}'
```

Read the live inline threads. Check each finding's severity against the reviewer
output form: only `issue:` blocks. `suggestion:`, `question:`, `nitpick:` ride
along. Resolve from severity, not from the reviewer's summary tone. A reviewer
who says "ship with named changes" but leaves an `issue:` is still a block.

**The agents' report is the supplement, not the verdict input.** A reviewer
might soften their report to me while their inline findings contain a block. The
threads carry the finding; the report carries off-diff colour. Read the threads
first, skim the reports for anything the threads can't carry.

Josh, 2026-06-08: "on review, you don't really need reports from the agents
direct?". Reinforced 2026-06-22: resolved verdict from agent reports without
reading inline threads.
