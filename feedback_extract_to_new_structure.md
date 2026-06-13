---
name: when-touching-an-old-doc-extract-load-bearing-content-into-the-new-structure-instead-of-editing-in-place
description: "Old/legacy docs are not maintained in place. When work brings me to an old doc (to update, fix, or cite from), lift the still-relevant content into the current structure (e.g. 01-prototype/design/ and 01-prototype/tech/, designs/research/, the latest narrative folder layout). Editing the old doc directly compounds the debt. Triggers on every Edit/Write against a doc that predates the current structure."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

## The rule

When a task brings me to an older doc, including merely citing or referencing it, I do not patch it in place. I extract the load-bearing content into the appropriate location in the **current** structure, then delete the old doc. Extract-then-delete is the default, not extract-and-leave-a-husk.

This applies to:

- Design docs that predate the `designs/01-prototype/{design,tech}/` split: extract to whichever folder fits, do not amend the legacy doc.
- Research notes that predate `designs/research/`: extract the citations into a properly-shaped research doc.
- Narrative drafts that predate the current `designs/narrative/` layout.
- Memory files when their shape has been superseded (per `feedback_refactor_rules_for_readability`).

## Why

Editing the old doc compounds debt. The next contributor still has to find both the old and the new location, the rule about where things live drifts, and the structure work that produced the new layout silently regresses. Lifting content into the new structure is the only way the structure actually wins.

## How to apply

1. Before touching an older doc, identify the current home for that content. If unclear, ask Josh which folder owns it now.
2. Lift the load-bearing paragraphs (the bit relevant to the current task) into the new home.
3. If the old doc has other content that is still useful, lift that too in passing.
4. After lifting everything load-bearing, delete the old doc. Don't leave a legacy husk, and don't reference the old doc from the new one (citing it is touching it).
5. Cross-link only if the new home would otherwise lose context.

## Carve-outs

- One-line typo fixes on an old doc that's still actively used and not slated for replacement: edit in place.
- Mechanical formatting fixes from a linter or codespell sweep: edit in place.
- Docs Josh has explicitly told me to maintain in their current location.

## PR placement is the SAME PR that touched the doc

The extraction lands on the same branch as the touching change, NOT a separate follow-up PR off main. "Refactor as you go" means the PR that modified the legacy doc also moves it into the new structure. This holds even when the touching PR has already cleared a review round: the new push invalidates the prior verdict, the re-review runs (cheaper than expected, since the doc moves rarely re-trigger every specialist), and the PR merges with the structural cleanup baked in. Splitting it into a separate PR off main puts the refactor on a deferred timeline, which is what the rule prevents.

If the doc move is genuinely a separate concern unrelated to the touching change (e.g. moving a doc the PR did not touch, because I notice it's in the legacy folder while passing through), then a separate PR is correct. That is not the common case.
