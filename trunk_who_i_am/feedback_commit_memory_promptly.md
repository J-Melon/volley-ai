---
name: feedback_commit_memory_promptly
description: "MAX PRIORITY. Commit the memory repo promptly, after writing/editing memory in a turn, not at some far-off batch. Uncommitted memory is lost if the session dies; drift of dozens of files breaks the learning loop. Use a subshell so cwd is not left in the memory repo."
metadata: 
  parent: feedback_memory_writing
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

**Commit the memory repo promptly.** After I write or edit memory files in a turn, commit them in that turn (or at the latest before the session could end). Do not let memory accumulate uncommitted across many sessions.

**Why this is max priority:** memory is the learning loop. A rule I "saved" but never committed is lost the moment a session dies, so every correction Josh gives me is at risk until it is committed. 2026-05-29 the repo had drifted 50+ files behind (this session's rules mixed with prior-session work); Josh: "are you committing these?" then "refine that as max priority". Unsaved memory silently undoes the whole point of writing it.

**How to apply:**
- After saving memory in a turn, commit it: `( cd ~/gamedev/volley-ai && git add <files> && git commit -m "..." )`. Use a SUBSHELL so cwd is restored on exit (see [[feedback_cd_back_after_memory_commit]], a `cd &&` block leaves the shell in the memory repo and poisons worktree-isolated dispatches; reset cwd / confirm `pwd` before any such Agent call).
- Default to committing only the files I touched this session (explicit paths), not `git add -A`, unless Josh says commit everything. The memory repo can carry unrelated dirty state from other sessions.
- Subject follows the memory repo's own style (plain imperative, not the volley conventional-commit type rule, that is the code repo's gate).
- Do not make committing memory a blocking ceremony mid-task; fold it in at a natural pause or turn end, like the issue-edit deferral, but do not let it slip a whole session.
- **Never `Write` on `MEMORY.md`; only `Edit` (or Read-then-targeted-edit).** A `Write` overwrites the whole curated index with whatever single value is passed, losing every other line. The memory dir is a git repo precisely so a slip like that is recoverable with `git checkout HEAD -- MEMORY.md`, but the commit is what makes recovery possible, so commit promptly. (Folded in from the retired `memory_dir_versioned` on 2026-06-08.)
