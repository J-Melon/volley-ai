---
name: Read narrative fiction as metaphor, not physics; anchor to existing mechanisms before flagging "bug" in a design doc
description: when a narrative doc uses absolute words ("only", "never", "always"), read for poetic intent first; when reviewing a design doc, anchor proposed mechanics against existing systems before claiming the design has a player bug
type: feedback
originSessionId: current
---
Two adjacent failures from one review pass on Operation Marginalia:

**Read narrative fiction as metaphor, not physics.** `designs/narrative/friendship.md` says friendship "lives only in the meeting of two beings; remove either, and friendship dies." Trillian (devils-advocate) and I treated "only" as a literal physics claim that forbids friendship from existing inside an object, then concluded "gear imbued with friendship" contradicts fiction. Josh: "Does it say only or is this a metaphor you don't understand?" The "only in the meeting" is the relational nature of friendship; a gift carries the friendship of the meeting that produced it. The imbuing IS a meeting. No contradiction.

**Why:** narrative fiction describes the world's character, and absolute words name the texture, not the rule. A devils-advocate that reads fiction literally will manufacture contradictions that are not there. The fix is to ask "what does this metaphor mean about the world" before "does this new mechanic violate this rule."

**Anchor to existing mechanisms before flagging "bug" in a design doc.** Same review: Trillian flagged "too-heavy item dropped over the rack while AT_EQUIP_POSE bounces off the character because the character's drop area covers the silhouette" as a real player bug. Josh: "it should not be going to the rack, the player holds the item, if it cannot be placed on the character it behaves just like a wall remember collision projection?" The home-and-loose regime in `designs/01-prototype/22-equip-loop-regime.md` already has body projection on release; an over-capacity character is a wall the projection fails against, the held token stays on the cursor, the player drops elsewhere themselves. The "bug" was inventing a hijack the existing regime already handles cleanly.

**Why:** design docs CREATE the design; flagging a chosen behaviour as "a real player bug" presumes the existing regime is the only valid one. The right reviewer move is to anchor against the existing mechanism (here: collision projection / home-and-loose), then ask whether the design composes with it. If the new design contradicts the existing mechanism, that is a finding. If the new design simply uses the existing mechanism in a new way, there is no bug.

**How to apply (both lessons):**
- Before flagging a narrative-fiction contradiction, restate the fiction claim in plain English. If the restatement reads as "the world has this character", treat the absolute as metaphor; the new mechanic survives unless it violates the texture.
- Before flagging a design-doc choice as buggy, search the related design / tech docs (per `feedback_read_related_docs_first`) for the existing mechanism that already handles the case. If one exists and the new design composes with it, withdraw the bug flag.
- Brief reviewer agents on both: read narrative metaphors as metaphors; anchor proposed mechanics against existing regimes before claiming "bug".
- "Yes it is a design, you know, to create stuff." A design doc is allowed to make calls; the call itself is not a bug.
