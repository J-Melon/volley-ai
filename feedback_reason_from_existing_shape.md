---
name: reason-from-the-existing-shape-before-flagging-asymmetry-or-proposing-mirrors
description: "When something is missing, asymmetric, or surprising, work out from the existing system why it's that shape before treating it as a bug or proposing a fix"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

When you encounter an asymmetry, a "missing" counterpart, or a surprising design choice, derive the rationale from the existing parts of the system before proposing anything. The asymmetry usually encodes a real design decision; the absence is usually load-bearing.

**Why:** 2026-05-24 on Anteater #658 revision. Court has a right wall but no left wall. My first read was "should we mirror it?" and I framed it to the minion as a scope question. Josh asked me to reason. The right wall exists as a partner substitute (toggled off when partner present, on when absent). The left side has no symmetric concept because the player paddle IS the left-side defender; a wall there would either replace the player (defeating play) or sit behind the player (where the side-miss zone already handles escapes). Once that's articulated, "should we add a left wall" answers itself. Josh: "see you can think for yourself" then "use that reasoning more generally."

**How to apply:**

- Asymmetry / missing counterpart: name the role each existing piece plays, then ask what role the missing piece would have. If the answer is "the role is already filled by something else", the absence is intentional. If the answer is "the role is empty and balls go there", it's a gap.
- Surprising design choice: look for the constraint that forced it. Partner-substitute, save-format compat, physics-engine quirk, player-action overlap. Name the constraint before proposing changes.
- Before mirroring: confirm both sides have the same role, not just the same shape. Symmetric geometry does not mean symmetric semantics.
- Before flagging as bug: confirm the system doesn't already handle the case some other way. Per [[feedback_narrative_is_metaphor]], absolutes ("only", "always", "no") often name texture, not rules, and a search for existing mechanisms usually finds one.
- Before fanning out scope questions to Josh: try to derive the answer first. If the derivation lands, propose with reasoning. If two equally defensible answers survive, then it's a Josh question per [[feedback_resolve_scope_before_dispatch]].

Cross-link: [[feedback_narrative_is_metaphor]], [[feedback_resolve_scope_before_dispatch]], [[feedback_research_before_intuition_options]].
