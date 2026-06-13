---
name: Reviewer fan-out splits into impl-review and docs-review pools, plus path-triggered cross-cutting
desc: |
  When fanning out reviewers on a PR, treat the lineup as two pools (impl-review for code/scenes/specs-of-code, docs-review for prose) plus a third bag of always-on path-triggered specialists. A pure-docs PR skips the impl pool. A pure-code PR skips the docs pool. Cross-cutting ones fire on path match regardless.
description: Reviewer fan-out splits by diff shape; pure-docs PRs skip impl pool, pure-code skips docs pool.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
When fanning out reviewers on a PR, the lineup splits along diff shape:

**Impl-review pool** (fires when the diff touches `**/*.gd`, `**/*.tscn`, `**/*.tres`, `project.godot`, or anything code-shaped):

- `code-quality`: naming, duplication, dead code, scope creep, comment policy
- `gdscript-conventions`: `@export` over `@onready`, `load()` for new scripts, signal idioms, autoload patterns
- `test-coverage`: when a `**/*.gd` diff has no matching `tests/unit/**` change; behaviour-not-implementation assertions
- `signals-lifecycle`: when the diff contains `connect(`, `emit(`, `tree_exit`, or new autoloads
- `godot-scene`: when the diff includes `**/*.tscn` or `**/*.tres`
- `runtime-verifier`: when the PR has a runtime claim to verify in the editor
- `root-cause-analyst`: when the PR is a bug fix and the cause was non-obvious

**Docs-review pool** (fires when the diff is `**/*.md` only, or includes a substantive `**/*.md` change):

- `docs-and-writing`: STYLE.md compliance, AI prose tells, citation format
- `repetition-reviewer`: cross-doc duplication, trim-verify on supersedes claims
- `devils-advocate`: when the doc is a design or spec (stress-test the proposal against the codebase)

**Path-triggered cross-cutting** (always fire on path match, ignore pool):

- `asset-pipeline`: `export_presets.cfg`, `project.godot`, `**/*.import`
- `ci-and-workflows`: `.github/**`
- `supply-chain-scout`: `addons/**`, `requirements-dev.txt`, `.mcp.json`, new `uses:` in workflows
- `save-format-warden`: `scripts/progression/**`, persisted resources

**How to apply:**

- Pure-docs PR (e.g., a spec under `designs/**`): dispatch the docs-review pool only, plus any cross-cutting ones whose paths match.
- Pure-code PR: dispatch the impl-review pool only, plus cross-cutting matches.
- Mixed PR: dispatch both pools, plus cross-cutting.
- Always dispatch in the background, in a single message with multiple Agent tool uses for parallelism.
- Each minion posts its own GitHub Review on the PR (one per minion, per `feedback_one_review_per_agent`).

**Why:** picking reviewers ad-hoc per PR meant I was guessing each time and sometimes dispatching no reviewers, sometimes dispatching the wrong shape (e.g. running `code-quality` on a docs PR). The two-pool split formalises the obvious cases and makes the cross-cutting specialists path-triggered so they cannot be forgotten when their files change.
