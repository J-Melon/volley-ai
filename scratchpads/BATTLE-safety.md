# BATTLE-safety.md — swarm-dispatch.js safety/shell/git lens

Reviewer: safety, shell injection, git correctness
Date: 2026-06-13

---

## F1 — isSceneWork gates on LABEL, not TASK (BLOCK)

Line 304-306 / line 309:
```js
function isSceneWork(label) {
  return /\.tscn|\.tres|scene|node_ops|build_scene/i.test(label)
}
// ...
if (isSceneWork(label)) { return { error: ... } }
```

The guard only tests `m.label` (e.g. "SH-254"), not `m.task` (the full brief).
A dispatching model or prompt-injected content can set label="SH-254" and
task="Edit scenes/Main.tscn to add the player node" — the regex misses it,
the worktree is created, and GodotIQ writes land in main anyway. The protection
the scope doc calls a HARD RULE is bypassed without any exploit, just normal
use. Real fix: also test m.task, or check the agent id for scene-lane agents.

---

## F2 — removeWorktree checks uncommitted changes but NOT unmerged commits (BLOCK)

Lines 329-337:
```js
const status = await $`git -C ${path} status --porcelain`.quiet().text()
if (status.trim()) return `SKIPPED ${path}: uncommitted changes present`
await $`git -C ${mainTree} worktree remove ${path}`.quiet()
```

`git status --porcelain` is empty once a minion has committed its work but not
yet merged. If the dispatcher calls swarm_cleanup before the branch is landed,
the check passes (clean working tree), the worktree is removed, and committed-
but-unmerged work is silently destroyed. The scope doc says "Never auto-remove
an unmerged worktree with uncommitted work" — but the guard doesn't cover
committed-unmerged. Fix: also check `git log main..HEAD --oneline` (or
`git branch --merged main`) before removing.

---

## F3 — codename path traversal via pool-exhausted fallback (LOW / monitor)

Line 57-58:
```js
return `${role}-${index + 1}`
```

When the codename pool is exhausted, fallback is `${role}-${index+1}` where
`role` is `m.agent` from tool args (attacker-influencable). If role contains
`../` or a shell-special character, it feeds into:

Line 318: `const path = \`${mainTree}/../volley-${codename.toLowerCase()}\``
Line 321: `await $\`git -C ${mainTree} worktree add ${path} -b ${branch}\``

Bun's `$` tagged template passes each interpolation as a distinct argv element,
so shell word-splitting / metacharacter injection (`;`, `|`, `$()`) is NOT a
risk — Bun shells each interpolation as a literal arg. However PATH TRAVERSAL
is still possible: role="../../etc/cron.d/evil" -> path becomes
`/home/josh/gamedev/volley-ai/../../../etc/cron.d/evil-1` which resolves
outside the repo tree. Git would reject creating a worktree there (permissions),
but the attempt is made. Low severity given git's own path checks, but the
codename pool (lines 19-32) is large enough (30 names) that exhaustion only
occurs if someone dispatches 31+ minions in one fan-out — unlikely normal use.
Recommend clamping role to `[a-z0-9-]+` before use in the fallback.

---

## F4 — slug sanitization is solid (pass)

Line 317:
```js
const slug = String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
```

`label` is fully sanitized before use in `branch`. Any attacker-controlled
label value is collapsed to `[a-z0-9-]+`. The branch string fed to
`git -C ${mainTree} worktree add ${path} -b ${branch}` via Bun `$` is safe.

---

## F5 — auto-merge: confirmed absent (pass)

Searched all paths:
- `session.prompt` is called fire-and-forget on the minion (line 153-159). The
  body is the minion's task brief, not a merge command.
- No `gh pr merge`, no `git merge`, no merge-related shell command anywhere.
- The event handler (lines 280-296) only marks `done` and launches queued minions.
- The scope doc explicitly states "plugin does NOT auto-merge" (scope line 94).
  No code path contradicts this. The maintainer-merge rule is respected.

---

## F6 — worktree path collisions (LOW / accepted risk)

Path is `${mainTree}/../volley-${codename.toLowerCase()}` where codename comes
from the themed pool (unique per in-flight swarm, per dispatcher). Two
SEPARATE dispatchers (different sessions) could both pick "Dipper" if their
usedNames sets are independent (they are — each swarm is keyed by dispatcherID,
line 42-48). Two concurrent swarms could both try to create `volley-dipper`.
The `git worktree add` would fail on the second attempt (path already exists),
which is caught and surfaced as an error (line 323). No silent clobber — git
rejects it. Acceptable behavior, but the error message could be clearer.

---

## Summary

BLOCK on F1 (isSceneWork wrong field) and F2 (removeWorktree misses unmerged commits).
F3 is a monitor-level path-traversal via pool-exhaust fallback (low severity given
git's own guards). F4, F5, F6 are clean or acceptable.
