---
name: Only act on obvious, flag the rest for Josh
description: When running a refine/fix round on reviewer findings or ambiguous calls, act on the obvious and flag anything that needs Josh's judgement instead of silently deciding
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
In any fix pass, refine round, or ambiguous edit, separate what's obvious from what needs Josh's eye. Act on the obvious directly; surface the rest with the specific question rather than picking a path silently.

**Why:** Organiser judgement drifts without noticing. Deciding "remove unused function" or "change API shape" inside an agent brief assumes Josh would agree, which quietly shifts decisions away from him. Josh flagged this 2026-04-24 during the Chert refine dispatch on #345: "don't assume on things that need my attention, just things that are obvious."

**How to apply:**

**Obvious (act on):**
- Style fixes the reviewer named AND matches an existing memory rule.
- Defensive programming (`is_instance_valid()` guards, null checks) where the reviewer flagged a real risk.
- Test tautologies, dead-code with no plausible caller, typos, trailer drift.
- Nit-level ignores per existing "nit not block" rulings.
- **Stale memory entries on the topic just changed.** When a rule shifts (a skill rewritten, a process renamed, a verdict shape flipped), grep memory for the old wording and update or delete every hit in the same refine pass. Memory drift is what makes the same rule have to be flipped twice.

**Not obvious (flag, don't decide):**
- API shape (removing a public function, renaming a public method, changing signatures that callers might depend on). Even if "unused today," the intent may be a seam for a future caller.
- Architectural choices: which subsystem owns a new responsibility, whether a state machine should be in one class or split.
- Fix strategy where multiple credible approaches exist (one-shot signal vs validity guard vs redesign).
- Scope expansion: the reviewer flagged X; Y is adjacent and might or might not be in scope. Ask.
- Test coverage gaps flagged by a reviewer: fix if obviously missing, flag if it implies a design question ("should we even assert this").

When in doubt, flag. One extra turn from Josh is cheaper than an assumed-wrong decision landed in a commit.
