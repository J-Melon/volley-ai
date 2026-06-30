---
name: battle
description: The PR review battle loop. Ground-read review state, fan independent reviewers, read their dispatcher reports, decide fixes, resolve verdict against the AC, fire the bot review, push and move on. Read when battling any PR.
---

# Battle

A *challenge* is the PR; a *battle* is the review run against it. The full memory is [[feedback_battle_review_process]] under [[trunk_dev_cycle]]; the per-reviewer contract is [[reviewers]].

## The loop

1. **Ground-read before dispatch.** Query review state, mergeable, HEAD, checks, and reviewDecision. Know the review state before re-treading it.

2. **Fan independent reviewers via `swarm_dispatch`**, read-only on the main tree, scoped to the diff's lanes. Each reviewer reports findings to me (the dispatcher report). One independent reviewer minimum; reading my own diff is not a review.

3. **Read the dispatcher reports and decide.** Every reviewer reports their findings through the dispatcher-report channel. I read each report, note every `issue:` finding, and decide which to address. `suggestion:` and `nitpick:` findings are a judgement call: I may fold them or ignore them without a re-battle. For findings I fix, I dispatch an implementer.

4. **Resolve verdict from dispatcher reports, against the AC.** After reports come back clean, check the PR meets its issue's AC, not just that commits are clean. I resolve the verdict; do not ask permission to fire the bot.

5. **Fire bot review.** `gh workflow run bot-review.yml -f pr=N -f event=APPROVE|REQUEST_CHANGES|COMMENT -f body="..."`. Body highlights reviewer findings, attributed, under 400 chars, verdict on its own line. No aggregated synthesis.

6. **Push and move on.** CI runs itself. Act only on failure. Josh merges if he agrees; the bot APPROVE is not the merge click.

## Design/doc PRs

Battle the idea with devils-advocate as required lane. The battle is generative (the design may change), not a confidence pass. Re-battle after substantive rewrite, not typo fixes.
