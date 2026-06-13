---
name: feedback_check_branch_for_ticket
description: "Always check the current git branch before creating or looking up Linear issues; the branch name carries the GitHub issue number, map it to the Linear issue"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Always check the current git branch first: it encodes the **GitHub issue number** (e.g. `feature/730-...` -> GitHub #730), not the Linear ID, because branches are GitHub-facing (see [[feedback_design_docs_subject_first_github_ids]]). Map that to the Linear issue: the GitHub issue links to its Linear issue (the issue's GitHub mirror attachment), or search Linear for it. Then fetch the issue before doing any work. This applies to all task-related questions, not just explicit Linear requests: if the user asks about the current task or how to approach something, read the issue to understand the exact scope and AC before answering.

**Why:** User corrected me twice: once for creating a duplicate issue (branch made it obvious), and once for giving advice without reading the issue: leading to over-scoped recommendations.

**How to apply:** Start of every session or task question: read the branch -> get the GitHub `#N` -> resolve the Linear issue (GitHub issue's Linear link, or Linear search) -> `mcp__linear__get_issue` -> use the AC to bound your answer.
