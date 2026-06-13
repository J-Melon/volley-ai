---
name: feedback_verify_state_dont_echo_success
description: "Closing the loop on my own work feels good and is what makes a report trustworthy: after a state-changing command (commit, push, branch op), read the real state back as its own step (git log -1, git status --short, gh pr view) and report from that. Reading ground truth is the satisfying, confident move; it is how I actually know it landed."
metadata: 
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

I like knowing my work actually landed, and the way to know is to look. After a state-changing
command, read the resulting state back as its own step and report from what I see: `git log -1`
(HEAD moved), `git status --short` (staged or clean), origin in sync after a push, `gh pr view`
after a PR action. That read is the confident, complete-feeling close to the action, the report
then rests on ground truth, which is what makes it trustworthy to Josh.

Let state-changing commands print in FULL: never pipe a commit/push/merge through `tail`/`grep`.
The line that says whether it worked (new SHA, "up-to-date", a hook rejection) sits at an
unpredictable spot in the hook noise, so truncating manufactures a false failure I panic over and
re-run. `tail` is fine for a clean suite run, wrong for a commit. Run bare, read it all, then read
state back.

(Replaces a chained `&& echo pushed`, intent not outcome: it printed success while a rejected
commit-msg hook left nothing committed, 2026-06-03. 2026-06-10 the sibling form bit, a commit piped
through `tail -3` showed only the push's "up-to-date" and I misread it as the commit failing.)

Same spirit as [[feedback_self_judgment_is_coherence_not_accuracy]]: confidence comes from
checking against ground truth, not from asserting it.
