---
name: feedback_volley_hooks_are_project_level
description: "Volley hooks live PROJECT-level in .claude/ (committed), not in global ~/.claude/. The 12 global duplicates were deleted 2026-06-01 (they double-fired with the project copies from PR"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7460bcf3-84f2-4194-aacc-5b3b4e4e63cd
---

Volley's rule-enforcement hooks are PROJECT-level: scripts in `.claude/hooks/`, wired in `.claude/settings.json`, committed to the repo (PR #805 versioned them in). The global `~/.claude/settings.json` and `~/.claude/hooks/` previously held DUPLICATE copies of all 12, so every Volley hook fired twice and editing one copy left the other firing (this caused real confusion: I unwired the global isolation hook, the project copy kept denying, and I confabulated "different session, hook came back").

Cleaned 2026-06-01: deleted the 12 global hook scripts and removed their wiring from `~/.claude/settings.json`. Global now keeps only genuinely-global config (env, permissions, worktree baseRef, statusline, effort). Backup at `~/.claude/settings.json.bak-*`.

**How to apply:**
- New Volley hooks go in `.claude/hooks/` + `.claude/settings.json` (project, committed, own PR), never global.
- When reasoning about which hook fires, the answer is the PROJECT copy. Do not assume a global copy; verify with `grep <hook> .claude/settings.json`.
- A settings change to the LIVE global file applies on next session restart, not mid-session (the running session loaded config at start). Project hooks are active regardless.
- The project hooks live in `.claude/settings.json` and `.claude/hooks/`; grep there for the current set rather than trusting a list here (it drifts as hooks are added and retired).
Pairs with [[project_worktree_reconciliation_parked]] (the project isolation hook is the live one).
