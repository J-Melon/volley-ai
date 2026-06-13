---
name: Open ready challenges by default, draft only for WIP
description: Open as ready-for-review when the challenge represents finished work. Draft only when more commits are still coming. Merge closes the Linear issue.
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
The Linear / GitHub flow:

1. **Work start, complete commits:** usual swarm case. The agent works, commits, pushes once the job is done. Open the challenge as **ready for review** from the start (`gh pr create`, no `--draft`). Drafting finished work adds a manual flip step for no coordination benefit.
2. **Work start, WIP commits:** exception. If the agent is publishing early to surface in-flight work (long-running spike, pair-dispatch partial output, experiment that wants eyes on direction), open as **draft** (`gh pr create --draft`). Linear's GitHub integration moves the linked issue to In Progress either way.
3. **Ready for review:** if drafted, flip with `gh pr ready <N>` and verify with `gh pr view <N> --json isDraft` per `feedback_verify_pr_ready_flip.md`. Josh's review, including any playtest, happens here.
4. **Merge:** closes the Linear issue (Done).

**Why:** Playtest sits inside the review loop, not after merge. By the time a challenge is ready-for-review and Josh merges it, he has already confirmed the change works. Merging therefore correctly marks the issue Done. Bugs discovered later still get filed as new issues, not status regressions. The draft-by-default habit was over-applied: swarm-dispatched agents usually open the challenge with completed commits, so defaulting to ready saves a step.

**How to apply:**

- Default to ready: `gh pr create`.
- Use `--draft` only when more commits are still coming.
- Dispatch briefs should not hard-wire `--draft`; let the agent pick based on whether the work is complete at push time.
- Linear GitHub integration: challenge open → In Progress, merge → Done; works the same for draft and ready.
- Earlier "merge → In Progress, Josh closes after playtest" memory is superseded by this flow.