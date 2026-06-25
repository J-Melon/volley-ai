---
name: blank-line-spacing-inside-function-bodies
description: "GDScript style: blank line before every if, after every early-return guard, between logical clusters. Triggers when writing or reviewing GDScript. This is the single authority for function-body spacing; the implementer-nits skill points here."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rules

One blank line before every `if`. Exceptions: first statement of a function body, and `elif`/`else` continuations.

One blank line after every early-return guard (`if cond: return`) before the main work begins. Applies to every function, not just setup functions.

One blank line between logical clusters: var decls, signal wiring, mutation, cleanup.

Break up large unbroken runs (6+ consecutive statements with no blank) into spaced steps by what each group is doing. Fires on run size, not on conditional presence.

One blank line after a multi-statement `if`/`for` block before the next statement, when the next statement is a new logical step rather than a continuation.

Heaviness is a different problem from spacing. A dense, deeply-nested, multi-job function wants extraction, not blank lines. Spacing is cosmetic; heaviness is semantic.

gdformat preserves single blanks; it only collapses 2+ in a row.

## Calibrating example

```gdscript
func _on_ball_removed(ball: Ball) -> void:
    if not _rows.has(ball):
        return

    var row: Dictionary = _rows[ball]
    var label: Label = row["label"]

    if is_instance_valid(ball) and ball.play_state_changed.is_connected(row["callable"]):
        ball.play_state_changed.disconnect(row["callable"])

    if is_instance_valid(label):
        label.queue_free()

    _rows.erase(ball)
```

Four clusters: guard, var decls, signal disconnect, label free, dict erase. Each blank-separated.

## Why

gdformat does not enforce this; gdlint does not flag it. So it slips through every linter pass and lands as a reviewer nit on every implementer PR. Consolidating the rule here as the single authority stops the loop.
