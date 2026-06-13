---
name: Search memory before writing a new rule; refine existing files instead of duplicating
parent: feedback_memory_writing
description: Before creating a new memory file, grep MEMORY.md and the topic keywords for an existing rule. If one exists, sharpen or extend it in place. Only create a new file when the topic is genuinely new.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
Before writing a new memory file, search the memory directory for an existing rule on the same topic. If one exists, refine or extend it in place; do not create a parallel file. Only create a new memory when the topic is genuinely new ground.

**Why:** 2026-05-10. In one session I created `feedback_no_rebase_without_explicit_go` (duplicating `feedback_never_rebase`) and `feedback_prototype_folder_is_notes_not_fiction` (duplicating `feedback_discipline_folders_are_fiction`). Both got removed on dedup. Index gets noisy and rules drift between near-identical files.

**How to apply, before writing a memory:**

1. **Grep** the memory dir for the topic's keywords (rebase, draft, approved-human, fiction, parallel, etc.). Look at returned filenames and frontmatter `description` lines.
2. If an existing file covers the same rule, **refine it**: add a new bullet under "How to apply", extend the "Why" with the new incident, or sharpen the description. Re-run grep to catch sibling rules that pair with it.
3. If the existing rule is broader and yours is a specific sharpening, add the sharpening as a bulleted clause inside the existing file (the recent "implementer briefs with judgment calls" landed inside `feedback_ask_more_questions` this way).
4. Only when the topic has no existing memory or the new angle is genuinely orthogonal: create a new file.
5. When refining, update both the existing file's body and (if its description line lags) the MEMORY.md index entry.

**Refining is not erasing.** Keep the original incident and rule intact; add the sharpening alongside. The "Why" section becomes a record of when the rule got tested or extended.

**Pairs with [[feedback_corrections_always_update_memory]]** (the broader instruction that a correction or self-spotted miss refines memory in-flight). This rule operationalises that one against the duplicate-creation failure mode. Finding the existing rule is a forest DESCENT (open the relevant trunk, read its branch index), not a flat grep of the whole corpus ([[feedback_descend_the_forest]]); grep across SURFACES is for cross-repo reconciliation, not for locating a node in the graph.
