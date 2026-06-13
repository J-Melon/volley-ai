---
name: linear-points-retired-do-not-set-estimate-field
description: "Volley's Linear setup no longer uses story points. Do NOT set the `estimate` field when creating or updating issues. Triggers on any `mcp__linear__save_issue` call or workflow that previously sized work in points (Fibonacci or otherwise). Use time-from-velocity language for forecasts (see `feedback_estimates_from_current_velocity`)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

Linear tickets in Volley do not carry a story-point estimate. When filing or updating an issue:

- Do not pass `estimate` to `mcp__linear__save_issue`.
- Do not propose a point value in PR descriptions, dispatch briefs, or design docs.
- Do not size work as "this is a 3" / "5 pointer" / "Fibonacci-up".

Forecast work in **time terms grounded in observed velocity**, per `feedback_estimates_from_current_velocity`: "morning's work", "two cycles at current throughput", "half a day if the test surface holds." The velocity reference replaces the points unit.

## Why

Points were a Fibonacci-sized agile-style estimate field on Linear issues. Retired going forward. The historical rules (`feedback_no_pointing_issues`, `feedback_ticket_creation`'s "create when cycle needs more points") referenced the same dead concept; they are superseded by this file.

## What replaces points

| Old shape | New shape |
|---|---|
| "Estimate: 3 points" | "Estimate: half a day at current velocity" |
| "Cycle needs 8 more points" | "Cycle needs more work scoped to fit; check throughput history" |
| "Bug estimate: 0, spike: 1" | No estimate; the work-type label (bug/spike/feature) is the only sizing signal |
