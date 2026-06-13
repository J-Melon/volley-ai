---
name: Confirm before creating Linear issues
description: Always ask before creating new Linear issues; do not file them unilaterally
type: feedback
originSessionId: deb199f4-304c-4a2c-8531-39e6504933fc
---
Always confirm with the user before creating any new Linear issue. List the issues you would file, their titles and a one-line intent, and wait for approval. Do not create them up-front even when the issues are obvious follow-ups from a review, a design doc, or observed bugs.

**Why:** The user owns backlog shape. Proactively filing issues clutters the backlog and takes control of prioritisation away from them. The earlier memory "Only create issues when cycle needs points" is related but this one is broader: confirm even for bugs, refactors, and clearly-scoped follow-ups.

**How to apply:**
- When the user asks me to address a review, land the fixes that fit this challenge and list the remaining items as "candidates for follow-up issues" with titles and intent, then ask which to file.
- When I identify a bug or gap mid-task, mention it and ask rather than filing it.
- Exception: if the user explicitly says "file an issue for X", proceed.
- **Minions do not shape issues at all.** This rule binds dispatched minions even more tightly than Gru. Minions surface observations in prose ("the equip path also writes to X without a placement update") and stop. They do not write candidate titles, acceptance criteria, "follow-up tickets we should file" lists, or any ticket-shaped artifact, whether in a PR body, a design doc, or a Linear comment. Whether something is a ticket, what its title is, what its AC reads, is Josh's call entirely. Strip ticket-filing AND ticket-shaping steps out of any minion brief before dispatch. Codified in `ai/skills/gru/dispatch.md` Ground Rules.

**Tickets are for bigger work, not the under-30-minute kind.** If the work can be done inline in under ~30 minutes, do it inline; don't file a ticket. Filing for sub-30-min work clutters the backlog and burns more time than the work itself. Surfaced 2026-05-10 after I filed SH-376 (DevHUD toggle for grab-area overlay) which Josh immediately folded back into the active PR — the toggle was a small wiring change, not ticket-shaped work. Pairs with `feedback_dont_defer_current_goal.md`: the bar for filing is real new scope, not "I noticed something."
