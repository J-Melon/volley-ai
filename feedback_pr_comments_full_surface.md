---
name: Pull every PR comment surface, not just gh pr view
description: When checking for PR feedback, query line-anchored review comments and issue-level comments separately; gh pr view --json comments misses inline review comments
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When asked "did they see the comments" or auditing PR feedback, query both surfaces - `gh api repos/<owner>/<repo>/pulls/<n>/comments` for line-anchored review comments AND `gh api repos/<owner>/<repo>/issues/<n>/comments` for top-level conversation comments. `gh pr view --json comments,reviews` only returns issue-level comments and review wrappers; the inline review comments themselves live in a separate endpoint and will be missed entirely.

**Why:** Josh's six inline comments on PR #533 sat unaddressed for an entire reviewer fan-out and refine cycle because Gru queried `gh pr view ... --json comments,reviews`, saw zero issue-comments, reported "no top-level PR comments exist," and never inspected the line-anchored `pulls/<n>/comments` surface where Josh's actual feedback lived. The swarm reviewers also did not surface them because each reviewer scoped to their own findings, not to whether new author-authored comments arrived.

**How to apply:** Whenever the question is "what's outstanding on PR #N" or "did anyone comment on this PR" - including when triaging reviewer reports, before the organiser posts a bot synthesis review, or when Josh asks "did they see X" - pull both endpoints with `--jq` filters that include the author login, and explicitly check for non-swarm authors (Josh, anyone outside the agent codename pool). A swarm-clean PR with open author comments is not done.
