---
name: don-t-interleave-github-web-ui-edits-with-an-agent-s-commit-stream
description: "Browser-editor commits break DCO (no Signed-off-by), author as \"Josh Hartley\" not \"Josh\", and carry empty bodies with \"Update <file>\" subjects. On a branch an agent is also committing to, this splits identity and signoff and fails the DCO gate. Edit locally or let the agent apply the change."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1b0280e9-e78a-4812-a304-329bd94888e4
---

GitHub web-UI commits skip every discipline the terminal path enforces: no `Signed-off-by` trailer (DCO fails: "N commit(s) missing Signed-off-by"), author as display-name "Josh Hartley <josh@hartley.best>" rather than the agent path's "Josh", and the editor default "Update <file>.md" subject with an empty body (no rationale, breaks conventional-commit + "decisions not deliberation").

**Why:** On SH-436 / PR #745 (2026-05-26), four web-UI commits (`9336ed8d`, `f25573be`, `033d2cab`, `f2339e31`) interleaved with the agent's signed commits. DCO went red and the branch carried two author identities. The PR merged anyway only because DCO is not a required check, which is its own gap. The renames Josh made in the browser (tier→consolidation, etc.) also landed in commits the reviewer never re-verified.

**How to apply:** When work on a branch is mid-flight under an agent, make doc tweaks through the agent (tell it the change) or pull the branch and edit locally with `git commit -s`. If browser edits already happened, `git rebase --signoff` before requesting merge. Don't assume the merge queue re-checks signoff: DCO runs on `pull_request` only, not `merge_group`. Related: [[feedback_always_signoff_commits]], [[reference_github_actions_gotchas]].
