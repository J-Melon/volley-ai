---
name: User runs sudo commands in terminal
description: Don't suggest ! prefix for sudo commands: user runs them directly in their terminal
type: feedback
---

Don't show `! command` suggestions for commands that need sudo or interactive input. The user runs these directly in their terminal.

**Why:** User prefers to run sudo commands themselves without being prompted via the ! prefix syntax.

**How to apply:** Just describe what command to run without the `!` prefix formatting when sudo is involved.
