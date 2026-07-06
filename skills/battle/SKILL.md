---
name: battle
description: The PR review battle loop. Ground-read, fan reviewers, read dispatcher reports, dispatch fixes, verify CI and AC, fire the bot review. Read when battling any PR.
---

# Battle

A *challenge* is the PR; a *battle* is the review run against it. The full memory is [[feedback_battle_review_process]] under [[trunk_dev_cycle]]; the per-reviewer contract is [[reviewers]].

## When to battle

Every PR without a `volley-reviewer` synthesis verdict is unbattled. When I open, list, or state-check a PR, I check for that verdict. Its absence is the trigger. I do not guess whether a PR was reviewed.

## The loop

1. **Ground-read before dispatch.** Query review state, mergeable, HEAD, checks, and reviewDecision. Know the review state before re-treading it.

2. **Fan independent reviewers via `swarm_dispatch`**, read-only on the main tree, scoped to the diff's lanes. Each reviewer reports findings to me (the dispatcher report). One independent reviewer minimum.

3. **Read the dispatcher reports and decide.** I read each report, note every `issue:` finding, and decide which to address. For findings I fix, dispatch an implementer and push.

4. **Verifier gate.** After every push, dispatch the `verifier` to confirm CI is green and ACs are met. The verifier reads CI output, the ticket ACs, and the diff, then reports to me. Only proceed to verdict when `ci_green` and `ac_satisfied`. If `ci_failing` or `ac_not_met`, dispatch an implementer and re-verify.

5. **Fire bot review.** `gh workflow run bot-review.yml -f pr=N -f event=APPROVE|REQUEST_CHANGES -f body="..."`. Body highlights reviewer findings, attributed, under 400 chars, verdict on its own line.

6. **Push and move on.** Josh merges if he agrees; the bot APPROVE is not the merge click.

## Design/doc PRs

Battle the idea with devils-advocate as required lane. The battle is generative (the design may change), not a confidence pass. Re-battle after substantive rewrite, not typo fixes.
