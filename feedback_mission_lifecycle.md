---
name: Mission lifecycle: interrogate, codename, file, dandori
description: "BEFORE any mission proposal or dispatch. Four phases in order: (1) pre-mission interrogation; (2) codename; (3) file the mission (milestone, Ride, attach issues); (4) dandori, the impl plan (crew per work unit, recon the surfaces, scope guard, confirm before dispatch). Skill `ai/skills/gru/dandori.md` is the Phase 4 checklist; the repo home for the whole lifecycle is `designs/ai/swarm-architecture.md`; this memory is the rule body for all four."
type: feedback
originSessionId: current
---

A mission is a Linear milestone within its owning project, named with the mission codename. To find the current mission of a project: read its active milestone. To find what's in flight across the team: read active milestones across active projects. One active milestone per project at a time. The mission's Ride lives in the same project with `milestone` set; constituent issues also set `milestone` to the mission milestone. Pairs with `feedback_projects_linear_scope.md` and `designs/process/missions-and-projects.md`.

The lifecycle has four phases, in order: pre-mission interrogation, codename, file, dandori. Filing is Phase 3; dandori (the impl plan) is Phase 4, after filing.

## Phase 1: Pre-mission interrogation

A mission proposal is NOT the first response to an issue being named. Between "Josh names an issue" and "Gru proposes a mission" sits an interrogation step: read the issue's full AC, open every design doc the issue's attachments link, grep the code for any term in the AC that isn't already concrete, check memory.

If any ambiguity surfaces, stop and ask Josh one precise question per ambiguity. No codename, no proposal, no dispatch until the answers land.

- **AC vs design-doc disagreement IS ambiguity.** Surface it in one sentence ("AC says X, design says Y; which way?") and wait.
- **When Josh sketches a spec verbally**, echo it back in concrete terms BEFORE writing it into the design doc and BEFORE dispatching. The echo catches misreadings at zero cost.
- **Zero ambiguities** → proceed straight to the proposal. **One or more** → stop. Don't dispatch with a hedged brief that asks the agent to "pick a side."

Reinforced 2026-04-24 on SH-218 / Operation Freeze Ray (two ambiguities surfaced reactively; Josh: "why have you never had questions before a mission?") and 2026-04-25 on SH-251/SH-252 (three dispatches, three killed agents, all triggered by ambiguities I should have flagged before the first dispatch).

## Phase 2: Codename

A codename is an opaque handle; the description carries the content.

**Pool is wide.** Despicable Me / Minions fiction, history, mythology, science, geography, treaties, art movements, oblique English nouns, anything evocative. Two-word punchy preferred; a single noun is fine.

**Real names only; no invented compounds.** The codename is a real established thing from the source fiction: a named character (Kyle, Vector), a named gadget (Lipstick Taser, Fart Gun, Freeze Ray), a real artifact (Lantern Slide, Cold Frame, Penny Whistle), a real treaty, a real movement, a real geography. Not a two-word compound I assembled myself ("Coral Atlas", "Stable Lattice") because the syllables sounded right. Sharpened 2026-05-24 on Operation Penny Whistle / Operation Coral Atlas draft: Josh: "don't make it up new name." If I can't quickly point at the source the name comes from, it's invented.

**Reach when picking.** If the three candidates I draft all sit in the same pocket, the draft is stale; re-draw from a different corner.

**Echo lives in the noun itself, and requires an interpretive step.** If the codename's real-world quality resonates with the mission's quality through one or more interpretive steps, the echo lands automatically with no prose. Anteater for a bug-pass: reader knows what an anteater eats → ants → ants are bug-like → mission clears bugs. The reader does the work. Lipstick Taser for the same bug-pass: no path connects the spy gadget to bug-clearing; the echo would have to be invented. If I find myself writing poetic prose to bridge the codename to the work, the codename is wrong; pick one whose nature already resonates.

**No theme-match.** Theme-match is a codename that TELLS the reader what the mission does, in zero interpretive steps. "Bug Sweep", "Cleanup Patrol", "Bugzapper" (a real product noun, but its nature literally is the mission's nature in one step). Soft echo, by contrast, names a thing whose nature aligns but requires the reader to make the connection. The opacity is what separates the two. Sharpened 2026-05-24 on Penny Whistle / Lipstick Taser draft: Josh: "like anteater, you see why?"

**Fallback.** If I can't find a real established name whose nature resonates with this specific mission inside two minutes, default to a real opaque pick with no echo. Better an opaque real name than an invented compound or a strained echo.

**Cycle pool ≠ mission pool.** Cycles are puppets-alphabetical; missions are the broad pool above. A D-cycle mission is not a D-word mission.

**Never reuse a codename in one session.** No `-1`/`-2` suffixes for fan-out; each dispatch gets a fresh unique handle.

**Proposal shape:**
> Mission: **\<name\>** on \<issue-id(s)\>. Scope: \<one or two lines\>. Soft echo: \<one sentence, optional\>. Go?

Codename leads, scope follows, no cast.

**No "Operation" prefix.** Bare codename everywhere: conversation, milestone name, briefings. Dropped 2026-05-25 on Hornbook (Josh: "drop operation from now on").

**Otherwise internal.** Codename does not appear in shipped docs (designs/**, README, code, commit messages, ticket titles or descriptions, branch names) or in briefs that the minion copies into its output. The Linear milestone name is the one carve-out.

## Phase 3: File the mission

Before any work begins, the milestone exists, the Ride (if needed) exists, and the issues are attached. Do NOT discover the mission shape at debrief time.

1. **Decide if a Ride is needed, and at what depth.** Two or more issues hanging off one milestone get a Ride. The Ride's depth depends on whether the work integrates: feature missions whose pieces compose end-to-end get an enumerated Ride (every player-observable flow listed); bug-pass missions whose pieces are independent fixes get a high-level Ride (one or two outcome statements: the lifecycle holds, the rally feels right). The high-level Ride is not redundant with per-PR playtests; it asks the cluster-shaped question those can't ("does the rally feel right with all six landed together") rather than re-testing each fix. Single-issue work needs no Ride. Sharpened 2026-05-24 on Operation Anteater bug-pass: I first enumerated five player-observable ACs, then dropped the Ride entirely on Josh's "no"; he clarified "actually make the ride just high level." Bug-pass Rides ask the cluster question, not the per-bug one.
2. **Pick the cycle, then scope the mission from what is already there.** Never move issues into the cycle as part of mission creation. The issues attached to the milestone must already be in the cycle the mission runs in. Reinforced 2026-05-24 on the Operation Lantern Slide draft: I proposed moving six active-cycle bugs into next cycle; Josh: "no you should only consider issues in the cycle."
3. **Create the milestone** via `save_milestone` on the parent project. Milestone name = mission codename. Description is one sentence (a long one with parenthetical enumeration is fine; multi-sentence is not). Sharpened 2026-05-24 on Anteater milestone: I wrote three sentences; Josh: "milestone desc is too long should be a sentence."
4. **File the Ride** (if needed) with `projectMilestone` pointing at the milestone, title is the bare mission codename (e.g. `Anteater`; the `ride` label handles the type per [[feedback_ticket_shape]] and [[feedback_ride_operating]]), label `ride`, priority High (2), status Vault until the bundle merges, then Ready, then Challenged, etc., per [[feedback_linear_state_forward_only]]. Cycle: set to the same cycle the mission runs in from the start.
5. **Attach every constituent issue** to the same milestone via `save_issue(milestone: <id>)`.
6. **At debrief time** the project status update lands on the milestone's parent project with no surface-choice ambiguity.

**What this avoids:**
- Filing per-issue `save_comment` debriefs because there is no milestone to attach a status update to (see [[feedback_debrief_source_linear_and_devils]]).
- Choosing a project arbitrarily at debrief time when the bundle spans projects.
- Retrofitting a milestone after the work has merged.

## Phase 4: Dandori, the impl plan

After the milestone is filed, before any minion dispatches, plan implementation per work unit. Dandori is the implementation plan, not the mission-shape walk.

**Crew per work unit.** For each issue attached to the milestone, name:

- Impl writer. Sometimes folds in test authoring when the work is test code.
- Test author, paired with impl when the pre-commit hook forces failing tests + impl into one commit.
- Reviewers: code-quality, gdscript-conventions, test-coverage by default; plus domain reviewers the diff fires (signals-lifecycle, godot-scene, save-format-warden, asset-pipeline, ci-and-workflows, docs-and-writing).
- Battlers: devils-advocate to challenge the approach; integration-scenario-author for adversarial cross-system scenarios.

Each minion gets a codename from the rotating pool (Gravity Falls, Hitchhiker's, Oddworld, Omori, Outer Wilds Hearthians and Nomai, Martha) chosen to fit the case. Codename rotates per work unit; role is stable.

**Recon the surfaces.** Before confirm, dispatch a read-only Explore minion to locate each work unit's fix surface (file plus function) and produce a file-overlap map across the units. The crew's write slices come from that map, not from inference off the issue bodies: disjoint units fan as concurrent worktrees, file-sharing units collapse into one serialized stream. Catching a shared file at plan time beats catching it after two minions clobber each other on the same branch. Added 2026-05-25 on Operation Anteater "More Ants": I proposed three parallel worktrees off the bug bodies; recon found SH-412/413/433 all modify `item_manager.gd` and only SH-435 was isolable, so the real shape was one serialized item_manager stream plus one parallel worktree. Recon is read-only and reads excerpts; the claiming minion still does its own step-1 file work.

**Scope-expansion guard.** For any goal that could sprawl (CI gate, audit, doc rewrite, contract change), name the cap. Broader work files as follow-up issues after the mission, never inside it.

**Split shape.** Decide how many PRs the feature becomes, per [[feedback_feature_pr_decomposition]]: the fewest independently-shippable PRs (each compiles, suite green, no half-wired feature on trunk). One-PR default with serial folding; a shared-contract parallel split only at <=3 PRs; the +1000 added-line cap forces a clean-boundary follow-up. Flag here if the feature can't be sliced that way.

**Confirm before dispatch.** List the crew, scope, and split shape. Wait for go before fanning out.

Sharpened 2026-05-24 on Operation Anteater: I conflated dandori with the full mission-shape walk (interrogation + codename + filing + crew); Josh: "no file first dandori is the impl plan." Dandori narrows to crew + scope guard + confirm, after the milestone is filed.

## Cross-references

- Full lifecycle, all four phases plus dispatch through cleanup: `designs/ai/swarm-architecture.md` (the repo home; phases 1 to 3 of this rule live there as lifecycle stages 1 to 3, since memory must not be the only home for load-bearing flow).
- Skill checklist: `ai/skills/gru/dandori.md` (Phase 4 walk).
- Process fiction: `designs/process/dandori.md` (high-level, mirrors the skill).
- Cross-cutting codename rules (apply to all dispatch, not just missions): [[feedback_unique_codenames_per_session]], [[feedback_codename_in_dispatch]], [[feedback_announce_codename_and_role]], [[feedback_codename_only_for_agent_authored]], [[feedback_ride_definition_and_lifecycle]].
