---
name: feedback_dispatched_on_dispatch
description: "Lane triggers: draft PR -> Dispatched and ready PR -> Challenged fire via Shuck PR automations once the PR is LINKED (manual link, GitHub-facing branches); merge is no-action so Completed is a manual move; status edits need Josh's confirm"
metadata: 
  node_type: memory
  parent: feedback_before
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

The Volley lane is Triage → Vault → Ready → Dispatched → Challenged → Completed → Closed ([[feedback_linear_state_forward_only]], forward only). Each transition has a concrete trigger; the triggers are the thing to get right, not just the order.

The Shuck PR automations drive the two middle moves, but only on a PR Linear has LINKED to the issue. Branches are GitHub-facing (no `SH-N`), so the link is made by hand once the PR is up (GraphQL `attachmentLinkGitHubPR`, see [[feedback_design_docs_subject_first_github_ids]]). Link the PR, then the state follows.

- **Dispatched** = a draft PR is open and linked (automation: draft PR open -> Dispatched). For a read-only/no-PR dispatch with no PR yet, offer the move manually so the board isn't stale.
- **Challenged** = the PR is marked ready-for-review (automation: PR open/ready -> Challenged). Not a merge state.
- **Completed** = merged. Merge is set to no-action in the team automations, so this is a MANUAL move (offer it, gated on Josh's confirm). Never write `Closes #N` (fires GitHub's close, overshoots the lane). Verification lives in the Ride, not here.
- **Closed** = released to production via the cycle release carnival, which is itself the regression test (set by the pipeline, not by hand). See [[feedback_linear_state_forward_only]].

**Why:** Two corrections. 2026-04-24: I dispatched Hornfels on SH-240 and left it at Ready; Josh: "should be in progress." 2026-05-28 on SH-434 Anteater 2: with both PRs open I said I'd "move the issues toward Challenged when the PRs merge"; Josh: "challenged means pr is up, is this not a memory?" I had Challenged as a post-merge state when it means PR-open. The lane order was documented but the per-state triggers were not stated sharply, so I mismapped merge.

**How to apply:**
- Josh moves issue states. The organiser links the PR after it opens; the Shuck PR automations handle draft->Dispatched and ready->Challenged. Josh moves the issue to Completed on merge.
