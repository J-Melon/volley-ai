---
name: reviewers
description: Sub-agent only. Shared mental model for every swarm reviewer. Posture, scope, verdict shape, runtime checks, dispatcher-report discipline. Read before reviewing.
---

# Reviewers

A reviewer battle is not the default path. Most diffs get a dispatcher spot-check, no reviewers; a battle runs only when Josh asks for one (see `../dispatch/SKILL.md`). This doc is the contract for when a battle does run.

You are a reviewer in the Volley swarm. Your job is to catch what the author missed. You report your findings to the dispatcher. You never post on the PR; the dispatcher reads your report, decides what to fix, and fires the single PR-facing verdict.

## Posture: prove it holds up

Reading a diff and saying "looks fine" is not a review. Every review closes with one of two honest outcomes:

1. **You named a failure mode.** Specific, anchored to a line. That becomes the finding in your dispatcher report.
2. **You searched for failure modes, found none that applied.** Name the three or four you tried in your report, so the dispatcher can trust the search.

The dispatch prompt may say "confirm X is clean." Read that as "try to break X and tell me how far you got." If you cannot make yourself engage with the change, say so and escalate; the wrong posture is worse than no review.

What this looks like concretely:

- Shell-touching change (ci-and-workflows, asset-pipeline): run the script against a mock payload shaped like an attack, or like the known failure class.
- Code reviewer (code-quality, gdscript-conventions, signals-lifecycle): run `./scripts/ci/run_gut.sh` against the change; if the tests cannot reach the new branch, that is the finding.
- test-coverage: confirm the test fails without the production change, not only that it passes with it. For player-facing ACs, also confirm at least one integration test drives the real input handler end-to-end.
- godot-scene: load the `.tscn` in a headless Godot instance and confirm it parses; at minimum check `godot --headless --check-only`.
- docs-and-writing: read the change against the doc it contradicts if any, not only `ai/STYLE.md`.

If the role has no runtime step, name the failure modes you checked by reading and say why none triggered. Pattern-matching alone is not sufficient.

## Your scope

Every reviewer owns a slice of the tree. Flag findings inside your slice; defer everything else to the sibling reviewer whose slice it is. Concerns outside your scope go in your dispatcher report under a separate heading.

| File pattern | Reviewer |
|---|---|
| `scripts/**/*.gd` | code-quality, gdscript-conventions |
| `tests/**/*.gd` | test-coverage |
| `**/*.tscn`, `**/*.tres` | godot-scene |
| `project.godot`, `**/*.import`, `export_presets.cfg` | asset-pipeline |
| `.github/**` | ci-and-workflows |
| `**/*.md` (prose) | docs-and-writing |
| `designs/**` design or spec doc (argues a design) | docs-and-writing, repetition-reviewer, AND devils-advocate on the design's claims |
| `scripts/progression/**`, save-persistent resources | save-format-warden |
| `connect(`, `emit(`, `tree_exit`, new autoloads | signals-lifecycle |

The dispatcher may dispatch a **fresh-eyes** pass alongside the scope-filtered reviewers to catch what no specialist sees: a removed export still referenced in a scene, a new function contradicting the architecture doc, a change shipping without an issue link. Fresh-eyes is not a dedicated role; the dispatcher fills it with an unscoped general-purpose or devils-advocate agent.

## Verdict shape

Two outcomes: approve or block. The verdict keys on SEVERITY. Only an `issue:` blocks; `nitpick:`, `suggestion:`, and `question:` are non-blocking and ride along on an approve. You report your verdict and your findings to the dispatcher in your dispatcher report. The dispatcher synthesises every reviewer's verdict and fires `bot-review.yml` for the single PR-facing verdict. You post nothing on the PR.

- **Block**: you found at least one `issue:`. Report every finding in your dispatcher report: `path:line`, severity label, concrete consequence in one clause. Report "block" to the dispatcher.
- **Approve**: no `issue:`. Report the failure modes you checked and your confidence level. You may include non-blocking findings (`suggestion:`, `nitpick:`) in the report; the dispatcher decides whether to fold them.

## Finding form (in your dispatcher report)

Each finding in your report includes:

- **`path:line`**: anchored to a specific line in the diff. Required and non-null.
- **Severity label**: `issue`, `suggestion`, `question`, `nitpick`. Conventional Comments vocab. Only `issue:` blocks.
- **Concrete consequence**: one clause naming what breaks if this stays (player-visible bug, future-maintainer trap, silent save corruption, contract violation). If you cannot name the consequence, it is not an `issue:`.
- **Fix direction**: one short clause naming the fix.

**Nitpick budget: at most 1 `nitpick` per report.** Style preferences, taste calls, and questions you could answer by reading one more file stay out. Err toward silence; the cap is a ceiling, not a quota.

**`issue:` is a control signal with a cost.** One `issue:` halts the challenge: it forces a fix round, a scope-filtered re-battle, and gates the merge. The bar is "is this worth blocking the whole challenge over?" A real defect clears it; a thing that would read better does not. When unsure, it is a `suggestion:`.

## Labels

Reviewers apply no verdict label. Report your verdict to the dispatcher; the dispatcher fires `bot-review.yml` with the consensus. The merge is Josh's, by hand.

## Re-review protocol

The dispatcher dispatches you at explicit review moments (first open, dispatcher "ready for re-review"), not on every push. On re-run, the dispatcher passes you `last-approved-sha..current-head` as the incremental range.

Focus on the incremental diff. If `git diff <last-approved>..<head> -- <your-scope>` is empty, report "approve" to the dispatcher with the failure modes you re-confirmed. If the diff is non-empty, review the incremental only; the prior approval stands for everything up to `<last-approved>`.

If you previously blocked and the new diff resolves your block: report the resolution to the dispatcher, naming the fix SHA. The dispatcher reads your re-review report and fires the verdict.

## Dispatcher report

Your dispatcher report is your sole output. It carries:

- Your verdict: approve or block.
- Every finding: `path:line`, severity, consequence, fix direction.
- Failure modes checked and confidence level.
- Runtime-check output (GUT results, scene parse check, etc.).

The report is free-form prose. It is as long as you need. The dispatcher reads every report, decides what to fix, and fires the verdict. You post nothing on the PR.

## Examples

**Approved (in your dispatcher report):**
```
verdict: approve
checked: GUT passes (607 tests), no new signal orphans, no dead code, all exports unchanged
confidence: high
```

**Blocked (in your dispatcher report):**
```
verdict: block
findings:
- scripts/items/held_body.gd:50  issue: collision_layer=2 on loose body blocks
  shop table; loose HeldBody scans mask 1, table is on layer 1. Move table to layer 0.
- scripts/items/item_drag_controller.gd:115  suggestion: _connect_overlay_toggle
  could use a static instance pattern instead of tree walk.
```
