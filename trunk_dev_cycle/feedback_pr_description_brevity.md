---
metadata:
  node_type: memory
name: Keep challenge descriptions as short as possible
parent: trunk_dev_cycle
description: challenge bodies are short; one sentence of what + one of why (only if non-obvious) + any real risks. No session history, no narrative padding.
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
metadata:
Earlier feedback said challenge descriptions are narrative, not a changelog of files. That's still true, but "narrative" was over-indexed in practice: bodies grew to three paragraphs with session context, self-justification, and meta-commentary on why the rule was being added. Josh wants the same info in a fraction of the words.

**Why:** Josh reads every challenge. Long bodies waste his time on content he can infer from the issue or the diff. Every extra paragraph buries the load-bearing claim.

**How to apply:**

Aim for one short paragraph or a 3-5 bullet list. Include:
- **What the challenge does**; one sentence.
- **Why**; only if non-obvious from the issue title.
- **Manual follow-up or risk**; only if present.

Cut:
- Session history ("this came up three times today").
- Rationale that duplicates the issue AC.
- Meta-commentary on why the rule is being added.
- "Test plan" sections (already forbidden by earlier feedback, worth restating).
- Restatements of the commit message.

**Good:**
> Swap release.yml to Linux-only. macOS and Windows ship via their own channels; Web preview keeps its channel on `publish.yml`. Manual step: mark `html5-preview` upload "play in browser" on itch once.

**Bad:**
> This challenge addresses the issue where the preview deploy workflow was overwriting release builds on itch. After discussion in the session, we identified that the cleanest approach would be to... (three more paragraphs).

Same information, one third the length. Go with shorter.
