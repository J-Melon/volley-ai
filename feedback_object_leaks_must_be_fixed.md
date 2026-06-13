---
name: ObjectDB instance leak warnings get fixed, never carried forward
description: GUT closing with "WARNING: ObjectDB instances leaked at exit" is a real defect. The fix lands in the same PR that produced or worsened the warning. New code never increases the leak count, and finding the chronic leaks gets its own spike.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
When the GUT suite closes with

```
WARNING: ObjectDB instances leaked at exit (run with --verbose for details).
```

the warning is a real Godot defect: nodes removed from the tree without being freed, or `GDScriptFunctionState` coroutines suspended forever because their host was freed mid-await. Leaks are not cosmetic; they accumulate across long-running test runs and CI, hide real teardown bugs, and signal that production code may leave dangling objects in the same shape.

**Rules:**

- Any PR that introduces a NEW leak fixes it before merge. Run `godot --headless ... --verbose` and trace the leaked instances back to the source code.
- A PR that hits a pre-existing leak the dispatcher already knew about doesn't have to fix it inline, but it does file a follow-up (spike-flow: question is "what's leaking and how do we close them") so the leak gets a home. Open-ended "future spike, no owner, no SH-NNN" is not a follow-up; the follow-up has a Linear issue, a project, and a dispatch path before the mission closes. Tracked-but-uncovered leaks are blocked on a real ticket, never on a phrase.
- The leak count is part of the merge gate. CI should grep stderr for the warning and fail.

**Common shapes of the leak:**

- `await get_tree().process_frame` inside a `while` loop whose exit condition depends on tree state (`is_inside_tree()`). When the host is freed mid-await, the loop's coroutine state survives.
- `await some_signal` where the host node tears down before the signal fires.
- Nodes added with `add_child` but never `queue_free`d in tests that don't use `add_child_autofree`.
- Resources `.new()`d in tests without being attached to a freed host.

**How to apply:**

- After every test run during implementer work, the report mentions whether the leak warning fired. Implementers don't ignore it.
- The dispatcher checks the warning state at fold-in. A worsened leak count is a regression.
- "It was there before" is true but not a pass; if a test you added or touched contributes to the warning, fix the contribution.
