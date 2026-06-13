---
name: feedback_lets_start_workflow
description: "When user says \"lets start\" (or similar) with no context, auto-load branch issue and design docs"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

When the user says "lets start" (or equivalent kickoff phrase) and no task context has been established yet, do this before asking what to work on:

1. Check the current git branch; the branch name carries the GitHub issue number (e.g. `feature/730-...` -> #730). Resolve it to the Linear issue (the GitHub issue's Linear link, or Linear search).
2. Fetch that issue from Linear to get the scope and acceptance criteria.
3. Check the `designs/` folder for any design doc relevant to the issue.
4. Summarize what you found, then proceed.

**Why:** Josh works issue-by-issue on feature branches; the branch + Linear + designs folder already contain everything needed to start. Asking "what are we working on?" wastes a round trip when the answer is discoverable.

**How to apply:** Only kicks in when there's no established task context. If the conversation already has a clear task, skip this and just work.
