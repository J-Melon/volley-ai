---
name: feedback_gate_at_hook_level_for_reason
description: "A gate worth keeping should deny/ask at the HOOK level, where a permissionDecisionReason travels to the agent, not as a bare permissions.ask/deny rule (which fires silently, so a denial reaches the agent with no cause and it guesses). The hook REPLACES the bare rule; do not run both, that is two mechanisms shadowing each other. FIRES WHEN building or reviewing a permission gate, or when a bare ask/deny rule keeps biting silently."
metadata:
  node_type: memory
  type: feedback
  originSessionId: b77584dc-0219-43fe-9ed5-81e3c4d76283
---

A bare `permissions.ask`/`deny` entry in settings.json fires SILENTLY: the agent
gets a refusal with no reason and reverse-engineers a (often wrong) cause. A
PreToolUse hook can emit `hookSpecificOutput.permissionDecisionReason`, which the
agent reads. So a gate worth keeping belongs at the hook level, carrying its own
reasoning, not as a bare rule.

Two corollaries, both learned the hard way 2026-06-06 on the `rm` gate (#868):

- **The hook REPLACES the bare rule; they do not coexist.** A hook *alongside* the
  still-present bare rule is two mechanisms shadowing each other (and the bare one
  still fires silently). Move the gate to the hook and remove the bare rule. Order
  matters for safety: the hook must be LIVE (after `/hooks` reload) before the bare
  rule is dropped, or there is a window with no gate.
- **A purpose-built hook gate states its own policy; it does not narrate the rule.**
  Once the bare rule is gone, reasons like "X is on the deny list" are false (there
  is no list). The reason explains the policy on its own terms. And the hook can be
  smarter than the blunt rule it replaces: the `rm` gate denies `rm -rf`, warns on a
  trailing-cleanup `rm` (the pattern that actually bit), and allows a sole/leading
  `rm` silently, instead of the old rule's blunt ask-on-every-rm.

The deeper lesson sits under this: the hook is a CONVENIENCE that surfaces a reason,
not a substitute for reading. The original failure was guessing why `rm` was denied
instead of reading settings.json (see [[feedback_post_reviews_via_swarm_script]] and
[[feedback_self_judgment_is_coherence_not_accuracy]]). On any denial, read the config
first; the reason-carrying hook is belt-and-suspenders, not the reason I can stop
reading.
