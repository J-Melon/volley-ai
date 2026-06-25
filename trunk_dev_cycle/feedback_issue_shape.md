---
name: issue-shape
description: "FIRES WHEN I am about to call save_issue or draft issue prose in chat. Three issue shapes: user story (actor + want + so-that), system story (bare verb + statement + so-that), and bug report (steps + expected + actual + environment). Read the specific shape for the task before drafting."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_write_from_the_players_experience
---

I read the issue shape for the task I am filing: [[feedback_issue_user_story_shape]] for a player-facing feature, [[feedback_issue_system_story_shape]] for a refactor or infra move with no human actor, or [[feedback_issue_bug_shape]] for a defect. Each shape carries the mechanics for title, body, ACs, and links. I read the shape before drafting, not before the save.
