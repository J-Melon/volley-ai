---
name: pattern-findings-fix-all-instances-not-just-the-named-line
description: "When a reviewer (or Josh) flags a CLASS of anti-pattern (impl-detail assert, dead constant, bundle-as-software-term, em dash, hardcoded test number that should be a stat read, etc.), grep the whole codebase for the class and fix every instance in the same commit. Triggers on any review comment that names a pattern shape rather than a single bug. Reactive fix of only the named line invites the reviewer to flag the next instance in a future round and burns dispatches."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

A class-of-pattern finding is not a point fix. The reviewer named one instance; the fix sweeps all of them.

Common shapes:

- "this assert is impl-detail" → grep tests for the same shape, drop or rewrite all of them.
- "this constant is dead" → grep refs across `tests/`, `scripts/`, `designs/`; if only test anchors keep it alive, rewrite the tests AND drop the constant.
- "scope parens in commit / PR title" → audit pending commits and PR title; both surfaces, same rule.
- "em dash" → fix every em dash in the message / file the hook surfaced.
- "bundle / shorthand / dead jargon" → grep the term across code, docs, tests, Linear; rip it out everywhere.

## Pre-flight check before declaring a class-finding fixed

Run the grep that matches the class. Confirm zero remaining hits. Only then commit and reply.

## Why

PR #652 round 2 (2026-05-14): I dropped four `physics_material_override == Ball.PLAY_MATERIAL` asserts from one test file plus the two consts. Reported done. Josh flagged: the rule is "asserts do a full sweep", not "fix the four I named". The point-fix mindset converts one round of review into N rounds where N is the number of instances. Sweeping in one pass costs the same to write and ends the review thread.
