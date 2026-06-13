---
name: Battle gate is Josh's go, not a label
description: the zaphod-requested label is retired; battle starts on Josh's explicit go (the word "battle" or any dispatch instruction), never auto on PR open
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
PRs are not battled on open. Battle (reviewer / devils-advocate / runtime-verifier dispatch) starts on **Josh's explicit go**, never sooner and never automatically.

**The `zaphod-requested` label is retired (Josh, 2026-05-29: "we don't use labels for that anymore").** Do not wait for a label, do not ask Josh to add one, do not check for one. The trigger is his word.

**Why:** Auto-battle on every open generated noise on PRs Josh wanted to settle himself first. The label was the original "ready, fire" signal (2026-05-15) but has been dropped; the verbal go now carries the gate alone.

**How to apply:**
- After `gh pr create`, stop. Report the PR URL to Josh; do not dispatch reviewers until he says go.
- The trigger is any explicit instruction to battle/review a specific PR: "battle it", "fire reviewers", "go ahead", "do it anyway". Dispatch immediately.
- Mechanical author-side fixes (lint, hook failures, obvious gaps) are still fine before the go; that is iteration, not battle.
- **Bare "battle" (no PR argument)** means battle the open PR(s) in play. With one PR in context, battle that one. With several open and ambiguous, `gh pr list --state open` and confirm scope rather than guessing. (Historically the label was the queue; with no label, the conversation's PR is the default and Josh names the set if it is broader.)
- Run the battle per [[feedback_battle_review_process]]: ground-read including review state, dispatch reviewers scoped to the diff lanes (background), converge, resolve the verdict myself, fire the volley-reviewer bot without asking, push and move on (CI calls back only on a failure), Josh merges.
