---
name: test
description: GUT test discipline for Volley. Read before writing the first test or touching test code. Covers what tests to write, efficiency patterns, and hard churn limits.
---

# Test discipline

Three concerns: what earns a test, how to keep it fast, and when to stop.

## What earns a test

Write the fewest cases that each prove a distinct behaviour the live game reaches. Every case earns its place by catching a real failure; if it does not, it does not exist.

A case earns its place only if:
- It proves a **behaviour the game actually reaches** (a live caller drives the path).
- It asserts on **observable outcomes** (public state, emitted signals), never private fields.
- It would **fail if the production logic were wrong**.

Cut on sight:
- Wiring / plumbing (connection tests break on every reroute).
- Hollow tells: subject prop never read, guard reachable only by impossible direct call, re-asserting an engine guarantee.
- Coverage-chasing: a case exists to catch a failure, never to move a number.
- Near-duplicate cases: one rule over many inputs is one `use_parameters` table, not N functions.

Name each case by what it tests; match sibling names in the file. Depth lives in `tests/TESTING.md` and `feedback_hollow_test_tells`.

## Keep tests fast (sub-5ms)

1. **Drive the system directly, do not wait for a frame.** Emit the driving signal. Call `_process(delta)` / `_physics_process(delta)` with synthetic delta. Reach for `await get_tree().process_frame` only when the SceneTree is the system under test.

2. **Lift immutable fixtures to `before_all`.** PackedScene resources, parsed dicts, pre-warmed RegEx: anything read-only across cases moves out of `before_each`.

3. **Wait on the actual condition, not the clock.** Replace `await get_tree().create_timer(N).timeout` with `await wait_for_signal(obj.signal_name, timeout_s)` or `await wait_until(func(): return obj.ready, timeout_s)`.

**Foot-gun:** Never call `autofree` / `add_child_autofree` in `before_all`. GUT frees autofree'd nodes after `after_each`, so anything autofree'd in `before_all` is freed after the first test.

**Tautology guard:** After cutting an await or lifting a fixture, the test must still fail if production breaks. If it passes against a stub that does nothing, you weakened the test; revert.

## When to stop (churn limits)

Hard caps per dispatch:
- **Three genuinely different fix attempts per failing test.** A different attempt changes the approach (file, assertion shape, setup), not a value tweak. After three, escalate.
- **Tool-call ceiling: 80 per dispatch.** Past 80 the work is churning; the brief, test, or diff is wrong.
- **Per-test wall-clock soft-cap: 5 minutes.** If a test stays red after five minutes, report the failing state and stop.

Escalation report names: the failing test (file:line, assertion that fails), the last three attempts (what changed, why it didn't work), best guess (test wrong, diff wrong, or brief incoherent), what you'd try next. The dispatcher decides. These limits are permission to stop, not permission to ship red.
