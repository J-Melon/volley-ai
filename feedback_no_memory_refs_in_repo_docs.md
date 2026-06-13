---
name: no-memory-references-in-repo-docs-or-code
description: "Memory files (`feedback_X.md`, `~/.claude/projects/.../memory/...`) are private notebook. Repo-tracked docs (`designs/**`, `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`) and code comments NEVER reference them by filename or path. Triggers on typing `feedback_` or `.claude/projects` inside any file the repo tracks. Inline the rule's content in prose instead."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

Repo-tracked surfaces (design docs, tech docs, README, code comments, commit messages, PR descriptions) do not name memory files. Memory is the agent's notebook; the repo is the team's record. Mixing the two leaks internal process metadata into a surface contributors, grant readers, and the public read.

Wrong:

> Prototype-phase Volley follows `feedback_no_save_compat`: no migrations, no shims.

Right:

> Prototype-phase Volley carries no migrations and no compatibility shims. Schema changes wipe dev saves and the team accepts that.

## Where the carve-out applies

The skills under `ai/skills/**` ARE part of the repo but they explicitly mirror memory rules for sub-agents (who do not see memory). They reference memory files in a "Source:" footer as a deliberate pointer. That carve-out is bounded to `ai/skills/**`; design docs, tech docs, public-facing READMEs, code comments do NOT get the carve-out.

## Pre-flight check

Before saving any file under `designs/`, `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`, or any `.gd` / `.tscn` comment: grep the diff for `feedback_` and `.claude/projects`. Hits = inline the content, drop the path.
