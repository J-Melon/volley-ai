---
name: Don't invoke git hooks manually
description: let lefthook/pre-commit fire on git commit; don't run `lefthook run pre-commit` by hand before committing
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Do not run `lefthook run pre-commit --all-files` (or any git hook) manually before committing. The hook fires automatically on `git commit` and runs against staged files; the right scope. Manual `--all-files` runs are wrong scope and redundant work.

**Why:** Hooks exist to fire at the right moment with the right inputs. Running them by hand means (a) wrong file set (`--all-files` vs staged), (b) doubled work, (c) risk of hiding a real commit-time failure behind a passing manual run. The same applies to any hook (post-checkout, commit-msg, etc.).

**How to apply:** After `ggut` passes, just `git commit -s`. If the hook blocks, read the output, fix, re-stage, commit again. Only invoke a hook by hand if debugging the hook itself.
