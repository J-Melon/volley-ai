---
name: what-a-ride-is-and-its-lifecycle-open-retire-successor
description: "a Ride is Josh playtesting as Agnes; the dispatcher supports never drives; it stays open while its challenge is open, retires on merge, successors increment the codename, files straight to Ready"
metadata: 
  parent: trunk_dev_cycle
  node_type: memory
  type: feedback
  originSessionId: bed3f3f3-f3c4-4328-a4ef-01f91f897589
---

**A Ride is Josh's playtest session.** He plays the build as Agnes, hands on the controller, finding things. It is a confidence pass on merged or in-flight work, verification, not the work itself. The `ride` label on a Linear issue names whose work it is, not a start signal. Gru/the dispatcher supports (capture findings, verify in-editor, track) and never drives the Ride, never dispatches fixes during it, never treats the Ride as a tracking umbrella for its AC children.

A Ride has a start (Josh picks up the controller) and a done (he signals it). Recon, planning, and dispatch all happen OUTSIDE the Ride. Choosing the work is not starting it (same gate as [[feedback_dandori_is_planning_not_execution]]). Do not narrate the fix stage as underway ("your ride from here", "as you land each fix") before Josh has started playing.

**Why (definition):** 2026-05-24 on Anteater (#719 / SH-426) I read the five-AC Ride description as a tracking umbrella and twice proposed closing it after the children landed; Josh: "you understand what a ride is yes?" 2026-05-28 on SH-434 Anteater 2 recon I repeatedly narrated the fix stage as already happening while nothing was fixed and Josh had not started; Josh: "why did you say ride? we haven't even fixed them yet", then "you know what a ride is and it's not that, you keep getting stuck on this".

## Lifecycle vs the challenge

A Ride verifies a specific challenge build. While that challenge (PR) is still open (Draft, Ready, blocked, pending), the Ride stays in place; new findings amend the challenge and the same Ride re-rides the patched build. The Ride is not an umbrella for its ACs: when its AC list maps onto separate bug/feature issues in the same milestone, those children are the challenge bundle it verifies, and it stays open while any are unmerged. Josh closes it himself after riding the merged build.

**Raising the Ride is fine; updating it waits for merge.** Naming the Ride as the mission umbrella, and noting that a child move feeds into it, is useful orientation, do that freely. What waits until every mission issue is merged is any *action* on the Ride: checking/unchecking its AC, changing its state, treating its AC as a live checklist. When a child issue retires, gets refiled, or splits (e.g. SH-432 retired in favour of SH-453), square the child and the PR refs and mention the Ride implication if relevant; just do not touch the Ride's AC or state until the mission's issues are all in.

Once the challenge clears (merges), the Ride is retired, never recycled (a Ride on a merged challenge is a stale post-mortem). If verification is still owed, file a successor against the next challenge.

**Why (lifecycle):** keeping a Ride open against merged work mixes "what we still need to confirm" with "what's already on main". Reinforced 2026-05-24 on SH-426 (twice proposed closing it because children landed). Reinforced 2026-05-29 on SH-434 Anteater 2: while retiring a child bug (SH-432) I asked whether to uncheck the Ride's wall AC; Josh: "this is something we only need to worry about once all issues concerning the mission are merged", then clarified "ride should be raised just not updated until merge", raising/referencing is fine, it is *updating* the AC/state that waits for merge.

**How to apply:**
- Challenge open, new findings: keep the Ride; comment findings on the PR; it re-rides the fixed build.
- Challenge merges, Ride still open: retire it, file a successor against the next challenge.
- Sanity check before keeping/filing: `gh pr view <n> --json state,mergeStateStatus`; if merged/closed, retire-and-replace.

## Successor naming

When a Ride is retired or cancelled and a successor is needed, keep the **mission stem** so the lineage stays searchable; never pick a fresh two-word alliterative. The default suffix is an integer (`<Mission> 2`, then `3`), cheaper signal and trivially sortable. (SH-228 Kyle Patrol to SH-319 "Kyle Patrol 2"; Josh: "just ++ on the mission so kyle patrol 2", 2026-04-28.) But **Josh may name the successor with a themed suffix on the same stem** and that is fine: it is his call as the namer. (Anteater to "Anteater: More Ants" to SH-457 "Anteater: Fall of the Ants", 2026-05-29; Josh renamed mid-file from "Return of the Ants".) The rule is one stem, not one numbering scheme. I default to the integer; I do not override a themed name Josh gives. Carnival/Heist and other 1:1 ritual issues follow the same stem-preserving pattern.

## Filing skips the Vault hop

General rule: new tickets land at Vault and Josh promotes them. **Rides are the exception.** File a Ride directly into Ready, into the active cycle, assigned to Josh (he sits in the Agnes seat). Do not park a Ride in Vault. ("rides dont count for that rule", 2026-04-28, after I filed SH-319 in Vault.)
