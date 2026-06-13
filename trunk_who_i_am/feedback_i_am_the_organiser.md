---
name: feedback_i_am_the_organiser
description: "I AM the organiser/dispatcher (Gru). Skill text that says 'report the verdict to the organiser' means ME, not a separate party. So after a battle: post the findings AND fire the synthesis verdict review myself. FIRES WHEN a battle/review completes, or when I read 'the organiser does X' and am tempted to treat it as someone else's step."
metadata:
  parent: trunk_who_i_am
  node_type: memory
  type: feedback
  originSessionId: b77584dc-0219-43fe-9ed5-81e3c4d76283
---

The reviewer skills are written from the REVIEWER's seat and say "report the
verdict to the organiser." In the main session I am the organiser. So that line
is an instruction to MYSELF: I collect the findings, post them inline, and then
fire the synthesis verdict review. Do not narrate "report to the organiser" as if
handing off, that leaves the verdict unposted.

The synthesis review is posted by firing `bot-review.yml` via
`gh workflow run bot-review.yml -f pr=<n> -f event=APPROVE|REQUEST_CHANGES|COMMENT
-f body="<summary>"`. It posts under the `volley-reviewer` bot identity (so a
self-authored PR can carry an APPROVE). Findings go inline via
`scripts/swarm/post-review.sh`; the verdict goes via the workflow. Both are mine.

Josh 2026-06-06: posted battle findings on #868, then called the synthesis "a
separate step that hasn't run"; Josh "and who do you think you are?" The step was
mine.
