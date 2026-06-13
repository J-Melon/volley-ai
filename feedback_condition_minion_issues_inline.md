---
name: Condition and prioritise minion-infra issues at file time
description: When filing issues for swarm/minion infrastructure (Swarm Enhancements, Minion Hardening), set priority and project inline rather than dumping to Vault unconditioned
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Issues that come out of mid-mission process gaps; reviewer roles, dispatch shape, agent-infra fixes; get conditioned at file time, not later. That means: priority set based on demonstrated cost (Urgent / High / Normal / Low), project chosen (usually Swarm Enhancements or Minion Hardening), labels applied (`feature` / `bug` / `spike`), `relatedTo` wired to the missions that surfaced the need. Don't leave priority unset just because the issue goes to Vault by default.

**Why:** 2026-04-25, Josh: "for new minion issues condition and prioritise as you go." Just before this, I filed SH-253 / SH-254 / SH-256 / SH-257; all directly addressing the SH-247 / SH-251 / SH-252 mission failures; and left every priority unset. Two of them (SH-256 design-vs-impl reviewer, SH-257 multi-agent dispatch) would have caught the failure mode that's currently costing a third dispatch cycle. The cost is demonstrated; the priority should reflect it.

**How to apply:**
- At file time, decide priority from the issue's actual cost story:
  - **Urgent (1):** the gap is blocking the active mission (rare for infra; usually means a runtime hook is broken).
  - **High (2):** the gap caused or will cause a measurable failure in the recent mission set; fix this and the next swarm round is materially better. Most agent-infra issues that come out of a Ride miss land here.
  - **Normal (3):** speculative-but-real improvement; the next round runs without it but pays a small cost.
  - **Low (4):** nice-to-have, no near-term cost.
- Status stays Vault unless Josh moves it; priority is mine to set, cycle is his.
- Project: Swarm Enhancements (dispatch / review / agent-infra), Minion Hardening (testing rules, agent constraints, prompt discipline). If unsure, look at the most-similar recent issue and match.
- Labels: `spike` if the shape isn't obvious, `feature` if the work is clear, `bug` if it's fixing a regression in agent-infra.
- `relatedTo`: every mission issue that surfaced the need. Wire these even when the link feels obvious; the trail matters when Josh is grooming.
- This rule supersedes any default-to-Vault-unprioritised pattern. Vault is the status; it is not "we have not yet thought about priority."

**Pointing minion-infra features.** Gru has project-management responsibility over the swarm itself (Swarm Enhancements, Minion Hardening, anything tied to dispatch / review / agent infra), so Gru points those features at file time too; they don't sit unpointed waiting for Josh. Game-feature stories (player-facing work in Equip Loop, Items, Game Feel, Art Foundation, etc.) stay unpointed for Josh per `feedback_no_pointing_issues`; the override only applies inside Gru's PM surface. Reinforced 2026-04-25, Josh: "you have project management responsibility over your minions, therefore you can point features related etc." Apply Fibonacci as usual: 1 trivial, 2 well-scoped one-file edit, 3 small refactor or new agent def + docs, 5 multi-file with audit work, 8+ rare for swarm work; split if it's reaching.
