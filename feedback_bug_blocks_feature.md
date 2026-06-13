---
name: Regression bugs block their source feature issue
description: When a bug is a regression from a recently shipped feature, link it with blocks, not relatedTo
type: feedback
originSessionId: d3492d2a-f090-42d1-ac35-103c678183d0
---
When a bug issue is a regression traceable to a specific feature or challenge, link it as `blocks` the source feature issue, not `relatedTo`.

**Why:** `blocks` expresses the intent correctly: the feature is not truly done until the regression is fixed. `relatedTo` is too weak and gets lost in the noise.

**How to apply:** When filing a bug that was introduced by work on an identifiable feature issue, set `blocks: ["SH-<feature-id>"]` on the bug. If the source challenge bundled multiple issues (e.g. SH-103 folded SH-34 in), block every issue the challenge closed; each one is individually at risk until the regression clears. Use `relatedTo` only when the issues reference each other but neither gates the other.
