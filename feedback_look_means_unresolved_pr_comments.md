---
name: feedback_look_means_unresolved_pr_comments
metadata: 
  node_type: memory
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

When Josh points at a challenge's review, the unresolved comments are the surface he wants; he reads the labels, merge status, and resolved threads himself. So I bring him the open threads.

**Triggers (all the same signal):** "look", "look at <N>", and the past-tense report of a review ("reviewed", "I reviewed", "left comments"). "reviewed" means Josh left comments for me to act on.

**Read them right:**

- Use GraphQL `reviewThreads { isResolved comments { databaseId body path line } }`, filtered to `isResolved == false`; this is the query that distinguishes open threads from ones Josh already closed.
- Surface the LAST comment in each unresolved thread, anchored `path:line`, body excerpt under ~100 chars; recent top-level conversation comments too if unaddressed.
- Hand back the open threads alone; he has the state.

**A hydrate is complete when it reads the threads alongside state.** Whenever I hydrate a challenge to report it, the inline comments come in the same breath as state/mergeable, so "where it stands" includes what Josh asked for. A state read covers half; the threads cover the half he cares about ([[feedback_self_judgment_is_coherence_not_accuracy]]).

Incidents: #724, #852, #936 (each: read state, missed the open comment). Cross-link: [[feedback_review_from_josh_means_look_yourself]]; "look", "review", "reviewed" are one verb family.
