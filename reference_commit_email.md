---
name: Commit email is josh@hartley.best, not volcanoem
description: Use josh@hartley.best for commit author email; volcanoem@gmail.com resolves to an old Gravatar with an Arceus avatar that shows on the challenge
type: reference
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Josh's git author email for commits is **`josh@hartley.best`**. His global git config already sets this, so running `git commit -s` without overriding `user.email` picks it up automatically.

Do NOT pass `-c user.email=volcanoem@gmail.com` on git calls. `volcanoem@gmail.com` is an older secondary email that resolves to a Gravatar with an Arceus profile picture, which then shows as the commit author avatar on GitHub. Ugly and wrong attribution.

The environment hint at the top of sessions says "volcanoem@gmail.com" for the user's email; that refers to Josh's Claude-auth email, not his commit author email. They are different.

Quick check: `git config --get user.email` in any worktree returns `josh@hartley.best`. If something different comes back, something's wrong.

**Sign-off name is `Josh`, not `Josh Hartley`.** The DCO check requires `Signed-off-by:` to match the git author name exactly. Josh's `user.name` is `Josh`. Brief implementer minions with `Signed-off-by: Josh <josh@hartley.best>` — adding a surname breaks DCO with `expected: Signed-off-by: Josh <josh@hartley.best>` even though the email is right. 2026-04-30 (Goggle Squad PR #558): I briefed two consecutive Slartibartfast dispatches with `Josh Hartley` in the sign-off, both commits failed DCO, and the no-amend/no-force rules made the fix awkward. Don't repeat.
