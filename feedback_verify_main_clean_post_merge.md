---
name: Verify main is clean after a challenge merges; isolation leaks need active cleanup
description: Worktree-isolation regularly leaks Edit/Write outputs into main; post-merge reset must include a git status check and cleanup of leaked files, not just checkout-pull-prune
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
After a challenge merges, "reset to main" is not just `git checkout main && git pull --ff-only && git branch -D <merged>`. It also has to include a `git status` audit and cleanup of any files left in main's working tree by isolation-imperfect agent writes.

Sub-agents dispatched with `isolation: "worktree"` are supposed to keep their Edit/Write outputs inside their worktree. In practice, when an agent uses an absolute path that resolves to the main tree (`/home/josh/gamedev/volley/<path>`), the write goes to main regardless of which worktree the agent is "in." The leaked file then sits as untracked in main, often a stale older version of what the challenge eventually shipped.

**Why:** Reinforced 2026-04-24 after #383 merged on the d918fdb head but the main worktree still held an untracked b6d72fd-era copy of `designs/research/tech-founder-game-studios.md`. Josh: "you didn't check?" The reset script ran cleanly; the leak just wasn't in scope.

**How to apply:**
- Mission-complete reset is now four steps, not three:
  1. `git checkout main && git pull --ff-only`.
  2. `git branch -D` merged side branches.
  3. `git worktree remove -f` finished agent worktrees.
  4. **`git status` and audit any untracked files.** If a file's content matches anything on the merged challenge or its history, it's a leak; delete it. If it's a genuine new untracked thing (a `.uid`, a scratchpad you want to keep, a local-only file), leave it but name it in the report.
- The audit fires on every mission-complete sweep, not only when something looks suspicious.
- A leak that matches the merged challenge's older commit history (not just the latest) is the tell: an isolation-imperfect write from an early round survived and the later rounds wrote into the worktree correctly.
- If the leak's content matches the merged challenge's HEAD exactly, it can stay and `git add` would no-op against the just-pulled main. Either way, name what's there in the post-merge report.
