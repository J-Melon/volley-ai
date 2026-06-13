---
name: New tech-related Linear projects need a design spike + tech spike
description: When Gru files a new Linear project that's tech-related, file the paired design spike + tech spike alongside it so scoping work starts before stories land
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When a new Linear project is filed for a tech-touching concept (dialogue system, bot item, reconciler, any system that needs both shape decisions and architecture decisions), file the paired spikes with it: one design spike, one tech spike, per `feedback_spike_split_design_tech`. Project + two spikes as a single creation pass.

**Why:** Reinforced 2026-04-24 after I filed the Dialogue and Bot projects without spikes. Josh: "new projects need a spike if tech related." Projects without scoping spikes risk story issues getting drafted against unstated assumptions; spikes are the scoping pass that pays that cost up front.

**How to apply:**
- After `mcp__linear__save_project`, file two spike issues in the same turn:
  - **Design spike**: shape, feel, player experience, narrative framing. Label `spike`. Estimate 1.
  - **Tech spike**: architecture, data model, integration seams, dependencies. Label `spike`. Estimate 1.
- Both go into the new project at Vault.
- Use the issue-writer minion for the drafting per `feedback_dispatch_work_keep_reasoning`.
- If the project is purely art/music/writing/design with no tech surface, the paired-spike rule doesn't apply (use discipline-native exploration issues instead).
- Exception: if a design doc already exists and the project just implements it, a single tech spike covers the implementation scoping. State that explicitly in the tech spike's context so the absence of a design spike is intentional, not forgotten.
- Don't promote the spikes straight to Ready; let Josh pull them into a cycle per `feedback_scrum_horizon`.
