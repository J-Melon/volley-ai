---
name: Every rule change also lands in the agent-facing docs
parent: feedback_rule_reconciliation
description: memory alone is not enough; sub-agents and the headless bot read repo docs, so feedback Josh gives must propagate to CLAUDE.md, ai/PARALLEL.md, .claude/agents/, and designs/process/ as appropriate
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
Memory files only apply in sessions where I am the primary agent. Sub-agents (specialist reviewers, Explore agents) and the headless daily-cycle bot never see memory; they only see the repo. Any rule Josh gives that should shape agent behaviour has to land in the repo docs.

**Why:** Rules in memory-only evaporate the moment work is delegated to a sub-agent or the overnight bot. Josh flagged this on 2026-04-20: rules about issue titles, project naming, "no amend / no force", brevity, and so on are all worthless to the agents that actually write most of the commits unless they are also in the repo. The memory is my private notebook; the repo docs are the team handbook.

**How to apply:**
- When saving a memory, ask: does this shape how an agent should act?
- If yes, also update the relevant repo doc in the same session:
  - Issue-writing rules → `designs/process/ticket-writing.md`, `CLAUDE.md` cheat sheet
  - Project/cycle rules → `designs/process/project-management.md`, `designs/process/labels.md`
  - Review rules → `ai/PARALLEL.md`, individual `.claude/agents/*.md`
  - Branch and commit rules → `CONTRIBUTING.md`, `ai/PARALLEL.md`
  - Godot/scene/tooling rules → `CLAUDE.md`
- Open a docs challenge in the same session; do not batch doc sync for later.
- Memory entries pointing to repo docs stay so I know the source location when re-checking.
