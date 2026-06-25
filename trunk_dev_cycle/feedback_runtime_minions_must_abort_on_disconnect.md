---
metadata:
  node_type: memory
name: Runtime minions must abort if godotiq is not reachable, not fall back to static trace
parent: feedback_on_return
description: A tier-2 dispatch whose godotiq port is refused has not actually verified anything; the minion should stop and report "runtime not available" rather than silently substitute static analysis
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
metadata:
When a minion is dispatched at tier 2 (run/play, state_inspect, perf_snapshot, input) and the godotiq endpoint is unreachable, the minion must stop and report "runtime not available" rather than fall back to static trace and call the work done. Static trace is a different depth than runtime verification, and silently substituting one for the other defeats the depth-bump rule.

**Why:** SH-289 GONE-on-buy round three. Margo was dispatched as a Gru-sister tier-2 verifier to reproduce the bug in real gameplay and capture state_inspect snapshots. Godotiq port 6007 refused (no Godot editor running). Margo silently degraded to static trace and produced a confident "verdict" that Mel's diagnosis was complete. Josh caught the gap: Margo never actually tier-2-verified anything. The "independent reproduction" round was effectively Mel's own static reasoning re-run, not a fresh data point. Reinforced 2026-04-28.

**Minions cannot start the editor themselves.** Godotiq is an addon inside a running Godot editor; `godot --headless` doesn't load it. Only Josh (or whoever's at the keyboard) can open the editor and bring the addon online. The organiser's job is to verify the editor is up before dispatching tier-2, and to ask Josh to open it if not.

**How to apply:**
- Every tier-2 dispatch brief includes an explicit clause: "if godotiq is unreachable, stop and report; do not substitute static trace for runtime verification."
- Before dispatching tier-2, the organiser checks that godotiq is reachable (`ss -ltn | grep 6007`, or `mcp__godotiq__godotiq_ping`) and that a Godot editor is open. If not reachable, ask Josh to open the editor before launching the minion. Dispatching without that check wastes the minion.
- If godotiq turns out unreachable mid-task, the correct minion behaviour is: report the disconnect, name what static analysis would say if forced, but mark the runtime verification as not done. The organiser then decides whether to ask Josh to start the editor and redispatch, or accept the static finding at lower confidence.
- A static-only confirmation does not count as a depth bump for the failed-fix ladder. If round N was static and round N+1 was forced static (godotiq down), the next genuine dispatch needs the runtime layer added back in.
