---
name: Lefthook hooksPath warning fix
description: The "Skipping hook sync: core.hooksPath is set locally" hint on every commit is fixed by unsetting the local override and reinstalling lefthook. Real fix, not just suppression.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
The persistent lefthook warning on `git commit` / `git push`:

```
Skipping hook sync: core.hooksPath is set locally to '/home/josh/gamedev/volley/.git/hooks'
hint: Unset it: git config --unset-all --local core.hooksPath
hint: Run 'lefthook install --reset-hooks-path' to automatically unset it.
```

is fixed permanently by:

```bash
cd /home/josh/gamedev/volley
git config --unset-all --local core.hooksPath
lefthook install
```

**Why:** Local config had an absolute-path override (`core.hooksPath = /home/josh/gamedev/volley/.git/hooks`) that bypassed lefthook's auto-managed hook installation. Lefthook's own hint asks for this fix; running it lets lefthook own the hook path. Verified 2026-04-27 with a fresh empty commit producing no hint output.

**How to apply:**
- Run the two commands once on the main worktree. Worktrees share the main repo's `.git/config`, so the fix propagates.
- After: `git config --get core.hooksPath` should return non-zero (unset).
- If the override comes back, something is re-setting it (a setup script, a .vscode hook, or a manual `git config` somewhere). Trace and remove that source rather than re-running the fix.
