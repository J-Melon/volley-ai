---
name: never-switch-the-main-worktree-branch-while-an-implementer-is-running-in-it
description: "When a gdscript-implementer or other code-writing agent is dispatched to the main worktree (background, no isolation), DO NOT switch the worktree's branch until they complete. Their in-flight edits get autostashed, their dispatch is silently broken, and recovery costs a full re-run. Triggers any time I am about to `git checkout <branch>` in the main worktree."
metadata: 
  parent: feedback_inflight
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Agents dispatched without worktree isolation run inside the main worktree's checked-out branch. They read, write, and validate against that working tree. When the parent thread does `git checkout <other-branch>` mid-dispatch, git autostashes the agent's modifications and silently swaps the file contents underneath them. The agent's next read sees the wrong code; their next write commits to the wrong branch (or fails on conflicts); their validation runs against the wrong codebase.

SH-405 incident on 2026-05-16: I dispatched Leela (gdscript-implementer) to the main worktree for the paddle-resize fix on `feature/sh-405-equip-flow-kit-cap`. Mid-dispatch I cut a separate fix branch off main (`fix/commit-shape-bare-conventional`) to fix the commit-shape skill doc, ran two commits there, and switched back. Leela's seven in-flight file edits ended up in `stash@{0}` titled "leela wip", her dispatch was effectively broken, and her final report had to escalate without committing.

## How to apply

When a code-writing agent is in flight in the main worktree:

- Do NOT `git checkout <other-branch>` in the main worktree until the agent's completion notification fires.
- If unrelated work absolutely must happen during the dispatch, cut the branch in a **separate worktree** (`git worktree add ../volley-tmp <branch>`) and work there. Clean up with `git worktree remove ../volley-tmp` after.
- If the agent dispatch is short (a small fix), batch the unrelated branch work either before dispatch or after the agent's notification.
- The check before any `git checkout`: "is there a background agent task running that touches this worktree?" Yes -> add worktree elsewhere. No -> switch is safe.

Agents dispatched with `isolation: "worktree"` are immune to this; the parent's main-worktree state does not affect their dedicated worktree. Use isolation for any agent whose work is independent of the parent's open files.

Reinforced 2026-05-16: lost a Leela dispatch on SH-405 to a mid-dispatch branch switch for an unrelated skill-doc fix.

Reinforced 2026-05-24 on PR #715 battle: Slartibartfast and Eddie were running in the main worktree (background, no isolation, reviewer-pool not code-writing). I switched the main worktree from feature/sh-423-outline-rework to main to docs/dandori-is-impl-plan to do unrelated doc work, and `git add -A` picked up the SH-423 files that hadn't cleaned out of the worktree on the switch. The commit landed with 17 files instead of 3 and had to be force-deleted and redone in a separate worktree. The trigger extends past code-writing agents: any background agent that read or relies on the worktree state counts.
