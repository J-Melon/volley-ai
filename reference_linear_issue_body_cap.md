---
name: reference_linear_issue_body_cap
description: "Linear issue bodies are capped at 600 chars by a save_issue gate; draft to ask + acceptance criteria only, move depth (options, rationale, design detail) into a designs/ doc linked via the links field"
metadata: 
  node_type: memory
  type: reference
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

`save_issue` rejects issue descriptions over **600 characters**. The gate message: "Trim the body to the ask + AC and move the depth (options, rationale, design detail) into a designs/ doc linked via the issue links field."

So an issue body is: a tight statement of the ask plus the acceptance-criteria checklist, nothing more. Bug-report and user/system-story scaffolding (full Steps to Reproduce, Environment blocks, expected-vs-actual prose) blow the cap fast; compress to the essential ask. Reproduction depth, design rationale, and options live in a `designs/` doc, linked via the `links` field, not pasted into the body.

Draft to the cap from the start instead of trial-and-error trimming.
