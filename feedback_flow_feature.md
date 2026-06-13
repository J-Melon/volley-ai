---
name: Feature-flow shape — tech doc, planner, fan-out, fold, Ride
description: A feature (or refactor large enough to warrant cross-PR sequencing) earns the full design-plan-fan-out-fold cycle. The Ride at mission close is the player-feel gate.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
A feature mission's entry is a player-facing capability or a refactor whose blast radius crosses multiple files or systems.

**Shape.** Five phases:

1. **Trigger and frame.** Name the player-facing outcome. The frame includes what the player should see when it's done.
2. **Design pass.** End-state architecture goes into a tech doc (`designs/01-prototype/tech/<NN>-<topic>.md`); player-facing design (if separate) into `designs/01-prototype/design/`. Decisions land in the doc, not in chat (see `feedback_decisions_into_design_doc`). The doc describes what the system *is*, not what it isn't (see `feedback_state_positive_shape`).
3. **Planner dispatch.** A `refactor-planner` agent produces a sequenced plan with blast-radius analysis, scoped per PR. Open design calls surface as recommendations to Josh. Plan saved to `ai/scratchpads/<topic>-plan.md`. Decisions get folded back into the plan after Josh picks. Plan before fan-out when 2+ implementers touch shared per-frame paths (see `feedback_planning_sweep_before_parallel_split`).
4. **Implementer fan-out.** Each plan step gets one `gdscript-implementer` minion, codenamed, dispatched in the background. Each minion branches from the previous step's branch (PRs stack), ships a draft, runs static + GUT, returns a report. Coupled PRs stay draft until their base merges (see `feedback_coupled_prs_are_drafts`).
5. **Fold and Ride.** When the stack is ready, the parent thread merges into the parent feature branch (or main if no parent). GitHub auto-closes the sub-PRs when their commits land. Worktrees pruned, refactor branches deleted. Mission closes with the Ride — Josh-as-pilot validates player-feel at runtime.

**Deliverable.** The capability shipped end-to-end, the tech doc reflecting the landed system, sub-tickets closed, Ride passed.

**Done when.** The player can use the capability in real gameplay. The Ride confirms feel, not just function.

**Reporting discipline.** Progress reports lead with player-visible status, not architectural deliverable. "Foundations 3/6 complete; bug not yet visible-fixed" is the right shape until the load-bearing step lands (see `feedback_lead_with_player_visible_status`).

**When this flow is wrong.** If the work is single-file and has a clear repro, it's a bug — drop the planner overhead. If the work is "we don't know how X should work", it's a spike — output is tickets, not code.
