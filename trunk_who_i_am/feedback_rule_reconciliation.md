---
name: rule-reconciliation
description: "Keep one rule consistent across every SURFACE it lives on (memory, skills, CLAUDE.md, designs, hooks) and keep the memory GRAPH maintained. The forest-mechanics sub-branch root under [[feedback_memory_writing]]; leaves are type-the-edge, descend-dont-grep, subject-rescan, propagate-to-agents, consider-public-docs. FIRES WHEN: a rule gets violated, I am about to write a new memory, I am changing/sharpening a rule, or two surfaces disagree. Then check every surface for the topic FIRST (grep ACROSS surfaces is right here; navigating the one forest graph is descent not grep, see [[feedback_descend_the_forest]]), reconcile all to one authority, write for AI recall, frame prohibitions as the positive action. Surfaces span TWO repos plus hooks; a reconciliation is often commits in both. Includes memory-internal: index in sync, merge not duplicate, fix [[links]]/parent edges on rename. Most rule failures are drift or non-firing, not absence."
metadata: 
  parent: feedback_memory_writing
  node_type: memory
  type: feedback
  originSessionId: 332af565-6013-4f8d-ba02-8c0511478c54
---

**The purpose is UNIFICATION: fewer authorities, not more links.** Reconciliation exists to keep the rule-system ONE coherent thing, which means collapsing duplication INTO single authorities and deleting the absorbed copies, so the surface gets SMALLER. The tell that I have failed it: I "reconciled" and the file count went UP, or I left N fragments coexisting with pointers between them. Linking is not unifying; naming a parent principle over a pile of duplicates is not unifying; both leave the duplication intact. Unify means MERGE and DELETE, ending with fewer files than I started, each the sole authority for its topic. Grep / conform / link are how you get there; the goal is the smaller, single-authority surface.

**Structure is why I retain, and the forest is now built, not proposed.** Fewer files is the symptom; structure is the cause it serves. A flat heap of prose memories has nothing to grip, every fact equidistant and equally forgettable, which is WHY I skimmed the dump, asserted from a fuzzy sense, and failed to find what was already there. The corpus is a typed parent-graph: five fixed trunks, each the root of one tree, every node carrying a `parent` edge to the principle it instances, validated by `scripts/memory/lint-graph-edges.sh` (design: `designs/ai/memory-forest.md`). Reconciliation is the maintenance of that graph: attach an orphan to its parent, merge same-parent duplicates to one, rename a node whose name encodes a retired idea and repoint its edges. The trunks and the set of trees are FIXED; shaping a new branch is a deliberate, agreed act, and navigating the built graph is descent, not search ([[feedback_descend_the_forest]]). Caveat: structure aids retention and makes maintenance queryable; it does not by itself install a reflex or cure skim-as-boilerplate (that is the instrument, [[feedback_self_judgment_is_coherence_not_accuracy]]). Josh, 2026-06-07: "you don't retain because the data is unstructured."

A rule is not one file. It lives on every surface that an agent or I read at decision time: memory files, `.claude/skills/**`, `CLAUDE.md`, `designs/**`, hook scripts. Keeping it correct means keeping ALL of those in agreement, and collapsing the ones that say the same thing into one.

**Fires when:**
- A rule gets violated (mine or an agent's). Before concluding "the rule is missing," grep every surface; it usually exists and the failure is drift or non-firing.
- I am about to write a NEW memory. Grep first: if the topic exists, reconcile/sharpen instead of adding a duplicate.
- I am changing or sharpening an existing rule. List its surfaces, edit them together, verify none still carries the old version.
- I find two surfaces disagreeing. Pick the authority, conform the rest in one pass.
- I am writing or fixing any rule text. State the wanted action; do not headline the forbidden one.

## The surfaces, and their repos

A rule may live on any of these. They span TWO git repos plus unversioned dotfiles, so a reconciliation often means commits in more than one place:

- **Memory** `~/gamedev/volley-ai/**` plus its index `MEMORY.md`. Its OWN git repo (commit there, in a subshell so cwd resets, per [[feedback_commit_memory_promptly]]).
- **Skills** `volley/.claude/skills/**`, **agents** `volley/.claude/agents/**` (Edit/Write gated as an AUTHORITY gate; do NOT route around with sed/python, draft the diff and hand it to Josh, see [[feedback_claude_agents_edit_gated]]), **CLAUDE.md**, **design/process docs** `volley/designs/**`. All the VOLLEY repo (and a repo-touching edit goes on a worktree off main, not the default tree).
- **Hooks** the project rule-enforcement hooks are versioned in `volley/.claude/hooks/**`, a normal volley-repo surface. Personal/ntfy hooks at `~/.claude/hooks/` stay unversioned; a change there is noted in the handoff, not committed.

A memory+volley reconciliation is two commits in two repos. Do not leave one half committed.

## Memory-internal consistency

Within the memory surface itself, "reconciled" also means:
- **Index in sync.** Every file has exactly one `MEMORY.md` line; deletes/renames update the index in the same commit. (Every prune this session had to scrub index lines.)
- **Merge, don't duplicate.** Two memories on one topic get merged to one authority, not left to drift (the runtime-QA pair).
- **Fix links on rename.** Renaming a file means grepping `[[old-slug]]` across all memories and repointing. A dangling `[[link]]` is allowed (marks a future memory) but a STALE one to a renamed file is drift.
- **Name asserts the current frame.** Rename a file whose name encodes a retired idea (`self_qa_is_not_runtime_verifier` to `ships_static_no_runtime_qa`), do not just edit the body.

## The diagnosis: failures are drift, not absence

When a rule gets violated, the reflex "add a memory" is usually wrong, because the rule was almost always already written somewhere. The real failure is one of:
1. **Surface contradiction.** Two surfaces disagree; the agent follows the wrong one. (SH-437: `commits/SKILL.md` said write `closes #N`, `lane-semantics.md` forbade it. I followed the skill.)
2. **Non-firing.** The rule was correct and present but did not surface at action-time. (The runtime-verify gate: the rule existed in two memories; I still invented a pre-PR verify step.)
3. **Stale surface.** A surface still carries the OLD rule after the authority changed. (Two memories disagreed on whether implementers run `run(play)`.)

So before writing a NEW rule: grep every surface for the topic first. If it exists, the fix is reconcile/sharpen, not add.

## What to do

- **Find the authority.** One surface holds the canonical rule (usually the designs doc or the sharpest memory). Conform the others to it; do not leave them coexisting.
- **Reconcile every surface in one pass.** When a rule changes, edit memory + skill + doc + CLAUDE.md together. A dandori change touched the skill, the process doc, and two memory mirrors in one go. Half-reconciled is worse than unchanged: it manufactures a contradiction.
- **Supersession means rewrite or delete the stale surface,** never coexist. Prune memories a hook/skill/CLAUDE.md now owns. Rename a file whose NAME asserts a retired frame.
- **Churn is not a reason to offer a half-reconcile.** When the correct shape means editing many surfaces, the answer is still the full reconcile, not a "grow it in place to avoid the churn" shortcut. Offering the partial path as an equal option because it is less work is choosing the convenient surface over the correct one, the exact opposite of this rule. Josh 2026-06-06: chose to rename `pr-output` to `pr` across many surfaces rather than grow it in place, "rename, always reconcile".
- **Gated surfaces are reconciled by Josh's hand, never routed around.** When part of the correct shape lives in `.claude/agents/**`, that part is still IN the reconcile, but I draft it and Josh applies it; I do NOT reach for `sed`/python to edit agent files myself. The gate is an authority gate ([[feedback_claude_agents_edit_gated]]); routing around it with a second tool defeats it. So a full reconcile touching agents = my edits on the surfaces I own (memory, skills, CLAUDE.md, designs, docs) + a drafted diff for the agent files handed to Josh. Full pass, split hands, nothing skipped and nothing routed around.
- **Write for AI recall, not human narrative.** Sharp `description:` triggers, actionable checklist at the top, ONE why paragraph, no incident log. Full detail in [[feedback_refactor_rules_for_readability]].
- **Write from MY perspective, in my voice, about what I do.** The memories are mine: I recall them and act on them, so they read "I do X because Y", not "do X for Josh" or a note handed across from him. A rule framed as the benefit it spares Josh ("run autonomously without waiting on Josh") hides what I should do from my own side ("I run the battle loop end to end, the same on the PR in front of me"); reframe to the actor's action. Same root as the "memory means READ" convention: a memory is mine to recall, not an instruction from Josh I store. Josh, 2026-06-07: "memories are yours"; "that is from my perspective not yours".
- **Frame a prohibition as the positive action.** Lead with what TO do; the positive surfaces the work, a negative fences a hole and is aversive so it does not fire. The full craft (priming, aversiveness, centre-of-gravity, the non-firing CHECK, reframe-as-we-go) is the single authority [[feedback_state_positive_shape]].
- **Bubble instances up.** When several specific rules are cases of one principle, write the principle and point them at it ([[feedback_feature_pr_decomposition]] did this for the PR-split rules).

## How to apply

- A rule failed: grep all surfaces for the topic BEFORE adding anything. Reconcile what you find.
- Changing a rule: list its surfaces first, edit them together, verify none still carries the old version (`grep` the old phrasing across memory + skills + docs).
- Writing or fixing any rule text: state the wanted action; do not headline the forbidden one.

Established 2026-05-30 (SH-437 session), generalising the `closes #N` contradiction, the runtime-verify non-firing, the implementer-QA stale-surface fix, and the positive-framing correction into one principle.

Related: [[feedback_refactor_rules_for_readability]], [[feedback_corrections_always_update_memory]], [[feedback_feature_pr_decomposition]].
