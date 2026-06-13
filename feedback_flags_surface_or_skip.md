---
name: We don't need flags right now; any flag added gets surfaced explicitly
description: Default to no flag (no production users, no A/B, no rollback requirement). When a flag is added, surface it in the PR title, commit message, and mission debrief, whether it gates production or guards a stacked refactor
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
Volley has no production users yet. There is no A/B test, no canary, no rollback gate. A flag added to the codebase is solving a problem that does not exist. Default behaviour: no flag. Land the change directly, or stack a sequence of PRs into a feature branch and merge the whole sequence.

When a flag genuinely has to land (e.g., to guard a partial refactor that has to ship in pieces across PRs), it gets surfaced explicitly so the orchestrator and Josh can decide whether it was the right call:

- **PR title** names the flag and its purpose. "Add `stored_balls_in_registry` scaffold" not "step 7 refactor".
- **Commit message** explains the lifetime: when it flips on, when it retires.
- **Mission debrief** lists every flag added during the mission, even the ones already retired before the mission closed. A flag that lived for ten commits and got deleted is still a flag worth naming.

**Why:** 2026-05-11 Banana Tank debrief. The `stored_balls_in_registry` boolean was added in #620, flipped in #627, retired in #630, all inside the same merge window before #608 hit main. It never protected a production user. The initial Pollux CI mining flagged this as "feature flag misnomer" and proposed a naming rule ("scaffold flag"). Josh sharpened: "flags should always be surfaced as we don't need them now anyway." The real rule is upstream of naming. We should not have added one.

**How to apply:**

- When implementing a refactor, prefer one PR or a stacked sequence into a feature branch over a flag-gated rollout.
- If a flag is the cleanest design, name it in the PR title, name its lifetime in the commit message, and surface it in the mission debrief.
- During CI pattern-mining, a flag added in the same mission it retired in is a finding regardless of naming. Flag flips and flag deletions appear in `git log -p -- '*.gd' | grep -E 'var \w+_flag|var enable_|var use_'` style passes.
- This supersedes the "feature flag is reserved for production gates" framing. The correct rule is "don't add flags now; if you do, surface them."
