---
name: No Claude dispatch from PR-triggered GitHub Actions
description: Reviewer and agent dispatch never fires from `pull_request*` triggers; the organiser dispatches manually from the main thread
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Claude Code (reviewer agents, fix agents, any dispatch) must not fire from GitHub Actions workflows triggered by challenge events (`pull_request`, `pull_request_target`, `pull_request_review`, `issue_comment` on a challenge, etc.). Dispatch happens only from the organiser (main Claude thread) on the local machine.

**Why:** Outside contributors' challenges (fork challenges especially) can carry hostile content in challenge body, commit messages, code, or comments. A CI-side Claude job that reads those surfaces is a prompt-injection vector with Josh-level credentials and repo write. The attack surface compounds because `pull_request_target` runs with secrets even on forks.

The organiser dispatching from the local machine still reads challenge content, but the blast radius is a single sub-agent in a sandbox, not a CI job holding the Claude OAuth token and repo permissions.

**How to apply:**

- No `uses: anthropics/claude-code-action@*` in workflows triggered by `pull_request*` events.
- Standing PR-triggered workflows may only do mechanical GitHub API work: strip/apply labels, validate required shape, close / route. Never spawn an LLM.
- If reviewer re-run is wanted after a push, the organiser does it manually when Josh flags the challenge; no CI auto-re-run.
- Fork-challenge review gating becomes irrelevant under this rule (no CI Claude to gate). Issues framed around "gate Claude auto-dispatch on forks" become moot and should be cancelled or reframed.
- `schedule`, `workflow_dispatch`, and `push` triggers for internal branches may dispatch Claude, since they are not reachable by outside contributors.

Supersedes `feedback_review_after_ready.md`, which assumed CI-side dispatch with a ready-flip trigger. Both the ready-flip trigger and the synchronise trigger are now off-limits for Claude.
