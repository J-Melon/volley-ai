---
name: feedback_no_direct_push_to_main
description: "Even small docs commits land via Challenge (PR) on a feature branch, not directly to main; the volley ruleset now enforces this and admin bypass is pull_request only"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Every change to volley's `main` branch lands via a Challenge. No direct pushes, no exceptions. Admin bypass on the branch ruleset was loosened to `bypass_mode: "always"` historically; tightened to `bypass_mode: "pull_request"` on 2026-04-28 after I direct-pushed `38051f7` (a one-line docs change to `ai/skills/gru/dispatch.md`) and Josh asked for a ruleset to enforce the convention.

**Why:** every Challenge produces a Linear-anchored audit trail (issue + PR + Battle + reviewer labels). Direct pushes skip that and leave the change unattributed. The convention also means a docs change on the dispatch skill goes through a Battle round, which catches the kind of slip a single-keystroke push doesn't.

**How to apply:**

- Even single-line docs and skill edits: branch (`chore/<topic>` or `feature/<gh-number>-...`), commit, push, open Challenge, let Battle / merge queue land it.
- The ruleset blocks direct pushes from any actor including admin. If a push fails with the ruleset error, that's the gate working; do not try to bypass.
- For agent-facing skill docs (`ai/skills/**`) that need to land before a future dispatch reads them, the Challenge can fast-track via Josh's approve, but it still goes through the Challenge surface.
- If a Linear issue doesn't exist for the change, file one first per `feedback_swarm_ambiguity_and_labels` ("every Challenge has an issue").
