---
name: feedback_battle_review_process
description: "The end-to-end PR battle/review loop. Dispatch reviewers, collect their dispatcher reports, resolve a verdict, fire the bot-review, push and move on. Josh's gate is the merge."
metadata: 
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

The full loop for battling and approving a PR. Sub-rules on reviewer output live in
[[feedback_reviewer_output]]; battle depth in [[feedback_battle_is_a_confidence_pass]].
This file is the spine that ties them into a process.

## The loop

1. **Ground-read before dispatch.** Read state, mergeable, HEAD, checks, and reviewDecision.
   Then **fan reviewers** via `swarm_dispatch`, read-only on the main tree, scoped to the
   diff's lanes. Each reviewer reports findings to me (the dispatcher report), not to the PR.
   A direct "battle X" from Josh is the trigger.

2. **Read the dispatcher reports and decide.** Every reviewer reports their findings
   through the dispatcher-report channel. I read each report, note every `issue:` finding,
   and decide which to address. `suggestion:` and `nitpick:` findings are a judgement call:
   I may fold them or ignore them without a re-battle.

3. **Dispatch fixes, not re-battles.** For findings I decide to fix, I dispatch an
   implementer. Push the fix, then re-battle only the fixed diff with the blocked
   reviewer. A clean re-battle returns approve; I fire the verdict.

4. **Resolve the verdict against the AC.** After reviewers report clean, I check the PR
   meets its issue's AC. A bug found later that means the PR cannot meet its AC is
   unfinished work that folds into the same PR.

5. **Fire the bot review.** `gh workflow run bot-review.yml -f pr=N -f event=APPROVE|REQUEST_CHANGES -f body="..."`. The body highlights findings with reviewer attribution. Keep it under 400 chars.

6. **Push and move on.** CI runs itself. Act only on failure. The decision is Josh's: he
   merges if he agrees. No auto-merge.

## Bot-review body shape

Short, attributed, under 400 chars. The verdict on its own line. No aggregated synthesis
paragraph. Shape:

```
**code-quality:** clean.
**signals-lifecycle:** clean.

Verdict: **approve**.
```
