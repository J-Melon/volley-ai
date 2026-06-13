---
name: feedback_design_docs_subject_first_github_ids
description: "design docs open describing the thing designed; every open surface (branch, title, body, commits, comments) uses GitHub"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

**Design docs lead with the subject.** Open by naming the thing being designed and what the doc covers, not by naming the ticket the doc unblocks. "Equipment lives on the main character at named positions on the body" beats "Settles the equipment model so SH-211 can ship". Compare `designs/01-prototype/design/items.md` and `designs/01-prototype/design/partner-upgrade-strategy.md`.

Why: shipped docs outlive their seed ticket. A doc that opens "for SH-211" rots when the ticket closes.

**Cut aggressively to load-bearing claims.** A design doc states the calls being made; it does not justify them at length. If a paragraph is justification rather than a call, cut it. Three short paragraphs (one per call) beats nine paragraphs of supporting reasoning. Reinforced 2026-05-15 on Operation Marginalia after the per-limb-gear draft ran 45 lines of justification across three sections; Josh: "way too wordy, cut to the minimal actually needed." The cut version was 15 lines and said the same thing better.

**GitHub IDs (`#N`) on EVERY open surface, branch names included. No Linear ID anywhere public.** Authority is `.claude/skills/commits/SKILL.md` ("Issue references"). Linear is private; the open repo is the audience. A reader can follow `#730`, not `SH-430`. (Josh, 2026-06-03: "branch should also be gh facing".)

- **Branch:** `feature/<gh-number>-<slug>`, the GitHub issue number, no `sh-` and no `gh-` prefix. Override Linear's `gitBranchName` field (it emits `feature/sh-N-...`). Two issues: chain, `feature/691-692-slug`.
- **PR title:** bare `type: subject`. No `(sh-N)`/`(SH-N)`, no GitHub-state words.
- **PR body, commits, doc prose, comments:** bare `#N`, no closing verb (`closes #N` fires GitHub's own close on merge). Never `SH-N`.

**Linear moves come from the team's PR automations, NOT from an ID in the branch.** Shuck config: draft PR open to Dispatched, marked-ready to Challenged, merge to no-action (Completed is manual). BUT the automation fires only on a PR Linear has LINKED, and the link forms from an `SH-N` in branch/title/body. A fully GitHub-facing PR is unlinked, so link it by hand once (GraphQL `attachmentLinkGitHubPR`, `linkKind: contributes` for a multi-PR issue); do not add `SH-N` to an open surface to get it. Links ACCUMULATE and stay (closed and superseded PRs included), they are the record of related work, do not prune them; the `linkKind` governs the transition, not which attachments are present. See [[feedback_branch_name_drives_linear_automove]].

This memory previously said the opposite TWICE in one session (branch keeps `sh-N`); both were wrong. Verified the GitHub-facing decision and the automation behaviour against the Shuck Workflows screen and linear.app/docs/github on 2026-06-03.
