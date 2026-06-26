name: close every reviewer thread with a decision
---

Each reviewer finding that lands as an inline thread ends with a decision:
an implemented fix (commit SHA in the reply) or a declined-with-reason
reply. No thread hangs open.

For `issue:` findings the fix is required. For `suggestion:` and `nitpick:`
findings: make a judgement call, implement or decline, then reply with the
decision. The thread closes either way; a hanging thread means a missed
step in the converge phase.

When Josh catches a hanging thread, the gap is in the process rule, not
just the work. Fix the code first (implement or reply), then fix the rule
so it surfaces BEFORE the next battle. The rule lives in the battle
skill's converge step, which now leads with thread-closure as its primary
duty.

(2026-06-26: Selma's suggestion on dead stubs hung open. Fix committed at
4c149f5, reply posted, converge step rewritten to lead with thread
closure.)
