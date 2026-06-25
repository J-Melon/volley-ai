---
name: tests-assert-player-observable-outcomes-not-internals
description: "Tests assert player-observable outcomes, not internal flag values. Use an external behaviour to prove a state change rather than reading a private var. FIRES when writing or reviewing a test that reads a private field or asserts on an implementation detail."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

Tests assert player-observable outcomes, not implementation details. Do not assert internal flag values when an external behaviour proves the same thing. A test that reads `_some_private_var` to check state is testing the implementation, not the outcome.
