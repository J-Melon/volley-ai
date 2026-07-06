---
name: feedback_verifier_fires_at_sync_points
description: "The dispatcher fires the verifier agent after every push (CI gate) and before every APPROVE verdict (AC gate). The verifier reads CI output, ticket ACs, and the diff, then reports to the dispatcher. The dispatcher only fires APPROVE when the verifier reports ci_green and ac_satisfied."
metadata:
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

The `verifier` agent fires at two sync points:

1. **Post-push CI gate.** After every push to a PR branch, the dispatcher fires the verifier
   to read CI output. If `ci_failing`, the dispatcher dispatches an implementer to fix. If
   `ci_green`, the verifier report passes and the dispatcher proceeds.

2. **Pre-verdict AC gate.** Before firing `APPROVE` via `bot-review.yml`, the dispatcher fires the
   verifier to confirm the ticket's acceptance criteria are met against the diff and CI evidence.
   If `ac_not_met`, the dispatcher dispatches an implementer. If `ac_satisfied`, the dispatcher
   proceeds to fire the verdict. If any AC requires runtime confirmation (unverifiable from static
   evidence), the dispatcher escalates to Josh.

The verifier pins its scope to CI output and ACs. Code quality, style, and runtime behaviour are
separate lanes.
