---
name: Refactor as you go (the umbrella principle)
description: When a PR's work brings me to debt, legacy shape, or a domain that wants reshaping, the reshape lands ON THE SAME PR, not a follow-up. Applies to quality issues, doc structure, domain extraction, shim avoidance, dead code. The PR that touched the legacy state is the PR that fixes it. Triggers on every "let's split this off" or "follow-up ticket" impulse during in-flight work.
metadata:
  type: feedback
originSessionId: e64c4ee1-f2a0-40ca-a1d8-d32235324bbb
---

## The principle

Refactor as you go. When in-flight work brings me to debt, legacy shape, or a place that wants reshaping, that work also reshapes. Same PR, same diff. The PR that touched the bad shape is the PR that cleans it.

Volley is early enough that deferred refactor accumulates faster than it gets paid down. The "merge first, refactor later" pattern is the failure mode this rule prevents.

## What "as you go" covers

- **Quality issues** the PR surfaces or sits on top of: rename smells, loose `@export` clusters, dead code, duplicated formulas. Fix inline; don't file a follow-up.
- **Config domain extraction:** new fields land on their future home, not the legacy grab-bag. Domain folders get extracted by the touching feature (see `feedback_extract_with_feature_not_after`).
- **Doc structure migration:** if the PR touches a legacy-located doc (e.g. flat-numbered prototype docs), the touching PR moves the doc into the current `design/` or `tech/` subfolder (see `feedback_extract_to_new_structure`).
- **Shim avoidance:** no merge-shim, facade, or forwarding layer that preserves legacy call sites. The call-site refactor lands with the extraction (see `feedback_no_shims_early_development`).
- **Dead code that gets revealed:** if the PR deprecates a path, the path is deleted; no "remove next time" comments.

## Two ways debt gets paid: incrementally, or as a prefactor

Tech debt is paid down one of two ways, never as a deferred lump that rots in the backlog:

1. **Incrementally, bit by bit per cycle.** Steady chipping at a known debt area across cycles, not one coordinated sweep.
2. **Prefactor.** When a feature is about to touch a debt area AND would benefit from the debt being cleared first, resolve the debt *before* the feature, as its enabling step. Prefactor = refactor done ahead of the feature that needs it (not post-hoc, not a standalone someday-ticket). The feature lands on the cleaned foundation.

So a filed architecture/debt ticket is not passive backlog: it is the **prefactor candidate** for the next feature touching that area. When dispatching a feature that touches the debt, check for a prefactor ticket and do it first. Example: SH-456 (rack state should derive from ItemManager) is the prefactor for the next rack/inventory feature; a patch can kill a bug today, but the next feature in that area prefactors SH-456 before building.

## What it does NOT cover

- Pre-existing debt that the current work does NOT touch or sit on top of. That gets a separate ticket; the rule is about debt the current work surfaces or runs into.
- Genuinely huge cleanups that would balloon the PR past a reasonable review surface. Surface that to Josh; don't unilaterally split or unilaterally land.

## Carve-out: when Josh says "put a todo"

"Put a todo" is **a code-comment marker, not a Linear ticket**. Resolution:

- The TODO is a freeform `# todo: <description>` line in the code, sitting on the relevant surface. No Linear issue is filed. The `SH-N` requirement from `feedback_comment_style` does not apply to deferral markers explicitly approved by Josh.
- Filing a Linear ticket needs an explicit "file a ticket" or "open an issue" from Josh. "Todo", "note it", "flag it", "leave it" all mean code marker only.
- When ambiguous: ASK before filing. "Want this as a code-todo or a Linear ticket?" The cost of asking is one turn; the cost of filing wrongly is the rule violation plus retiring SH-N noise.

## How to apply at every decision point

1. **Drafting a plan.** Before proposing scope to Josh, scan: does this work touch any legacy doc, legacy grab-bag, legacy call-site shape? If yes, the plan includes the reshape, in the same PR.
2. **Briefing an implementer.** Include in scope every known reshape the touching change implies. Don't pass through AC numerics as the only constraint; pass through the structural moves too.
3. **Reading a returning implementer.** If the implementer landed the feature but left a touched legacy doc, config, or call-site in its old form, surface as a finding before approving the PR. The PR is not ready until the reshape is in.
4. **Review findings and questions default to fix-in-PR, not defer.** When a battle finding or my own review question reads "this is a smell, natural cleanup target for SH-future-ticket", that framing is the failure mode if the work touched or introduced the smell. Don't offer "defer to SH-N" as the natural home; the touching PR fixes it. The type-widening on #777 (signatures widened to RigidBody2D in this same PR) was surfaced as "cleanup target for SH-454 (state machine)"; Josh said "yes reduce to ball", fix it here. A review question about debt this PR sits on is answered by reshaping, not ticketing. Reinforced 2026-05-29. ("these questions come back to refactor as you go".)
5. **The merge gate.** "Merge-ready is not sacred." A PR that has already cleared a review round still grows when a reshape is owed. The new push invalidates the prior verdict; the re-review runs (cheaper than expected, since the reshape is usually mechanical); the PR merges with the cleanup baked in. Splitting the reshape into a separate PR off main puts it on a deferred timeline, which is the failure mode.

## Failure shapes I keep falling into

- "I'll split this into a separate small PR off main so PR #N stays approved." That is the rule's exact failure mode. The reshape goes on PR #N.
- "It's a one-line fix, fold into a follow-up." If the fix touches the same scope, it folds in here.
- "The umbrella refactor ticket can pick this up later." There is no umbrella refactor ticket. Each touching PR does its bit.

## Concretions

Specific rules that are this principle in narrower form. Read whichever applies when the touching change reveals that shape:

- `feedback_extract_with_feature_not_after`: config domains.
- `feedback_extract_to_new_structure`: doc folders.
- `feedback_no_shims_early_development`: call-site refactor lands with the extraction.
- `feedback_object_names_not_script_roles`: rename smells.
- `feedback_resource_over_loose_exports`: cluster loose `@export`s into Resources.
- `feedback_data_driven_tuning`: data-driven over hand-coded constants.

These are not separate principles. They are the umbrella applied to specific code shapes.
