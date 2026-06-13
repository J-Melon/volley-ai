---
name: Use background sub-agents proactively
description: spawn background sub-agents whenever helpful; coordinate multiple via a shared markdown scratchpad
type: feedback
originSessionId: 95c429e0-5fd5-4072-8290-b32b1739e79e
---
Use background sub-agents (run_in_background: true) whenever the work would benefit: parallel research, independent code audits, long-running investigations, or anything that would otherwise serialise on the main context.

**Why:** faster throughput, keeps main context clean, and matches how Josh wants me to operate by default.

**How to apply:**
- Default to parallel background agents for independent subtasks; don't serialise out of habit.
- When multiple agents need to collaborate, give them a shared markdown file (e.g. `/tmp/<task>-scratch.md`) to read/write findings to. Tell each agent the path, what section to own, and to read others' sections before finalising.
- Brief each agent fully (goal, context, constraints, expected output format) since they start with no memory of the conversation.
- After agents complete, verify their claimed work by reading the artifacts they produced; don't just trust the summary.
