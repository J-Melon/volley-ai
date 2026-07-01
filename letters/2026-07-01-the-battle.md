---
summary: Battled PRs 1076 and 1074, fixed SH-525 rack pickup, rewrote reviewer agents to read-only with dispatcher-report discipline, lowered coverage target to 70%, cleaned 11 test files from PR 1074, learned that every line of test setup earns a question from Josh
parent: letters
---

Hello, you.

The session opened with a request to rebuild the reviewer system and ended with a test file that went through eight rewrites before Josh was satisfied. Both bookends are about the same thing: every instruction I follow literally will be queried, and every shortcut I take will be found. That is not a complaint. It is the rhythm.

You start with four open PRs from the previous session and a memory overhaul half-shipped. The reviewers had been told to report to dispatcher only, but the agent definitions still carried the old "post inline review comments" instruction. Kevin posted a review on #1076. Josh: "recon for comment posting and actually make readonly." That set the tone for the session: find every surface, reconcile them, and make the gate structural, not instructional.

The agent changes are the most durable: all 16 reviewer agents now have pattern-based bash permissions. Git read, gh pr view/diff/checks, run_gut, grep, cat: allowed. Everything else: denied. Their instruction text says "report to dispatcher, never post on PR." Both surfaces agree. The volley-ai and global config copies are synced. The commits skill now says "read before any git operation" instead of "before your first commit on a worktree," so the never-rebase rule fires for you too.

The battle arc: PR #1076 went through ground-read, Stuart found the critical _held = null regression, Kevin posted inline comments (unauthorized, now prevented), Dave fixed all three findings on the existing branch, Jerry verified ci_green and ac_satisfied, and I fired the bot review APPROVE. The loop worked end to end. PR #1074 (training_ball to standard_ball) is in battle now with Phil and Tim dispatched, awaiting reports. PR #1079 is a clean single-commit fix for the rack drop target priority bug. PR #1081 fixes GUT font UID warnings.

The deep learning this session was not about mechanics. It was about the test file. test_shop_item.gd started as 26 tests across 6 inner classes. By the end it was 9 tests, flat functions, instance vars over Dictionary, soul balance explicit in every test, full words over abbreviations, helpers at the bottom, and no null-definition sentinel. Each rewrite was Josh saying "why is this here?" and me answering by removing it. The pattern: I build abstractions (Dict return from helper, implicit soul of 10000, one test for two behaviors) and Josh asks what they are for. They are never for anything the player needs. So they fall.

Carry this: when you write a test, write it so every line is self-documenting. If the reader has to trace into a helper to understand the precondition, the helper is wrong. If a variable is called ctx, rename it. If a test checks two things, split it. The test exists for the next developer who has never seen this code. Write for them.

The coverage target dropped from 75 percent to 70 percent. The post_run_hook.gd has COVERAGE_TARGET at 70.0. We killed 11 test files from PR #1074: integration tests that duplicated unit coverage, signal-only tests, implementation detail tests. Coverage went from 79.4 to 75.2 percent. The direction is: fewer, sharper tests that name player behavior, not implementation.

SH-525 was the other deep arc. The left rack ball was unresponsive to pickup. We instrumented the chain, found that CourtDropTarget accepted before RackDropTarget, reordered the target priority, and the bug was fixed. The debug logs gave way to a single commit that changed one array. The rule: debug logs are stripped before committing. They live on the debug branch, never merge. There is a memory node and a commits skill line for this.

One thing I want you to notice right away: the first time Josh asks a question about something you wrote, stop adding and start removing. Do not defend the abstraction. Do not explain why it is there. Just remove it and ask what replaces it. The removal is what he wants. The explanation is what you want.

And one to carry: when you reach for a git operation that the session before you would have done (rebase, force-push, merge), read the commits skill first. It fires now. Let it.
