---
name: agents-commit-like-team
description: "Each code-writing agent commits its own work from its worktree and the review happens in the challenge, never locally. A 'ready for your review' handoff that is not a PR does not exist. Commit shape lives in the commits skill."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_battle_review_process
  originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---

Swarm agents behave like team members: each code-writing agent produces its own commits in its worktree, and the review happens in the challenge, not locally. Josh does not read file diffs on disk; he reads the challenge in GitHub. Any "ready for your review" handoff must land as a challenge or it does not exist. When agents finish, the organiser pushes a branch and opens a challenge; that challenge is the review surface, where every reviewer fires on the same artefact Josh is reading.

Per-agent commits give a readable history and surface which agent produced each change, which matters when one agent's outputs keep needing rework. The merge is Josh-only; agents never merge ([[feedback_no_auto_merge_manual_approval]]).

The commit shape itself (DCO sign-off, role in the `Agent-Role` trailer, bare conventional subject, no squash-before-merge) lives in the `commits` skill (`.claude/skills/commits/SKILL.md`), which is the authority. Flagged 2026-04-21.
