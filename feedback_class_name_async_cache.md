---
name: class-name-async-cache-bypass
description: "For a class_name X added in the current session: use load(\"res://path/to/x.gd\").new() rather than X.new(). The class-name cache updates async; the load form bypasses. FIRES when instantiating a freshly-created class_name in the same editor session."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

For a `class_name X` added in the current session: use `load("res://path/to/x.gd").new()` rather than `X.new()`. The class-name cache updates async; the load form bypasses.
