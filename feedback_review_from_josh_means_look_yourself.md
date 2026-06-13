---
name: when-josh-says-review-x-look-at-it-yourself-do-not-dispatch-reviewers
description: "Josh saying \"review X\" / \"docs review\" / \"check the PR\" without the word \"battle\" is an alert for ME to read the PR (something there needs my eye), not a trigger to dispatch reviewer agents. Reviewer fan-out only fires on \"battle X\" or an explicit \"fire reviewers\". Triggers any time Josh names a PR with a soft-verb."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Three verbs, three actions:

- **"battle X"** / **"fire reviewers on X"** / **"do it anyway"** on a specific PR: dispatch reviewer agents (per [[feedback_auto_review_and_push]], the battle gate is Josh's verbal go, not a label).
- **"review X"** / **"X review"** / **"look at X"** / **"check X"**: I read the PR myself. Josh is alerting me that something in it needs my eye, often something he has already spotted. No agent dispatch.
- **"reviewed"** (past tense, often one-word): Josh has just reviewed a PR and left comments. Pull the inline comments via `gh api graphql ... reviewThreads` and act on them; do not just check labels and report state. The signal is "I have given feedback; address it."

The default for any soft-verb that does not contain the word "battle" is the self-read path. If unsure, ask before dispatching; an unwanted reviewer fan-out costs a turn and posts comments Josh did not want.

Reinforced 2026-05-16: Josh "docs review" on PR #680. I dispatched devils-advocate; Josh "when i say that im alerting you to look at the pr." Then Josh "reviewed" on PR #682 and I checked labels but not comments; Josh "when i say reviewed look at the comments."
