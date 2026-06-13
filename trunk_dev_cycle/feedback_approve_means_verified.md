---
name: feedback_approve_means_verified
description: "A synthesis APPROVE means the change was verified sound: a battle, runtime, or test check actually cleared it. FIRES WHEN about to fire a synthesis APPROVE or call a PR approved, ask what VERIFIED this holds. Clearing comment threads is housekeeping, not grounds."
metadata:
  node_type: memory
  parent: feedback_verdict
  type: feedback
  originSessionId: b77584dc-0219-43fe-9ed5-81e3c4d76283
---

The synthesis verdict reflects whether the change is actually SOUND, established by a battle, review,
or runtime check clearing it. Before firing APPROVE, ask: what VERIFIED this holds? A battle that
said "ship with named changes" is an approve once those changes land AND something confirms they are
right, a runtime or test check for code, the battle's reasoning actually clearing for a design doc.

The ditch: firing APPROVE because I resolved or replied to the conversation. That is the
assert-without-checking failure ([[feedback_self_judgment_is_coherence_not_accuracy]]) wearing a
verdict label; clearing threads is housekeeping, not a verdict. Josh, 2026-06-06 (#866, #868):
"clearing through comments is not grounds for approve."
