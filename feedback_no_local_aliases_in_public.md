---
name: Don't use local aliases in public surfaces
description: `ggut` and any other Josh-local shell aliases are personal environment. In challenge bodies, commit messages, and repo docs, spell out the actual command or the repo's standard script path.
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Local shell aliases live in Josh's zsh and nowhere else. A new contributor, a CI runner, or an agent in a clean environment will not have `ggut`, `gcf`, `gcx`, etc. Spelling them out in public surfaces leaves readers guessing.

**Where the rule applies:**
- challenge descriptions and comments
- Commit messages
- Repo-tracked docs (`ai/**`, `designs/**`, `.claude/agents/**`, `README.md`, `CONTRIBUTING.md`)
- Issue bodies

**Where the rule does NOT apply:**
- My Bash tool calls in this conversation. Fine to use aliases locally; saves typing, Josh uses them too.
- User memory files that are only Josh-facing.

**Standard replacements for this repo:**
- `ggut` → `./scripts/ci/run_gut.sh` (the repo's CI entry point) or "the GUT test suite" when the exact command isn't the point.
- `gcb` → `git checkout -b` (or note the oh-my-zsh equivalent with "if available").
- `gcf`/`gcx`/`gcd`/`gcr`/`gct`/`gch` → `git commit -s -m "<type>: msg"` with the conventional-commit prefix.

**How to apply:** before hitting `gh pr create` or editing a repo doc, scan the text for anything that looks like a 2-4 letter alias. Expand it. The ai/PARALLEL.md "git aliases and helpers" bullet already models the right pattern (lists aliases with explicit fallback). Follow that model whenever aliases appear in public text.
