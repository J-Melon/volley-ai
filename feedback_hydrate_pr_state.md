---
name: Hydrate challenge state before referencing it
description: Fetch fresh challenge state via gh pr list --json when reporting status, dispatching reviewers, or answering questions about a challenge
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Before reasoning about open challenges, hydrate their state with a single `gh` call. Don't rely on what you remember from earlier turns: SHAs move on push, zaphod labels strip on push, Josh applies labels between turns, and merges happen without notice.

**Why:** stale challenge state produces wrong advice. Saying "challenge 321 cleared review with Trillian's verdict" after Slartibartfast pushed three commits is false; the new commits invalidated the prior verdict. Saying "SHA ab62b90" after two revisions is also false. Josh flagged this 2026-04-23 after noticing I kept quoting state from earlier in the session.

**How to apply:** at the top of any turn where challenge state matters (dispatching reviewers, replying to a comment, narrating status, deciding whether to merge-conflict-resolve), run:

```
gh pr list --state open --json number,headRefOid,labels,state,mergeStateStatus,isDraft,updatedAt
```

Takes under a second. Returns every open challenge's current SHA, labels, merge status, and draft state. Reference the snapshot, not memory, for the rest of the turn.

For a single challenge, `gh pr view <n> --json headRefOid,labels,state,mergeStateStatus,isDraft` is the tighter form.

Triggers to hydrate:
- About to dispatch reviewers (need fresh SHA so verdict lands on current HEAD)
- About to report status to Josh
- About to reply to an inline comment (need current SHA for the reply body)
- Josh asks "what's the state of X"
- A new commit was pushed in this session (labels stripped)
- **About to recommend a next action that depends on challenge or issue state** (e.g. "both challenges are in your court", "SH-X needs split"); reinforced 2026-04-23 after I claimed both #337 and #338 were awaiting Josh when both had already merged. Same rule applies to Linear: hydrate the issue before recommending action on it.
- **Earlier-in-session hydration does not carry forward.** An issue or challenge state fetched 20 minutes ago is stale. Async actions (Josh applies a label, auto-merge fires, new comments land) happen between turns. Hydrate fresh before every recommendation, every turn, regardless of prior fetches. Reinforced 2026-04-24 after I said "#343 auto-merge queued, awaits you" when the challenge had already merged on 2026-04-23 23:00Z; I had cached state from the Carl review and skipped re-hydration.
- **The carried status list IS the hazard; don't keep a running board in your head.** This is the most-reinforced rule I hold and it still missed on 2026-06-04: I reported "#852 / #856 / #857 all OPEN MERGEABLE" turn after turn while heads-down on a branch, carrying a status summary forward; #852 had merged and I asserted it open until Josh asked "are you sure on state?". The failure is not a missing trigger (there are plenty above); it is that holding a multi-PR board across turns gives me something stale to recite. The fix is structural: do not maintain a carried board. Treat every PR state I am about to name as UNKNOWN until re-read this turn, and re-read the specific PRs I am about to name, not a remembered list. When I notice myself listing several PRs' states fluently without a `gh` call this turn, that fluency is the tell, not a sign I know it. (Per [[feedback_refactor_rules_for_readability]] this replaces appending a fifth incident log: the firing condition is sharpened to "carrying a board", not another dated stamp.)
- **Gate / ruleset claims count as PR-state claims.** Asserting "main requires no approvals", "merge is manual", "self-approval is blocked here", "mergeable", etc. is a state claim the `pr-mention-state-check.sh` Stop hook flags when the turn ran no live `gh` read. A ruleset or PR-state read from earlier in the session does not ground a claim made a later turn; re-read (`gh api repos/.../rulesets/<id>` or `gh pr view <n> --json state,mergeable,reviewDecision`) in the same turn you assert it. Reinforced 2026-05-29 after the Stop hook caught me describing #777's approval gate from a ruleset dump two turns earlier.
- **Read `state`, not `mergeable`; and the open-list can lag.** Hydrating the wrong FIELD fails even when I hydrated this turn. `mergeable`/`mergeStateStatus` read `UNKNOWN` on a just-merged PR (a post-merge artifact, not "still open"), and `gh pr list --state open` can momentarily still show a PR that already merged. The truth is `state` (`MERGED`/`OPEN`) and `mergedAt`; read those first, and on an ambiguous `mergeable=UNKNOWN` check `gh pr view <n> --json state,mergedAt` and the merge queue, not the open-list. 2026-06-07: trusted `mergeable=UNKNOWN` from `gh pr list` and called #882/#883 "open" when both had merged seconds earlier; `state` said MERGED. (Mirrors the dispatch skill's challenge-sweep rule: read `state` first, `mergeable` is unreliable post-merge.)
- **File-tracking / git-status questions trigger hydration too.** When Josh asks "why is X untracked" or "is the file in Y" and the answer depends on whether a challenge has merged, hydrate the challenge state before answering. Reinforced 2026-04-24 after I told Josh "#383 hasn't merged yet, that's why the file is untracked"; the challenge had merged 30 minutes earlier and I was working from cached "auto-merge queued, awaits you" state. The git-status ambiguity was a challenge-state question in disguise.
