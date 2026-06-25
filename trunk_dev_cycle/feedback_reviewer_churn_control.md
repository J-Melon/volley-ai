---
metadata:
  node_type: memory
name: Review at author-signalled moments, scope-filter the diff
description: Match review weight to the change AND to the PR's history. On a long single-PR build, not every increment warrants a fresh reviewer battle; a doc-only or mechanical follow-up on an already-core-approved PR usually needs none. Reviewers fire at explicit "ready for re-review" moments, not every push; when they do, the scope-filtered diff drives which run. FIRES WHEN about to dispatch reviewers on an increment of a PR already reviewed, or stacking review rounds within one big PR.
parent: feedback_re_battle
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
metadata:
Reviewer dispatch happens at declared review moments, not on every push. A review moment is the challenge first opening, or the author (agent or Josh) reporting "fixes addressed, ready for re-review" after a round of comments. Mid-flight WIP pushes strip the zaphod labels but do not trigger re-dispatch.

## Recognise churn on a long single-PR build

A big PR built across many turns is ONE review surface, not a series of independent PRs each owed its own battle. The core got a full multi-lens review; later increments do not each re-earn the whole machinery. Before dispatching reviewers on an increment, ask: does this change carry real risk the existing review did not cover? A doc-only rework, a rename, a mechanical follow-up, a 2dp clamp, a comment fix on a PR whose code is already approved usually needs NO reviewer round; spot-check it yourself and move on. Reserve a fresh battle for increments with genuine defect surface (new logic, signal/lifecycle change, save-format touch, a behaviour the prior review never saw). Josh 2026-06-02, after I ran five reviewers on the spine, three re-reviewers, a tiebreaker, test-coverage on the strip, and was about to fire two more on a doc rework of the same PR: "no review you should recognise churn, as this is a big one." The dispatcher's own spot-check is the gate for low-risk increments, not a reviewer fan-out. Related: [[feedback_gates_must_be_proportionate]], [[feedback_dispatcher_focus_low_wip]].

When a review moment arrives, the organiser computes `git diff <last-approved-sha>..<current-head>` and maps the changed files to reviewer scopes (each agent's `description` declares its scope). Only reviewers whose scope was touched re-run. A push that only touches tests skips `code-quality` and `gdscript-conventions` for the .gd production surface; only `test-coverage` runs.

**Why:** before this rule, every push re-dispatched every reviewer against the full challenge diff. On a three-commit revision cycle addressing a single comment, four reviewers re-read the whole rack_display.gd four times and produced four redundant approvals. The labels churned and Josh's inbox bloated. Rule given by Josh 2026-04-23.

**How to apply (organiser):**

1. On a push mid-review, let the strip happen. Don't re-dispatch. Narrate the push and wait.
2. On an author "ready for re-review" report (from an agent's completion message, or from Josh explicitly), hydrate challenge state and read the last-approved SHA (from label events or reviewer comments).
3. Diff `last-approved..HEAD`. Partition the changed file set by reviewer scope:
   - `.gd` under `scripts/` → code-quality, gdscript-conventions
   - `.gd` under `tests/` → test-coverage
   - `.tscn` / `.tres` → godot-scene
   - `project.godot`, `**/*.import`, `export_presets.cfg` → asset-pipeline
   - `.github/**` → ci-and-workflows
   - `.md` → docs-and-writing
   - Save code or `scripts/progression/**` → save-format-warden
   - New deps (workflow `uses:`, `requirements-dev.txt`, `addons/**`, `.mcp.json`) → supply-chain-scout
   - Signals / lifecycle patterns (`connect(`, `emit(`, `tree_exit`, new autoloads) → signals-lifecycle
4. Dispatch only the touched reviewers. Each prompt includes the SHA range and their scope-filter so their review is incremental, not full-diff.
5. If a reviewer's scope-filtered diff is empty, they approve immediately with "no changes in my scope since X".
