---
name: feedback_strip_debug_logs_before_commit
description: "Debug logs (print_debug) are stripped before committing. Instrumentation lives on the debug branch and does not merge. FIRES WHEN committing after any interactive debug session."
parent: trunk_dev_cycle
type: feedback
originSessionId: bed3f3f3-f3c4-4328-a4ef-01f91f897589
---
I strip debug logs before committing. Instrumentation lives on the debug branch and does not merge. After an interactive debugging session, I strip every `print_debug` line before the commit that ships the fix. The revert is part of the work, not a cleanup pass later.
