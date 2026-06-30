---
name: feedback_synthesize_from_dispatcher_reports
metadata: 
  node_type: memory
  parent: feedback_battle_review_process
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

Resolve the verdict from the dispatcher reports. After every reviewer has reported,
read each report for findings, severities, and the failure modes checked. Only `issue:`
blocks; `suggestion:` and `nitpick:` ride along and do not gate the verdict.

**When:** after every reviewer has reported, before deciding the verdict.

**How:** read each reviewer's dispatcher report. Note every `issue:` finding. Check each
against the named-consequence bar: a concrete player-affecting or maintainer-affecting
failure. If any reviewer posted an `issue:`, the verdict is REQUEST_CHANGES. Fix the
finding, re-battle the fixed diff, and when the re-battle returns clean, fire APPROVE.

**The report carries the finding, not a proxy for it.** A reviewer who says "ship it"
but lists a blocking finding is still a block. Read the findings, not the tone.
