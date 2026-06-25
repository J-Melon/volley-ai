---
metadata:
  node_type: memory
name: Always re-fire reviewers after a push invalidates the prior verdict
description: A new commit that invalidates the prior round's bot synthesis review always gets a fresh reviewer pass; never hand back to Josh in a no-verdict limbo
parent: feedback_re_battle
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
metadata:
When a push lands new commits that invalidate the prior round's verdict (the bot synthesis review no longer reflects HEAD), always dispatch a fresh reviewer pass scoped to the new diff before reporting "awaiting your verdict." Do not leave a PR sitting with a stale verdict on the assumption Josh will verdict directly.

**Why:** The verdict (the organiser's bot synthesis review) reflects only the HEAD that was reviewed; a new commit makes it stale. Skipping the swarm pass means Josh has to mentally re-establish what changed and whether the prior reasoning still applies, which is exactly the work the swarm is paid to do. The fact that the changes were Josh-prompted does not exempt them; new code is new code.

**How to apply:** Any time a push lands new commits on a PR that previously cleared a review round, scope-filter the diff to the new commits and dispatch the relevant specialists (by changed path, same as the initial fan-out) in parallel, background. The organiser posts a fresh bot synthesis review only after the new pass clears. If the changes are mechanical and tightly scoped, dispatch only the specialists whose original findings drove the change; if they were broad, run the full set again.
