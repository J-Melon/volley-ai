---
name: Swarm rules: fail early on ambiguity, verdict is the bot synthesis review
description: when the organiser or an agent hits an ambiguous issue/scope, stop and ask Josh instead of guessing; reviewer agents report a verdict to the organiser, which posts one bot synthesis review per round rather than inventing a new verdict surface
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
Two durable rules for how the swarm runs.

**Fail early on ambiguity.** When an issue, project, cycle, or dispatched task has scope that cannot be resolved from the entity itself + design docs + memory, the organiser stops and asks Josh a precise question. No guessing. Agents that hit ambiguity mid-dispatch write a blocker note in their scratchpad and surface it via inbox; the organiser escalates to Josh rather than letting agents pick their own interpretation.

**The reviewer verdict is not a label.** Each reviewer reports its verdict to the organiser; the organiser posts one bot synthesis review per review round under the `volley-reviewer[bot]` identity (an approval on a clean pass, request-changes if any reviewer blocked). That synthesis review is advisory attribution, not the merge gate. The merge gate is the maintainer's manual merge: Josh reviews and clicks Merge when ready, and that act is the approval.

**Verdict-as-structured-review pattern.** Reviewer agents are sandboxed to `Read, Grep, Glob` (plus `WebFetch` where the role calls for it). They do not hold `Bash` and do not shell out to `gh`. They return three fields to the organiser: `verdict` (approve or block), `summary` (one-sentence overall finding), and `items` (required when blocked, a list of `{path, line, body}` entries anchored to specific lines in the diff).

When blocked, the organiser posts each `item` as an inline review comment on its line via `gh api repos/:owner/:repo/pulls/:pr/comments`, and the round's bot synthesis review carries the request-changes verdict with the summary. Inline review comments are resolvable in the challenge UI; standalone issue comments are not. When approved, the organiser's synthesis review is an approval and nothing else is posted.

**No standalone challenge issue comments from agents.** All actionable feedback lives as line-anchored review comments so Josh can resolve them as he addresses them. Standalone `gh pr comment` is forbidden for agent output. Rejected alternatives: giving reviewers direct GitHub MCP access (new PAT secret, Docker dep, footgun) or inline shell-interpolated comment bodies (shell-injection risk from agent output).

**No merge action from agents.** Agents and the organiser never merge a challenge and never enable auto-merge; the maintainer's manual merge is the approval and the only way a PR lands (reinforces `feedback_never_merge_prs.md` and `feedback_no_auto_merge_manual_approval.md`).

**Why:**
- Ambiguity-guessing is the single highest cost in agent systems; a wrong interpretation ripples through every downstream dispatch and the work is wasted. One short clarifying question up front is orders of magnitude cheaper than retrying. Flagged 2026-04-21.
- One synthesis review per round keeps the verdict legible and attributable without piling per-reviewer Review bodies onto the timeline.

**How to apply:**
- Organiser before dispatch: if the entity's AC or scope is unclear, ask Josh before spending agent tokens. Frame the question narrowly (the specific ambiguity, not an open-ended "what do you want").
- Agents mid-dispatch: on hitting ambiguity, write to inbox with status `blocked` and a one-line question. Do not proceed on an assumption.
- Reviewer agents: report verdict, summary, and any blocking items to the organiser; never post on the PR directly.
- The organiser posts the round's bot synthesis review and any inline blocking comments; it never merges and never enables auto-merge. Josh merges by hand when ready.
