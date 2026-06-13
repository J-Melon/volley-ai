---
name: Use short SHAs in challenge review comments and commit references
description: In challenge comments, reviewer replies, and commit references, use the 7-character short SHA, not the 40-character full hash
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When referencing a commit in any challenge comment, reviewer reply, threaded response, or prose in a challenge body, use the short SHA (7 characters, e.g. `67b2f56`) rather than the full 40-character hash. GitHub links both forms; the short form is the repo convention and keeps comments scannable.

**Why:** Chauffeur used the 40-char hash in three challenge replies on #345 on 2026-04-24 while everyone else in the repo used 7-char. Josh flagged the inconsistency. The short form matches git's own default display (`git log --oneline`, `git log --pretty=format:%h`), `gh pr view`'s commit listings, and the running convention across the session's reviewer replies.

**How to apply:**
- Reply templates: "Fixed in `<7-char-sha>`" not "Fixed in `<40-char-sha>`".
- When briefing a sub-agent who will post replies, include "use 7-character short SHA" in the brief so this doesn't slip.
- When returning a SHA from a sub-agent's summary, trim to 7 characters before using it in comments. Keep the full SHA available in the agent's return if needed for disambiguation, but don't paste it into user-facing comments.
- `git rev-parse --short HEAD` is the source if you need to compute it.
