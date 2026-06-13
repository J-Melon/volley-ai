---
name: Plan agents plan, they don't probe
description: when dispatching the Plan subagent_type, the brief disclaims the runtime godotiq cluster; design is its job, runtime is verifier's
type: feedback
originSessionId: e64c4ee1-f2a0-40ca-a1d8-d32235324bbb
---
The built-in `Plan` subagent_type inherits "All tools except Agent, ExitPlanMode, Edit, Write, NotebookEdit", which includes the runtime godotiq cluster (`run`, `state_inspect`, `input`, `exec`, etc.). That tool surface is wider than the role needs. The role is **design**: read code, dependencies, signals, file context, ask questions, propose a sequenced plan with risks. Playing the game is not part of designing the plan; that belongs to `runtime-verifier`.

**Why:** Same separation-of-concerns logic that keeps `gdscript-implementer` lean (per `feedback_pair_implementer_with_runtime_verifier`). Planners that probe live state confuse the role boundary, slow the plan, and tempt the implementer to defer runtime verification because "Dave already checked". Verification is a single accountability — the verifier owns it.

**How to apply:**
- Every Plan-agent dispatch brief includes a one-line constraint: "Do not invoke runtime godotiq tools (`run`, `state_inspect`, `input`, `exec`, `verify_motion`, `screenshot`, `perf_snapshot`, `ui_map`); your job is design, not probing. If your design needs a live observation, write the question into the plan's risk section and the dispatcher fires a runtime-verifier separately."
- If the plan returns with claims sourced from live runtime probes, treat those claims as unverified and require the verifier to confirm before passing to the implementer.
- Plan can use the static analysis tools freely (`file_context`, `dependency_graph`, `signal_map`, `impact_check`, `scene_map`, etc.).

Connected to `feedback_pair_implementer_with_runtime_verifier` and the gdscript-implementer agent definition's "Tier 0 always" framing.
