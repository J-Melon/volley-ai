---
name: Josh's signed-off commit aliases
description: How to invoke Josh's `gcf` / `gcx` / etc. conventional-commit wrappers from the Bash tool so commits sign off correctly without typing `git commit -s -m`
type: reference
originSessionId: dfb51429-dfc0-47c3-890d-afd0f8559c9a
---
Josh's `~/.zshrc` defines wrappers around `git commit --signoff` for every Conventional Commit type. They live in zsh interactive mode only; `Bash` tool spawns a non-interactive shell that doesn't source `.zshrc` automatically. Invoke via `zsh -ic '<alias> "<subject>"'` to get the alias.

| Type | Normal | Breaking |
|---|---|---|
| feat | `gcf` | `gcf!` |
| fix | `gcx` | `gcx!` |
| docs | `gcd` | `gcd!` |
| chore | `gch` | `gch!` |
| refactor | `gcr` | `gcr!` |
| test | `gct` | `gct!` |
| ci | `gci` | `gci!` |
| style | `gcst` | `gcst!` |
| perf | `gcpf` | `gcpf!` |
| build | `gcbd` | `gcbd!` |
| revert | `gcv` | `gcv!` |

All chain through `gcmsg` which is `git commit --message --signoff`, so every wrapper sign-offs.

Usage:

```
zsh -ic 'gcf "subject text here"'
zsh -ic 'gcst! "breaking change: removed X"'
```

For multi-line bodies (any commit non-trivial enough to deserve a paragraph), the wrappers only take a single subject. Fall back to:

```
git commit -s -m "type: subject" -m "body paragraph"
```

or heredoc with `git commit -s -F -`.

Avoid `gcs`, `gcp`, `gcb`; those are oh-my-zsh git-plugin aliases for `--gpg-sign`, `cherry-pick`, and `checkout -b` respectively, not commit-type wrappers.
