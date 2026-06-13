---
name: reference_godot_testing_frameworks
description: Godot 4 ships NO built-in unit-test framework; Volley uses GUT (third-party). GUT has no display names and only one level of inner-class grouping.
metadata: 
  node_type: memory
  type: reference
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Godot 4 has **no engine-native unit-testing framework**. Both real options are third-party
Asset Library plugins: **GUT** (Godot Unit Test, v9.x for Godot 4, what Volley uses) and
**GdUnit4** (fluent assertions, mocking, scene testing, C# support).

GUT's organisation toolkit, verified against `addons/gut/test_collector.gd` and the GUT docs:

- **No custom display names.** A test's identity is its `func test_*` function name. There is no
  decorator or title string. The function name must read as the sentence.
- **One level of grouping via inner classes.** An inner `class X extends GutTest` is collected as
  a group (named `path[X]`) with its own `before_all`/`before_each`/`after_each`/`after_all`.
  Deeper nesting is explicitly NOT implemented (commented out in test_collector.gd).
- **Test order within a class is not guaranteed**, so tests must not depend on run order.

So when organising a suite: file = surface, inner class = one sub-group with its own fixture,
function name = the behaviour sentence. No describe/it.

Learned while auditing the suite for SH-430. I had asserted "Godot 4 ships its own testing
convention" without checking; it was false. See [[feedback_self_judgment_is_coherence_not_accuracy]]:
stated engine capabilities are exactly the kind of confident-but-unchecked claim to verify first.
