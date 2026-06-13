---
name: Say "challenge", not "PR" or "pull request"
description: Volley's vocabulary for a GitHub pull request is "challenge". Use that in chat, comments, and prose. Reserve "PR" for tool/API names where it's literal.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
The thing GitHub calls a pull request is, in Volley's vocabulary, a **challenge**. The whole shipping flow is named: an agent dispatches, opens a challenge, runs the Battle, lands. Saying "PR" instead of "challenge" breaks the metaphor and reads as drift back into generic GitHub talk.

**Why:** Josh caught me using "PR" repeatedly across this session ("PR #597", "the PR", "open PR", "PR description"). Volley is a foddian volleyball game; the vocabulary across the swarm is `challenge`, `Battle`, `Ride`, etc. Calling the artefact a PR loses that.

**How to apply:**

- In chat with Josh, in commit messages, in comment bodies, in challenge descriptions, in agent briefs: say **challenge**.
- Permitted exceptions:
  - Tool and API names: `gh pr create`, `gh pr view`, `pulls/<n>/comments`, GraphQL `pullRequest` field. The literal CLI/API surface stays as it is.
  - Memory entries about CI shape that quote GitHub's own UI labels.
- "Pull request" never appears in prose; it's always "challenge".
- Plurals: "challenges". Status: "the challenge merged" (not "the PR merged").
