---
name: Recurring rituals fire from a Linear recurring issue; planning fills the specifics
description: Every recurring ritual that produces a Linear issue should fire from Linear's native recurring-issue feature, with the body and field config held inside Linear; planning fills the specifics on the fired issue
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
Every recurring ritual that produces a Linear issue gets the same shape: Linear's native recurring-issue feature holds the body, the cadence, the labels, and the due-date offset, and fires the issue each cycle. The next planning beat fleshes out the specifics on the fired issue. Linear owns both the schedule and the structure; planning owns the content.

**Why:** 2026-05-11, working through the Carnival cadence. The path landed after three rounds of trimming. First reading reached for the `schedule` skill (remote cron agent); Josh: "do we need a cron agent does linear not handle this?" Second reading kept a repo template that Linear would re-paste from; Josh: "kill ai template carnival". The simpler shape is everything inside Linear, including the body.

**How to apply:**

When a ritual recurs:

1. **Linear recurring issue.** Configure in Linear's UI: cadence (every N days/weeks on a specific weekday), title pattern, body (with `TO FILL IN AT PLANNING:` placeholders for the specifics), label, due-date offset from creation, project (or none if cycle-wide). Linear fires the issue each cadence into Vault.
2. **Planning fills the specifics.** Whenever the planning beat runs, the planner opens the pre-fired issue, replaces the placeholders with the cycle's specifics, and promotes to Ready.
3. **Updates go through Linear.** The recurring-issue config is the source of truth for the body and the cadence. Edit it directly in Linear when the ritual's shape moves.

Scope:

- Recurring issues with a stable structure earn a Linear recurring-issue configuration.
- The remote `schedule` skill is a fallback for rituals that need dynamic field computation Linear's recurring-issue feature lacks (e.g., fetching cycle.startsAt to compute a non-fixed-offset due date). The Carnival case fits Linear's native shape.
- Repo `ai/templates/` is not the home for these bodies; Linear is. A repo copy invites drift.
