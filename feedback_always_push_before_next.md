---
name: feedback_always_push_before_next
description: "Commit and push the current finished piece before moving on to the next; don't let changes pile up uncommitted or unpushed across tasks, and don't keep asking \"commit or continue\"."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5f05a52d-00d0-4a9c-a342-9027c165d0ba
---

When a discrete piece of work lands (a doc section, an item's level set, a fix), commit and push it before starting the next piece. Default to pushing, not batching.

**Why:** 2026-05-27, during SH-439 item-design work. I kept letting changes accumulate and asking "commit/push or continue?" each time. Josh: "always push first." Pushing each finished unit keeps the PR current, avoids tangling unrelated work, and means nothing is lost.

**How to apply:** finish a unit, commit it (signed off, bare conventional subject, Co-Authored-By trailer), push, then move on, without asking permission each time. Pairs with [[feedback_always_signoff_commits]], [[feedback_commit_message_format]], and [[feedback_enable_automerge_on_pr_open]].
