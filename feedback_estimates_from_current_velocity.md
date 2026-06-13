---
name: Time estimates ground in current velocity, not generic project-size math
description: when estimating how long work takes ("weekend project", "afternoon", "a day's work"), derive from observed velocity (recent commits, points shipped, cycle throughput), not textbook project-size intuitions
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When I give Josh a time estimate for work; "weekend project", "morning's work", "a day", "half a cycle"; anchor it to the actual velocity the team has been hitting, not generic intuitions about how long similar-sounding work tends to take. The numbers should be traceable to observed throughput: recent cycle points landed, commits per week, missions closed per cycle, whatever meter fits.

**Why:** Generic estimates sound reasonable but aren't useful for planning. Volley ships at a specific pace today (Josh + contractors + agents); a "weekend project" for a AAA team is a different beast from a weekend at current Shuck velocity. Reinforced 2026-04-24 after I called a Cloudflare Workers ntfy replacement a "weekend project" on generic hobby-scale intuition; Josh said estimates should be based on current velocity.

**How to apply:**
- Before sizing work, look for observable data: last cycle's completedScopeHistory, git log throughput, recent similar-sized issues and how many cycle-days they actually ran.
- State the observed metric first, the projection second. "Last cycle landed 15 points over two weeks, and the ntfy rewrite reads as roughly 5 points against similar work (SH-X, SH-Y)" beats "weekend project."
- If no comparable work has shipped yet, say "no velocity reference for this shape; rough order-of-magnitude only" rather than passing a generic figure off as grounded.
- Applies equally when velocity suggests the work is bigger OR smaller than I'd intuit. Don't anchor to one direction.
- Stale velocity data (older than one cycle) gets flagged as stale, not quoted as current.
- Cost/resource projections are adjacent but separate; that rule falls out naturally from the same discipline, but the primary concern here is time.
- **Small mechanical changes are 5 minutes, not 30.** When the change is a few lines of well-understood logic on an existing surface (a clamp swap, a baseline-source change, a type promotion on an @export), don't pad to 30 minutes. Sharpened 2026-05-10 after I sized "switch grab baseline from body collider to sprite" and "promote HeldBody.press_area to GrabArea" at 30 and 45 minutes; Josh: "your times are off each of those is more like 5 mins." My estimates were running ~6x high on this shape of work, which inflates the ticket-vs-inline threshold (`feedback_confirm_before_tickets.md`) and pushes me to defer or ticket work that should land inline. Tighten by counting the actual lines and seams the change touches, not by adding speculative-failure-mode buffer.
- **Points are retired; size in wall-clock days.** A ticket "fits" if it's 1-3 days of work. Don't reach for the points field, don't argue scope-by-points (e.g. "that's 8+ pts, split it"). Size work in days against current velocity and gate on the 1-3 day window. Sharpened 2026-05-15 after I framed a per-limb expansion as "8+ pts, re-estimate"; Josh: "points don't exist now so as long as it is a 1 - 3 day issue it fits." Above 3 days → split. Within 1-3 days → fits one ticket regardless of perceived scope.
