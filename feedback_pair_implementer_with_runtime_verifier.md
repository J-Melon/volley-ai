---
name: Runtime-verifier is Ride-only unless Josh asks for a per-PR pass
description: skip runtime-verifier on per-PR work by default; the Ride at mission close covers it; only fire opt-in
type: feedback
originSessionId: e64c4ee1-f2a0-40ca-a1d8-d32235324bbb
---

Do not pair a `runtime-verifier` (Edith / Hactar / etc.) with every implementer dispatch. Per-PR runtime-verifier passes happen only when Josh explicitly asks for one on this PR.

**Josh does runtime checks himself in most circumstances, and asks if he needs the verifier.** So do not offer a runtime-verifier, do not append "runtime verification still owed / left to runtime-verifier" to a verdict or report, and do not treat its absence as an open gap. Fire it only on Josh's explicit request. 2026-05-29: "forget the runtime verifier, i can do it in most circumstances, i will ask if i need it." The implementer flagging "runtime verification needed by runtime-verifier" in its handoff is the agent's habit, not a gap I should surface; drop it from my summary.

The implementer does NOT run the CLAUDE.md run(play) QA loop at dispatch ([[feedback_implementer_ships_static_no_runtime_qa]]): it ships code, tests, validate, static, in isolation. The runtime feel-check is Josh's playtest on the open PR before he merges; the Ride catches mission-spanning flows at close. Do not fold a runtime-verifier dispatch into the implementer brief, and do not treat the absence of an implementer run(play) as a gap.

**Why:** Pairing-by-default was inflating per-PR work into Ride-style passes. Josh said: "no runtime until ride if asked" (2026-05-10). The Banana Tank mission's pacing showed the failure mode — review churn, redundant runtime exercise, and the human reviewer slot getting bypassed by automated runtime sign-off when the Ride is the natural place for that. The earlier 2026-05-04 framing of "always pair" was a reaction to one implementer substituting unit tests for live verification; the durable rule that came out of that is "implementer ships static (code + tests + validate) and Josh playtests the PR," not "always dispatch a separate verifier."

**How to apply:**
- Default: implementer reports → review fan-out → Josh's manual merge. No runtime-verifier in that loop.
- Exception: Josh asks "fire a runtime-verifier on this," or the implementer's own QA evidence is missing/suspect and a verifier is the right tool to close the gap. Name the gap when you fire one.
- Ride dispatches at mission close are where heavy runtime verification lives. Multi-flow exercise, full play-through, edge sweep — all Ride scope.
- This rule does not add a runtime-verifier. Implementers ship static (code, tests, validate); they do not owe screenshots or a run(play) loop ([[feedback_implementer_ships_static_no_runtime_qa]]). Josh's playtest is the runtime feel-check.

Connected to `feedback_runtime_minions_must_abort_on_disconnect`, project conventions (CLAUDE.md QA loop).
