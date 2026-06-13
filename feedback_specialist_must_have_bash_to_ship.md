---
name: Specialist must have Bash to ship a PR; otherwise use general-purpose
description: docs-tender and other Read/Edit/Write-only specialists cannot commit, push, or open PRs; pick general-purpose when the unit of work ends with a PR
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When dispatching a minion to ship a PR end-to-end (claim worktree → write/edit → commit → push → open PR → enable auto-merge → dispatch reviewers), confirm the agent type's tool list includes Bash. Several specialists are author-only by design - `docs-tender`, `design-doc-reader`, `Plan`, `Explore`, `pr-describer`, the review specialists when used for review-only - they can read and write files but cannot reach `git`, `gh`, or anything else through a shell.

**Why:** SH-325 dispatched `carl` as a docs-tender to land a docs PR; carl correctly stopped because Read/Edit/Write alone cannot create a branch, commit with `-s`, or open a PR. The dispatch had to be redone with a general-purpose minion, costing a round-trip. The mistake came from picking the narrowest specialist (the right instinct) without checking that the specialist could actually ship.

**How to apply:** Before dispatching, ask: does the unit of work end with a PR open and auto-merge enabled? If yes, the agent type must have Bash. If no specialist matches both the topic and the shipping requirement, dispatch `general-purpose` with a tight brief that names the relevant skill files the minion should preload (e.g. `ai/skills/minions/code-comments.md`, `ai/skills/minions/data-driven.md`, `ai/STYLE.md`). Specialist-narrowness is still preferred when both conditions are met.
