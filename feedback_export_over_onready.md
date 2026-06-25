---
name: export-over-onready-for-child-node-references
description: "@export over @onready for child node references. FIRES when writing or reviewing a @onready var that grabs a child node."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

Use `@export var` for child node references, not `@onready`. The designer sets exports in the scene; `@onready` hardcodes a node path that breaks on rename.
