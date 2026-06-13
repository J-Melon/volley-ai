---
name: Josh's git aliases (oh-my-zsh)
description: use oh-my-zsh git plugin aliases in Bash commands instead of spelling out full git invocations
type: reference
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Josh uses the oh-my-zsh git plugin. Prefer these aliases over long-form git in Bash tool calls; they're faster to read in the log and they match his muscle memory.

**Workflow essentials:**
- `gcb <name>`; `git checkout -b` (new branch)
- `gst`; `git status`
- `gaa`; `git add --all`
- `gcas -m "msg"`; `git commit --all --signoff -m ...` (commit with DCO signoff, stages tracked changes)
- `gcasm -m "msg"`; same with inline message flag
- `gp`; `git push`
- `gpsup`; `git push --set-upstream origin <current-branch>` (first push of a new branch)

**Status / inspection:**
- `glog` / `gloga`; pretty log variants
- `gd`; `git diff`
- `gds`; `git diff --staged`

**Less common (use with care):**
- `gc!`; `git commit --verbose --amend`
- `gcfu`; `git commit --fixup`

**Conventional-commit helpers (shell functions, not aliases; invisible to `alias` grep):**
- `gcf "msg"` → `git commit -s -m "feat: msg"`
- `gcx "msg"` → `git commit -s -m "fix: msg"`
- `gcd "msg"` → `git commit -s -m "docs: msg"`
- `gcr "msg"` → `git commit -s -m "refactor: msg"`
- `gct "msg"` → `git commit -s -m "test: msg"`
- `gch "msg"` → `git commit -s -m "chore: msg"`

All route through `_gcmsg_cc` and include `--signoff` automatically. Prefer these for single-line conventional commits over raw `git commit -s`. For multi-line bodies, fall back to `git commit -s -m "..." -m "body"` or the heredoc form.

**How to apply:** When invoking git from the Bash tool, prefer the alias form. Still use `-s` flag explicitly when using raw `git commit` for DCO compliance; `gcas`/`gcasm` already include `--signoff`.
