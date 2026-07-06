---
name: feedback_public_surfaces_use_github_ids
description: "GitHub surfaces reference GitHub IDs; Linear IDs live on Linear. FIRES WHEN writing any public-facing text (PR body, commit message, branch name, comment, design doc heading) AND when a Linear SH-N appears in a draft heading for the open repo."
parent: trunk_dev_cycle
type: feedback
originSessionId: bed3f3f3-f3c4-4328-a4ef-01f91f897589
---

GitHub surfaces reference GitHub IDs (`#1076`, `Challenge #403`). Linear IDs (`SH-542`) live on Linear. The repo is open source; a reader of a public surface cannot follow a Linear ID, and Linear IDs are private workspace references.

This fires on every public surface: branch names, PR bodies, commit messages, GitHub comments, design doc headings in the open repo. Design docs in the public repo carry GitHub issue links in their frontmatter or first heading. When a brief depends on a Linear ID internally (e.g. dispatch label), use it there and translate before it reaches a public surface.
