---
name: when-josh-uses-a-domain-word-that-has-both-a-code-reading-and-a-game-world-reading-ask
description: "Words like \"surface\", \"ball\", \"court\", \"rest\", \"state\" map to both code objects and player-world concepts. Picking the wrong reading inverts the design call. Ask before assuming."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

Many Volley terms live in two namespaces — the codebase object and the player-world fiction. Picking the wrong reading silently inverts the design call.

Examples:
- **"surface"** can mean `court_config` (the code object describing the court) OR the floor the ball rests on (the OUT_REST state).
- **"ball"** can mean the `Ball` Node OR the in-fiction object the player drags.
- **"state"** can mean GDScript state machine OR the player-visible mode (held, in play, resting).
- **"court"** can mean the `Court` scene OR the playing field.
- **"rest"** can mean OUT_REST enum value OR the verb the ball does after a miss.

**Why:** Reinforced 2026-05-12 on Operation Westphalia, PR #652. Vitruvius flagged that `out_rest.tres` writes a `linear_damp = 0.0` value that's immediately overwritten by `court_config.rest_roll_damping`. I offered three options including (c) "move rest damping into out_rest.tres and let the bundle own it." Josh: "Yes friction belongs to the surface." I read "surface" as `court_config` (the code object) and inverted his answer — telling him (c) was rejected when he'd actually picked (c). Cost one round-trip clarifying.

**How to apply:**

- When Josh uses one of the ambiguous terms above (or any term that could read both ways), and the reading changes which option he's picking, **ask before assuming**. One sentence: "by X do you mean [code reading] or [game-world reading]?"
- When summarising his decision, use the unambiguous code-and-fiction form: "moving the value into `out_rest.tres` (the rest-state bundle)" rather than just "the surface."
- If I've already replied based on an assumed reading and he pushes back, default to the reading consistent with his pushback's framing — don't double down on the original interpretation.
