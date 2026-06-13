---
name: data-driven-config-justifies-itself-only-when-the-state-space-uses-most-fields
description: "Before adding a Resource subclass + N .tres files for state bundles, count the degrees of freedom across the actual instances. If a field is identical in all instances (dead field), drop it. If multiple fields move in lockstep across all instances, collapse them. If two instances are bitwise identical, reuse one .tres. Triggers when reviewing any new `*Config` Resource that ships with multiple .tres siblings, or when designing one."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The diagnostic

For each `@export var X` in the config:

- Compare X's value across every shipped .tres instance.
- If X never varies, X is a dead field. Drop it; the default lives on the host class.
- If X always varies in lockstep with another field Y, collapse to one standard field with a method that resolves both.

For each .tres instance:

- If two instances have bitwise-identical contents, the second is a copy-paste artefact. Reuse one resource across both states.

After the trim, count remaining unique-content .tres files. If the count is less than ~3, the data-driven layer is over-abstracted for the current state space; imperative `set_X(bool)` methods on the host class are cleaner.

## Why

PR #652's `BallStateConfig` shipped 5 .tres files with 6 fields each (30 cells). Actual variation was 2 binary dimensions plus 1 dead field, giving 3 unique physical setups. The bundle costs 5 files of authoring overhead for what 3 reused files or 2 imperative booleans would express. Data-driven is the right reflex when the state space is large or designer-tunable; for a 2-dim binary product it inverts the cost.

## How to apply

- When dispatching a `data-drive X bundles` ticket, include in the brief: "diagnose the state space first; if it's small, propose either reuse or imperative".
- When reviewing a new `*Config` Resource: build the cross-instance value table before approving the abstraction.
- The deadness check (one field, same value everywhere) is the cheapest signal; do that first.
