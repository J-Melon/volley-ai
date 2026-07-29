---
name: feedback-never-hand-type-signoff
description: "Never compose a Signed-off-by trailer by hand; always let `git commit -s` generate it. Hand-typing it is how the identity drifts from the real git author and DCO fails."
metadata:
  node_type: memory
  type: feedback
  parent: trunk_dev_cycle
  originSessionId: aabf3114-c45a-4533-8a7d-6a7726669ec1
---

I never type a `Signed-off-by:` line into a commit message by hand. I always let `-s`
generate it (`git commit -s -m "..."`), which derives the trailer from `git config
user.name`/`user.email`, so it always matches the real commit author.

**Why:** on 2026-07-29 I hand-typed `Signed-off-by: Josh Hartley <volcanoem@gmail.com>`
on five commits in a row on `feature/1178-1179-ball-subclasses`, and DCO failed on all
five. The real git identity was `Josh <josh@shuck.gg>` (confirmed via `git config
user.name`/`user.email`), sitting right there the whole time. The wrong identity came
from conflating two unrelated things. `volcanoem@gmail.com` is the Claude Code account
email visible in my own session context (`~/.claude/*.json` `emailAddress` field), not
the repo's git identity, and "Hartley" was a surname I invented to go with "Josh" since
that's all I had from conversational context. I never checked `git config` before
typing the trailer, and the `commits` skill (`.claude/skills/commits/SKILL.md`) already
said not to: "Let `-s` generate the sign-off... Typing it by hand is how the name
drifts and DCO fails." This was a non-firing of an existing, correctly-worded rule,
not a missing one. See [[feedback_agents_commit_like_team]], which also defers commit
shape to the `commits` skill.

**How to apply:** any time I'm about to compose a commit message, whether via `Bash`
directly or in a written-out heredoc, use `-s` and never write the `Signed-off-by:`
line into the message text myself. If I ever find myself typing "Signed-off-by" by
hand, stop, that's the exact failure mode. If a Signed-off-by trailer is somehow still
needed as literal text (e.g. amending a commit made without `-s`), read it from
`git config user.name`/`git config user.email` first, never from session/account
metadata or a guessed name.
