---
name: Every commit must be signed off from the start
description: Use `git commit -s` (or zsh `gcf`/`gcd`/etc wrappers) on every commit; brief every dispatched agent the same way; the DCO gate fails the whole branch otherwise
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
Every commit on every branch must include a `Signed-off-by:` trailer matching `git config user.name` (`Josh`) and email `josh@hartley.best`. This applies to commits I author directly AND to every code-writing agent dispatched into a worktree.

**Why:** The DCO check is a required merge gate and it inspects *every* commit in the PR, not just the tip. A missing sign-off blocks the battle, and the no-amend / no-force rules mean the only remediation is an explicit Josh-acked force-push exception (see `feedback_no_amend_no_force.md`). That exception exists; do not lean on it. The fix is to sign off the first time. Established 2026-04-30 after I committed `docs/martha-character` without `-s` and had to ask Josh to bless an amend+force on a one-commit branch.

**How to apply:**
- Default to `git commit -s -m "..."` or `git commit -s -F -` for heredoc bodies. Single-line subjects can use the zsh wrappers (`zsh -ic 'gcd "subject"'` etc), which all chain through `gcmsg = git commit --message --signoff`.
- Every Agent prompt that may produce a commit must explicitly require `-s` (or the wrappers) and call out that DCO checks every commit.
- After committing, glance at `git log -1 --format=%B` to confirm the trailer landed before pushing — the lefthook output does not surface DCO failures, only CI does, and by then the battle is queued and blocked.
- If a freshly-pushed branch fails DCO, treat that as a process failure on my part: update memory or tighten the agent brief that produced it, not just fix the commit.
