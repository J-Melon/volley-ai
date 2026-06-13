---
name: Reasoning questions get prose answers, not ticket fan-outs
description: When Josh asks "what do we need" / "what does this require" / similar, answer in prose first; only file tickets if the answer surfaces real new work.
type: feedback
originSessionId: ec0dec13-f454-4407-b07d-3f333f30db0f
---
When Josh asks an architectural or scoping question ("what tech do we need?", "what does this require?", "what's missing?"), the right move is to reason about the capability level and answer in prose. Filing tickets per sub-bullet is the wrong response shape: it converts a thinking prompt into bureaucracy and often duplicates what existing tickets already cover.

**Why:** Josh asked "ok what tech do we need to allow for this?" after the asset/concept/jam batch. I jumped to filing four `tech/feature` tickets per asset (character sprite integration, garden background integration, ball sprite integration, garden music integration). He retired all four with "not issue level, what do we actually need?". The honest answer was that Godot handles 2D natively and the gaps are small wiring jobs the existing asset tickets absorb — that needed prose, not new tickets.

**How to apply:** Reading "what do we need" / "what does this require" / "what's missing" / "what's the tech for X" — pause. Answer the question architecturally: name the capability gap if there is one; name "no gap, this is a wiring job" if there isn't. Only after the answer lands, ask Josh whether any sub-piece deserves its own ticket. Default is no ticket; the reasoning IS the deliverable.
