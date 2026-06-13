---
name: Foundation issues block downstream production
description: Foundation work (style guides, pipelines, specs, spikes, discovery) should be set as blockedBy on the production issues that depend on its answers
type: feedback
originSessionId: 26df4970-7a24-40ba-a457-e03a80606c13
---
When structuring dependencies in a Linear project, identify the foundation issues and set them as `blockedBy` on every downstream issue that depends on their output. Examples:

- A style guide blocks visual production issues
- A tech/pipeline issue blocks asset and integration issues that need the pipeline
- A design spike blocks implementation issues that depend on the answer
- A spec issue blocks the build issues that follow from it

**Why:** Without this gating, downstream issues get started before the foundation lands, leading to rework when the foundation contradicts assumptions made in production. Josh has been explicit that asset/integration issues must wait for tech-pipeline answers.

**How to apply:** When adding or reviewing issues in a project, classify each as foundation (study/spike/discovery/spec/pipeline) or production (asset/integration/implementation). Wire `blockedBy` from each production issue back to the foundation issues whose answers it needs. If the foundation is unclear, ask before structuring the chain.
