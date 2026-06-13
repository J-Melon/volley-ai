---
name: feedback_battle_review_process
description: "the end-to-end PR battle/review loop in Volley, dispatch reviewers, converge, resolve a verdict, fire the volley-reviewer bot; push and move on while CI runs itself, acting only if it fails; Josh's gate is the merge. Consolidates the 2026-05-29 review-process corrections."
metadata: 
  node_type: memory
  type: feedback
  parent: trunk_dev_cycle
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

The full loop for battling and approving a PR. Sub-rules on comment *placement* and *replies* live in [[feedback_review_comment_discipline]] and [[feedback_reply_to_review_comments]]; battle *depth* in [[feedback_battle_is_a_confidence_pass]]; reading both comment surfaces in [[feedback_pr_comments_full_surface]]. This file is the spine that ties them into a process.

## The loop

1. **Ground-read before dispatch, including review state.** The pre-battle `gh` read covers state, mergeable, HEAD, checks AND `reviewDecision` + the per-PR reviews (`gh api .../pulls/<n>/reviews`), not just CI. Skipping reviews means battling a PR that may already carry an approval; and because stale approvals do not auto-dismiss at `required_approving_review_count: 0` (see the bot-review note below), a PR can show an active bot APPROVE on an old SHA. Know the review state before re-treading it. Then **dispatch reviewers** scoped to the diff's lanes (code-quality, signals-lifecycle, save-format-warden, test-coverage, godot-scene, docs-and-writing, ci-and-workflows, style-warden as fits), background (always `run_in_background: true`), against the live HEAD. A direct "battle X" from Josh is the trigger; findings go inline per [[feedback_review_comment_discipline]].
2. **Converge.** After a round or two with findings addressed and CI green, another battle surfaces nothing new, it just spins. Do NOT re-battle a converged PR; that is churn dressed as diligence. Re-battle only if a change is substantive enough to plausibly introduce NEW findings (a real feature change, not a mechanical fix or a type narrow), or if Josh asks. Once converged, the bottleneck is a decision, not more review signal.

   Whether to re-battle at all (material vs mechanical push) is [[feedback_re_fan_only_on_scope_change]]. **If you do re-battle, scope it to the NEW change, not the whole PR:** choose reviewers by what the new commit touches (drop lenses whose surface didn't change, e.g. save-format-warden when no persisted shape moved; add one if the new commit enters its lane) and point each at the new commit's diff range (`git diff <prev>..<new>`), not `main...HEAD`. Re-reviewing the already-cleared parts is the same churn. A persisted-shape reviewer re-enters only if the fix actually changes what is serialized.
3. **Resolve the verdict myself, against the AC, not just the commits.** I (the organiser) resolve reviewer consensus into approve / request-changes / comment. This is mine to call as advisor, do NOT ask permission to fire the bot; asking defeats the automation. (Pause only if the verdict itself is genuinely undecided.) **Before approving, check the PR actually meets its issue's AC**, not merely that the commits it contains are clean. A bug found later that means the PR can't meet its own AC is not a follow-up ticket; it is unfinished work that folds into the same PR, and it means an earlier APPROVE was premature. 2026-05-29: I bot-approved #778 (SH-412), then #691 surfaced (held effect not removed until drop) which is exactly SH-412's AC; Josh: "the reason it [folds in] is because without we cant meet the ac". Reviewers checked the commits were clean; none checked the AC was met. The fix folds in and the PR re-battles.
4. **Fire the bot review.** `gh workflow run bot-review.yml -f pr=N -f event=APPROVE|REQUEST_CHANGES|COMMENT -f body="..."`. Posts as `volley-reviewer[bot]`, a distinct identity, so its APPROVE is a real approving review (not self-approval, the bot did not author the PR). Trigger is workflow_dispatch only (CI never runs Claude on pull_request events, injection surface).
5. **Push and move on; CI calls me back only if it fails.** After a push my attention goes to the next piece of work. CI runs itself, and the merge queue plus the maintainer own the path to green; a passing or pending run is theirs to carry, so I leave it alone and stay on the work in front of me. A FAILURE is the one CI event that is mine, and I act on it when it lands. I read CI state once when a claim genuinely needs grounding (a hydrate before I say something about the PR), then return to the work. Josh, 2026-06-08: "you do care if it fails but only then, no watching"; "in progress ci i mean", after I slept and re-polled a pending run. (This is [[feedback_only_surface_blocking_issues]] and [[feedback_fill_dispatch_latency_with_small_work]] applied to CI: a pass is routine state, the gap is capacity for the next thing.)
6. **The decision is Josh's.** He merges if he agrees with the bot's verdict. The bot APPROVE is not the approval that ships code; the merge click is. No auto-merge ([[feedback_no_auto_merge_manual_approval]]).

## A design or docs PR battles on a different axis

A code PR battles its lanes (code-quality, signals-lifecycle, save-format, etc.). A DESIGN PR (a
`.md` that argues a design, not just prose) battles the IDEA: devils-advocate scoped to the
design's claims is a required lane, not the optional fresh-eyes pass, alongside docs-and-writing
(STYLE) and repetition-reviewer (cross-doc dup). And that battle is GENERATIVE, not a confidence
pass ([[feedback_battle_is_a_confidence_pass]] is the code-PR posture): the right outcome is often
that the design CHANGES. This session's memory-graph battles each surfaced real holes (retention
overstated, matching unvalidated, build-cost hidden) and the design was reworked between rounds;
the cut-to-core then re-battle is the same loop. Re-battle a design PR after a substantive rewrite
(discovery-rewrites-the-spec), not after a typo fix. The severity rule still governs the verdict:
only an `issue:` blocks; `nitpick:`/`suggestion:` ride along and never force a re-battle (see the
reviewers skill).

## Bot-review body shape

Highlight the individual review comments (each reviewer's findings, attributed, and mine if any), NOT an aggregated synthesis paragraph that flattens them. Concrete per-line findings stay as inline comments on their lines; the body lists/points to them. Use markdown styling (it renders as markdown): bold the reviewer names, emphasis (bold / `<u>underline</u>` / italic) where it aids scanning. The verdict goes on its own line. Keep the whole body under 400 chars.

**If a line has nothing, omit it.** Do not pad the body with empty placeholders. No `**Me:** none.` when I have no finding of my own; just leave my line out. Only include reviewers and findings that actually exist.

Shape:
```
**code-quality:** clean; <finding> (low).
**signals-lifecycle:** clean.

Verdict: **approve**.
```

## Why (all 2026-05-29, this session)

- Converge-not-churn: on #777, after two rounds + a type-narrow, I moved to re-battle; Josh: "not a battle a decision has not been reached", "after a couple battles another would only churn".
- Fire-without-asking: I resolved an approve verdict then asked whether to fire the bot; Josh: "the whole point is automation, i merge if i agree". Over-gated again on #782; Josh: "you are doing it again".
- Carry-to-terminal: pushed `3cf697b`, asked "want me to watch them to green?" and stopped; Josh: "why did you stop".
- Body shape: posted a synthesis paragraph as the body; Josh: "dont aggragate the review comment, it should highlight the review comments and yours if you have any", then "but still under 400 chars", then "with styling like bold and underline", then "verdict should be on a new line too".
