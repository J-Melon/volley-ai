---
name: git-status-before-any-debrief-or-done-claim
description: "Before writing a debrief, summary, or \"what landed this session\" prose, run git status and name the working tree state. Implicit \"tree is clean\" is a guess, not a fact."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 692cb0e6-7f69-4b19-83bf-aff85bf6abc0
---

Before any debrief, mission-complete prose, "what landed this session" summary, or wrap-up that implies the work is settled, run `git status` (and `git branch --show-current`) and either name what's dirty or state that the tree is clean. Do not omit the check and let the user discover dirt by asking "did you look at git?"

**Why:** 2026-05-14, end of the Ride SH-403 session. After pushing PR #668, I wrote a multi-paragraph debrief listing open PRs, closed PRs, findings, and Linear status. Josh asked "did you look at the state of git?" and four dirty `.tres` files (Godot drive-by re-serialisation from the playtest) had been sitting there the whole time. The debrief was prose about a state I had not actually inspected.

**How to apply:**
- Any message that summarises a chunk of work as settled (debrief, "we're done with X", "ride passed, here's the result", "PR is up, here's what's next") starts with a `git status` check.
- If the tree is dirty, name the diff and decide: commit it, revert it, or explicitly leave it (with reason) before the rest of the prose.
- If the tree is clean, say so explicitly in the debrief; the line costs one breath and rules out the silent-dirt failure mode.
- The check is cheap. Skipping it is "I assume nothing changed since the last time I looked." That assumption breaks every time a Godot re-import, an editor save, a system reminder, or an agent dispatch lands between checks.
- Complements [[feedback_verify_main_clean_post_merge]] (post-merge audit) and [[feedback_godot_strips_defaults]] (read the diff before crying drive-by).
