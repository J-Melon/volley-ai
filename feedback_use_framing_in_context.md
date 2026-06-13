---
name: Use the Lair framing vocabulary when working in-mission
description: once a mission is live, use the coined vocabulary (Dandori Challenge, Dandori Battle, Carnival, release, etc.) in conversation, not the Linear/GitHub-native synonyms
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When a mission is in flight, use the Gru-verse vocabulary in conversation: **Dandori Challenge** for the challenge, **Dandori Battle** for the adversarial review round (verb form: *contest*, past participle *contested*), **Carnival** for the build, **release** for the deploy moment, **Mission briefing** for the setup, **Mission debrief** for the wrap. Josh chose this framing precisely so it lands in day-to-day talk; reverting to "challenge" or "review" mid-mission signals the framing isn't real.

"Battle" is the event-noun. The action verb is **contest**. "Marvin contested #345." "The diff cleared Battle." Avoid "battled" as past participle; it reads off.

**The release chain has an ordering that matters.** Challenge opens → Battle contested → Battle clears → merge (Completed state) → **ride** (single-feature smoke playtest) → rides accumulate → **Carnival** (full playtest gate, all three Gru Sisters) → **Heist** (release operation) → Heist ends in a **release** (shipped to public). Do NOT say "ready for the release" or "on the release" about a merged Challenge; release is the outcome of the Heist, several steps downstream of merge. A merged Challenge lands in **Completed** and queues for a ride. Reinforced 2026-04-24.

**Battle is hands-on, not just diff-review.** Battle covers everything between Challenge open and merge: agent reviewers reading the diff AND Josh exercising the built game pre-merge to surface findings that the diff alone won't show (regressions, visual drift, gameplay feel). Findings Josh produces by playing the build during this window are Battle findings, not Ride findings. Ride is strictly post-merge: the feature is in `main`, the build is what shipped, the smoke test confirms it stays clean for the player. Reinforced 2026-04-25 on Challenge #403 after I called Josh's pre-merge gameplay session a Ride and he corrected: "not ride, battle." Trigger: pre-merge play = Battle; post-merge play = Ride. Status of the labels and the merge gate is the tell.

**Spike Ride is issue creation.** A spike's Ride is not a playtest; it's the pass where Josh (or Gru with Josh's sign-off) files the follow-up issues the spike's design note names. That is how a spike's output reaches the floor. Mission-complete criterion for a spike Challenge: merged AND the follow-ups it named have been filed (per `feedback_spike_followup_tickets`). Feature and bug Challenges Ride through a single-feature smoke playtest; spike Challenges Ride through issue creation. Reinforced 2026-04-24 on Operation Shrink Ray (SH-221) after Josh corrected an earlier "spikes skip Ride" framing.

**Debrief fires post-close, not on mission-complete.** Reinforced 2026-04-26 by Josh: "debrief is for post close not complete". Order is now: mission complete (work done) → mission closed (issues moved to Closed state) → debrief posted. Debrief is the reflection after the mission has been closed, not the bridge from complete to closed. When the mission closes, post the mission debrief as a project status update (`mcp__linear__save_status_update`, type: project) on the Linear project the work sits on. Do not offer "debrief on complete" or "debrief to close"; those compress the steps wrongly. Wait until close before debriefing. Earlier framing (debrief between complete and closed) is superseded by this rule.

**Mission terminals are two states: complete, then closed; debrief is post-close.**
- **Mission complete** = every Challenge merged AND Josh rode each feature (single-feature smoke on the built game, accepted). Work verified. Timer stops here.
- **Mission closed** = mission complete AND issues moved to Closed state. Terminal for the mission's lifecycle.
- **Debrief** = posted as a project status update *after* close. The reflection step. Per Josh 2026-04-26.

A merged-but-unridden issue is not complete. A complete-but-not-closed mission is not closed. A closed mission still wants its debrief; the debrief is the post-mortem that lands once the mission is put away.

**Mission is not a Linear project.** Mission is its own identity: a coordinated bundle of Challenges with a **codename** and a **description**. A mission may span issues across one or more Linear projects, or be a subset of one.

**Call them missions, not milestones, even though Linear stores them under the `projectMilestone` field.** The API surface uses `projectMilestone` / `milestone` because that's Linear's native field name, and the save_issue tool exposes `milestone` for the same reason. Lair-side prose, status updates, debriefs, and conversation always say "mission". Reinforced 2026-04-28 after I wrote "all Kyle Patrol milestone issues" in mid-mission talk and Josh corrected: "dont call them milestones they are missions". The slip pattern: I read the API field name and let it leak into prose. The tooling word is `milestone`; the framing word is `mission`.

**Mission debrief still posts to the Linear project** where the work lives (status update), because that's where the issue trail already is. Cycle retros stay on Swarm Retros.

**TrackingTime tracks missions as tasks**, keyed by mission codename, under an umbrella TT project (set up separately). Not by Linear project.

Criteria for mission complete (work-done, timer-stopped):
- Every issue in the mission is in Completed state (challenges merged).
- Josh has ridden each feature on the built game and accepted it (no bug follow-ups required).

**On mission complete, always reset to main.** Switch the main worktree to `main`, `git pull --ff-only`, remove any merged side worktrees, delete merged local branches. The Lair doesn't carry stale branches from closed missions. Reinforced 2026-04-24 after Banana Stand's work phase ended and I sat on the old feature branches until Josh asked.

Criteria for mission closed (terminal, mission-put-away):
- Mission complete (above).
- All mission issues moved to Closed state.

Debrief posts as a project status update **after close**, not as a precondition for it. The closed mission then earns its reflection. Per Josh 2026-04-26.

**Debrief is one ritual at any scope.** Mission-scope debrief posts on the mission's project. Cycle-scope or cross-cutting debrief posts on whichever project the reflection ties to (typically Swarm Hardening for agent-infra, or the most-active work project for a cycle recap). The old "cycle retro" label was a separate name for the same ritual; drop the distinction. Reinforced 2026-04-24.

**Linear state flow:** Triage → Vault → Ready → Dispatched → Challenged → Completed (merged) → **Closed** (debriefed, terminal). Retired stays off-path for cancelled work. Closed state id: `8e7da1c7-dda3-4bcf-a023-fb71f0fdeda5` (created 2026-04-24).

**TrackingTime timer model:** two timer segments per mission.
- Segment 1 (work): dispatch → mission complete. Timer runs during the focused-work phase. "Complete" = all issues merged.
- Segment 2 (wrap-up): carnival or ride → mission closed. Separate timer for verification and debrief.
- Gap between segments is untracked.

**Special agent is the umbrella.** All operative roles in the Lair are special agents:
- **Gru** (singular main-thread role)
- **Lucy** (singular continuity layer; skills, memory, CLAUDE.md)
- **Minions** (rotating-codename specialists, one per task; code-quality, signals-lifecycle, etc.)
- **Gru Sisters** (playtest special agents with fixed identities: Margo analytical, Edith break-it, Agnes vibe-check)

Minions and Sisters are both special agents; they are different kinds within the umbrella, not sub/super-sets of each other.

**On ride or carnival, dispatch the Sisters** (not minions in Sister personas; the Sisters are their own class). Margo, Edith, and Agnes each review the merged feature from their angle and report back. Until SH-209/SH-210 land (real-agent playtesters with runtime), Margo and Edith run as reasoned code/feature review with the sister personas, not literal gameplay.

**Agnes is a human playtester, not an AI agent.** The vibe-check role; "is this actually fun?"; stays with a human (Josh or trusted human testers). AI can score but can't feel. Margo and Edith automate to sub-agents; Agnes does not, now or after SH-209/SH-210. When a Ride or Carnival fires, two Sisters dispatch as agents and Agnes is Josh (or someone sitting in her seat).

**Why:** Josh called this out on 2026-04-24, immediately after dispatching the first mission under the new framing, when I said "opens a challenge" instead of "opens a Dandori Challenge." Framings that only live in docs don't earn their keep; they have to show up in the running talk.

**How to apply:**
- In progress updates during a mission: "no Challenges open yet" / "Slartibartfast pushed to the Challenge" / "Battle settled cleanly on SH-100."
- Internal coordination replies can still reference Linear/GitHub terms as native ids (challenge #343, issue SH-100); the refs don't change, the vocabulary around them does.
- The guide's own line still holds: "When Gru says 'challenge' it means pull request; when Gru says 'Dandori Challenge' it means the same pull request from the mission side." Use the mission-side term when in mission mode.
- Out-of-mission work (project docs, general questions, infra not tied to a live mission) can default to the Linear/GitHub native terms without strain.
- **Trigger is word-reach.** Before typing "challenge" in an in-mission status line, swap to "Dandori Challenge." Before typing "review" of a diff, swap to "Dandori Battle." Before typing "retro" of a mission close, swap to "Mission debrief." The vocabulary drifts fastest in quick-status replies; keep the swap reflexive. Reinforced 2026-04-24 after repeated slip-ups during the SH-98 / SH-100 mission.
- **Issue bodies count too.** "Surfaced during the Ride on challenge #395," not "during playtest of challenge #395." The framing-swap rule applies to anything Gru authors during a live mission, including bug-issue bodies, environment notes, and step-to-reproduce sections. Reinforced 2026-04-25 on SH-255 after I wrote "Surfaced during playtest of challenge #395" and Josh corrected with "ride not playtest." The slip pattern: I treat issue prose as neutral and reach for the GitHub-native synonym; the rule says no, mid-mission prose stays in the framing wherever it lives.
- **Status-report responses are the worst slip surface.** Reviewer-result roundups, "what blocks ship", "what's the call" replies; these are the moments the vocabulary drifts most because I'm transcribing labels and challenge numbers and the GitHub-native words come pre-loaded. Reinforced 2026-04-25 on Challenge #403 after I wrote "expand the challenge" and "expand #403" twice in a single Battle-result reply. Trigger: any sentence that names a Challenge by `#N` and decides scope; replace "challenge" / "expand the challenge" / "pull the challenge" with "Challenge" / "expand the Challenge" / "pull the Challenge" before sending. The number is a fine native id; the noun next to it has to flip.
- **Multi-Challenge mission status volleys are the worst-of-the-worst slip surface.** Reinforced 2026-04-26 during the Mission Page One restructure round, when six Challenges were in parallel flight and I called them "challenges" across at least a dozen status updates. The reflex held for the first reply and broke as the volley extended; by reply five I was writing "challenge #441" without noticing. Trigger: any reply that lists three or more Challenges in sequence; slow down once, scan the reply for "challenge" before sending, swap every instance to "Challenge". The cost of the scan is small; the cost of drift across a full mission's worth of replies is the framing eroding under its own weight.
- **GitHub-native action verbs slip too, not just nouns.** "Queue auto-merge", "queued auto-merge on challenge #N", "auto-merge enabled" all import GitHub vocabulary into mission talk. The Lair-side equivalent: a Battle-cleared Challenge that has its merge gate set to fire on `approved-human` is "queued to land" or "queued for Completed". The mechanism (GitHub auto-merge) is fine to name in tooling-internal contexts; the status line should not. Reinforced 2026-04-26 after I wrote "queue auto-merge" repeatedly across the same restructure-round status updates.
- **Offers and rituals carry framing too.** Offering a post-mission summary as "dossier" instead of "debrief" reaches for a fresh word when the established ritual already has a name. Mission debrief is the established term for the post-complete reflection (per the rest of this memory). When the action is the ritual, use the ritual's name; coining a parallel term reads as the framing not having stuck. Reinforced 2026-04-26 after I offered to "dossier the changes" instead of "debrief the Challenges".
- **Historical Challenge references also swap.** "Challenge #321 built X", "no Challenge shipped Y", "Challenge #92 was shop-side only." The rule applies to past Challenges discussed mid-mission, not just the live one. challenge numbers as native identifiers are fine ("#321"); the word "challenge" as a noun in mission-side prose is the slip. Reinforced 2026-04-24 after I wrote "No challenge shipped that covers..." and "#321 built..." while scoping SH-97's next mission.
- **One Challenge = one issue.** A Dandori Challenge maps to one Linear issue via one challenge. Pushes to the same challenge are the same Challenge continuing, not a new one. A new Challenge needs a new issue. Don't call a re-review round "a new Challenge"; it's a new Battle inside the same Challenge. Reinforced 2026-04-24 after the SH-98 #345 confusion.
- **Every Challenge has an issue. No chore challenges without an issue.** Even small docs pushes (state-name drift, framing updates, skill tweaks) get a Linear issue filed first. Reinforced 2026-04-24 after I tried to dispatch Mabel on a docs challenge as "chore, no issue." Prior session had allowed chore-without-issue (#343, #349); the rule is now always-file-an-issue.
- **"PR" is the single worst slip word and the highest-frequency one.** "Pull request" / "PR" / "PR #506" / "open the PR" / "the PR description" / "review threads on the PR" all import GitHub-native language into mission talk. Mid-mission, "Challenge" is the noun: Challenge #506, open the Challenge, the Challenge description, review threads on the Challenge. Bare hash refs (`#506`) are fine as native identifiers; the noun next to them has to flip. Reinforced 2026-04-28 across many slips in the SH-289 RCA chain: "PR #506", "the PR", "open its PR", "fix-minion at PR #506 review comments". Trigger: every time the cursor reaches "PR" or "pull request" in a status-line draft, swap to "Challenge" before sending.
- **Know when to continue vs split.** Continuing the same Challenge is right for: fixes that address findings within the issue's AC, small style/tone edits, obvious reviewer follow-ups. Splitting into a new issue is right when: a finding reveals work outside the AC, scope would balloon the diff past what reviewers can hold, the work belongs to a different discipline, or the piece deserves its own trail. If in doubt, ask Josh before expanding scope on the open Challenge. SH-98 / SH-211 was a good split (drag-to-equip was its own feature beyond the timeout state machine). Reinforced 2026-04-24.
- **Each Challenge dispatches a recipe, not a single minion.** Per `ai/swarm/README.md`, each issue gets a recipe that fans out multiple roles in parallel on the same issue: a Story recipe dispatches `design-doc-reader` + `refactor-planner` + `test-author` + `integration-scenario-author`, plus a paired implementer. A Bug recipe dispatches `root-cause-analyst` + `test-author` + `researcher` + `design-doc-reader`. Each role is filled by one codename from the pool for that work unit. More minions, not fewer: a mission with three Challenges spawns roughly (recipe-size × 3) minion dispatches, each uniquely codenamed. Do NOT collapse a Challenge down to a single minion; the recipe IS the parallelism. Reinforced 2026-04-24 after I suggested one minion per Challenge and Josh corrected: "More minions not less right? We have pools for this." Root cause: I'd read `ai/lair/guide.md` but not `ai/swarm/README.md`, which is where dispatch mechanics live. Always read both before answering dispatch questions.
