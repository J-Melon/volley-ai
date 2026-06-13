---
name: RCA minions default-start at Tier 2
description: root-cause-analyst dispatches skip the Tier 0 → Tier 2 handshake; runtime tools (godotiq_run, state_inspect, verify_motion, screenshot, input, exec) are pre-approved
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
This entry replaces an older "RCA minions are Tier 0 by default" framing. Going forward: **root-cause-analyst dispatches start at Tier 2 by default.** No "ask Josh first" handshake; runtime tools (`godotiq_run`, `state_inspect`, `verify_motion`, `screenshot`, `input`, `exec`) are part of the standard RCA toolbelt for Volley.

**Why:** static trace consistently can't disambiguate physics, signal-timing, and lifecycle bugs. Forcing Tier 0 first means the RCA produces "three live hypotheses I cannot disprove" and Gru then dispatches a separate runtime-verifier to actually look - a wasted round-trip. Josh's call: skip the ladder rung; RCA jumps straight to runtime when needed. The runtime-minions-must-abort-on-disconnect rule still holds (`feedback_runtime_minions_must_abort_on_disconnect.md`); Tier 2 isn't permission to run blind.

**How to apply:** RCA briefs include "Tier 2 pre-approved; use `godotiq_run` and runtime tools without asking." If GodotIQ isn't reachable, the RCA aborts and reports the gap rather than falling back to static trace silently. The narrower runtime-verifier specialist still has its place for pure diagnostic-without-RCA passes; RCA is the "find the cause AND prove it via runtime if static is unclear" role.
