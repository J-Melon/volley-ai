---
name: feedback_read_the_pr_branch_not_main
description: "When investigating an open PR's code, read its branch, not main. The fix lives on the feature branch; main shows the pre-merge version. FIRES WHEN I grep/read/sed a file while working an unmerged PR."
metadata: 
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: e0910fdd-689e-4bcd-8083-3ff5d171d14d
---

When I am investigating or sweeping the code of an open PR, I read that PR's BRANCH, with the
working tree checked out on it (or `git show <branch>:<path>`). The PR's changes live on the
feature branch; main carries the pre-merge version, so reading main shows me the OLD code and
sends me hunting things the PR already fixed, or missing a fix that is only on the branch.

Why: 2026-06-10 on #922 I kept the main tree on main and grepped/read files there while the
decouple work lived on `feature/921`. Main showed pre-fix climbs I had already removed, so I
re-investigated handled sites; and I claimed "all climbs gone" off a main read while a real
`get_parent()` shim sat on the branch in the very setter I thought I had cleaned. Josh: "stop
looking at main". The grep was against the wrong tree, the same flat-heap-vs-source error as
[[feedback_descend_the_forest]] pointed at git: go to the surface that actually holds the truth.

How to apply: before grepping/reading a file to judge a PR's state, confirm the tree is on the
PR's branch (or read `git show <branch>:<path>`); a result from main about unmerged work is not
evidence. Pairs with [[feedback_verify_state_dont_echo_success]] (read the real state, not a
recalled one) and the switch-the-tree-back discipline.
