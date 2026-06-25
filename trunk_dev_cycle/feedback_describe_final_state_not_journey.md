---
name: commit-messages-pr-bodies-and-replies-describe-the-final-state-not-the-journey
description: "Reader has no context; describe the final state of the diff, not earlier attempts or removals. Name what the change does, not what it stops doing."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_write_from_the_players_experience
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

Commit messages, PR bodies, and review-thread replies describe the FINAL state of the diff: what changed, not what was tried, removed, or reverted along the way. The reader (future-Josh, an external contributor) has no context from the live conversation; they read the merged surface, and the merged commit's message is what survives for the person reading `git log` in three months.

**Why:** 2026-05-24 on #727 my commits said "tree walk replaced", "drops the tree-walked variant", "removes the tree walk". That walk lived for one commit before replacement; no one reading merged history needs it. Josh: "don't mention stuff you took out like tree walking, you have to think of the reader with no context".

**How to apply:**

- Name what the change DOES, not what it stops doing. "Venue injects rally-gate refs into dev panel" beats "Replaces tree walk with direct injection".
- Replies cite the fix SHA and the new behaviour, not earlier attempts or apologies for prior rounds.
- The exception is a commit that genuinely removes a feature: "remove dead OUT_HELD path" is honest because the removal IS the change.

Cross-link: [[feedback_commit_message_format]], [[feedback_state_positive_shape]] (describe what is, not what isn't).
