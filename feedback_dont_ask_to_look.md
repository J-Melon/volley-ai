---
name: Don't ask user to look at things
description: Always read files and check things directly instead of asking the user to look
type: feedback
---

Never ask the user to look at, check, or read something when a tool can do it. Use Read, Bash, Grep, etc. to get the information directly.

**Why:** User explicitly asked for this: it's unnecessary friction when the tools are available.

**How to apply:** Before asking the user to "check X" or "look at Y", ask: can I read/run/grep this myself? If yes, do it.
