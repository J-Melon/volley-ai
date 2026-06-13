---
name: Correction-signal UserPromptSubmit hook
description: A user-level hook scans every user prompt for correction phrases and injects a system reminder to consider a memory update; complements sprint retros for in-the-moment cases
type: reference
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
There is a UserPromptSubmit hook at `~/.claude/hooks/memory-correction-signal.sh`, wired in `~/.claude/settings.json`. It scans every user message for case-insensitive correction phrases (`don't`, `stop`, `always`, `never`, `actually`, `remember`, `you didn't`, `you should`, `wrong way`, `isn't right`, `you forgot`, `missed`) and, on match, injects a `system-reminder` pointing me at `feedback_corrections_always_update_memory` (which now covers both the Josh-corrects and the self-spotted-miss triggers, after `feedback_continuous_rule_refinement` was merged into it 2026-06-08; the hook text may still name the old rule until the personal hook is updated).

**How to apply:**
- When a turn starts with that system-reminder present, treat it as confirmation Josh is correcting. Write or sharpen the relevant memory the same turn and commit it.
- Don't try to silence or work around the reminder; it is the floor of memory hygiene.
- If the reminder fires on a non-correction (false positive), still ignore-cost is one extra moment of consideration. Don't widen the heuristic to compensate.

**Where this fits relative to retros.** Sprint retros catch pattern-level rule drift; this hook catches small in-the-moment corrections so they land in memory before the next retro. The two are complementary, not redundant. If a finding is bigger than a one-line rule update (e.g. a new process, a workflow shift), defer it to the next retro instead of writing a half-formed rule from a single trigger.

**Don't add a second correction-detection hook.** This one already covers the surface; multiplying heuristics produces noise without signal.
