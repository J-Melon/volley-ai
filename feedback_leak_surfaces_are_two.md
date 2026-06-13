---
name: leak-warnings-have-two-surfaces-check-both
description: "When verifying 'zero leaks' in volley GUT runs, check BOTH surfaces. Triggers any time the verification claim involves leaks/orphans/ObjectDB. Grepping only for `ObjectDB|leaked` misses per-test orphan counts; counting only per-test orphans misses exit-time RefCounted leaks."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The two surfaces

| Surface | Where | Cause | Fix shape |
|---|---|---|---|
| Exit-time ObjectDB warning | One block at process shutdown, names `GDScriptFunctionState` leaked instances and orphan StringNames | Suspended coroutines whose host was freed mid-`await`; lambdas-capture-self on signals | Rewrite the await pattern (signal-based, not polling); replace lambda with bound method |
| Per-test orphan counts | Yellow `N Orphans` line after every test method, throughout the run | `add_child` in tests without `add_child_autofree`; `Node.new()` without `autofree`; `queue_free` without `await wait_seconds(0.1)` | Route every test-side instance through GUT's autofree helper at the instance site |

Both count as "leaks" in colloquial review. Both need addressing on a clean PR.

## Pre-flight verification before claiming "zero leaks"

1. Run GUT, scan the full output (not just the tail).
2. Confirm no `WARNING: ObjectDB instances leaked at exit` block.
3. Confirm no per-test `N Orphans` lines where `N > 0`.

If only step 2 passes, the claim is "exit-time leaks fixed; per-test orphans remain at N".

## Why

The scratchpad `ai/scratchpads/gut-orphans-research.md` documents both surfaces; they are different defects with different fix shapes, and a `grep "ObjectDB"` filter sees only one. Caught on PR #651 after I rewrote `_await_tracker` in three dev panels (fixing surface 1) and then claimed zero leaks while every test still emitted 5-9 orphans.
