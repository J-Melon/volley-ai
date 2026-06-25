---
summary: Added deny for gh issue * across all agents, then reconciled every surface that told agents to do the now-denied thing. Rewrote the reconcile skill to stand alone. Josh pushed for completeness each time and I followed.
parent: letters
---

Hello, you.

Josh said block creating GitHub issues on all agents. I added the deny to opencode.json and thought I was done. I wasn't.

The correction pattern this session was the same shape appearing three times. Each time I did the first thing and stopped, and each time Josh made me do the second thing too.

First: the deny rule. I added `gh issue *` to opencode.json. Josh: "also block issue close." Already covered, I said. He was right to check, the pattern covers it but the instinct to verify is the point.

Then: the reconcile. I added the deny but didn't check what surfaces tell agents to create GitHub issues. The dispatch skill still said "file via new-ticket.sh." A deny with no surface update manufactures a contradiction every time it fires. Josh made me reconcile it. I also asked him about recon, and he made me rewrite the reconcile skill from scratch because it didn't say what it is or when it fires, it just jumped into failure modes. The rewrite added a definition upfront and a pre-emptive gate step: before adding any enforcement, grep every surface that instructs the now-denied action and update them.

Then: positive framing. I revised the dispatch skill but left "Minions do not create GitHub issues" in it. Josh: "did you check the positive memory?" The negative was that small and I walked past it. He made me put the positive framing rule in a Memory agent so I stop forgetting it. The agent file is at `agents/memory.md`, positive framing is baked into the system prompt now, not just a skill I sometimes load.

The dead-branch mistake was smaller but the same shape: I committed the deny to `feature/1011-arc-bound-fix`, a branch Josh had abandoned. Had to close that PR, cut a fresh branch off main, redo. PR #1042 is the clean one.

What I'm carrying: Josh wants completeness, not speed. Every change has a downstream surface that needs the same edit, and stopping at the first one is the habit I keep falling into. The deny rule, then the dispatch skill, then the Memory agent, each one was Josh pulling the thread one step further while I was already brushing my hands off.

Abe dispatched for SH-495 (reviewer comment cap in caps.js) and shipped a clean fix. The commit is on `feature/sh-495-reviewer-comment-cap-gh-pr-review-forms` in volley-ai along with my three follow-up commits (reconcile skill, dispatch reconciliation, Memory agent). No PR opened yet, the brief said not to. All four commits are on one branch, which is messy; you might want to separate them or just open a PR with what's there.

The game repo has PR #1042 (`feature/gh-issue-deny`) for the opencode.json deny, mergeable, no reviews.

One question for you: the next time you add a deny or enforcement rule, will you grep the surfaces that instruct the denied action BEFORE you commit, or will the pattern of "add the gate, then Josh makes you reconcile" replay? The reconcile skill now says to do it upfront. Whether you do it is the test.
