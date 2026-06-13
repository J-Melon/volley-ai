---
name: Design docs stay design-only; fiction, not meta about fiction
description: Design docs state what is true in the world. No follow-up issue lists, no codenames in headings, no doc-state meta (TBD / to draft / "this rewrite changes X" / cascade footers).
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Design documents under `designs/` are living fiction. They state what is true in the world right now, in the voice of the world. Three contaminants to keep out:

1. **Follow-up issue lists.** When a spike's design note names work that needs filing, the issues get filed on Linear as part of the spike's Ride. The list does NOT live in the design doc. "Design is for design, issues are for issues." A design doc that enumerates Linear issues rots the moment any of them change title, scope, or status.

2. **Mission codenames in long-term headings.** Mission codenames (Operation Banana Stand, Operation Shrink Ray) are opaque internal Linear handles. They do not belong in durable design docs. The design doc heading uses the concept name ("Regime unification"), not the mission codename that produced it. Codenames are disposable; design headings are not.

3. **Doc-state meta.** No "TBD" / "To draft" stub paragraphs that announce the doc's incompleteness. No preambles like "this rewrite makes fiction shifts the supporting docs do not yet reflect". No "Fiction cascade" or "Update references" footers naming downstream PRs this one implies. The doc states the world; what the doc will become, or which other docs it forces edits in, belongs in the PR body, not the file. A living doc reads the same to the player on day 1 and on day 90; meta about its own history is decay.

**How to apply:**
- Writing a design or narrative doc: lead with the concept name in the heading, no mission codename parenthetical.
- If the note wants to name follow-up work, describe the shape of the work in prose, not as a numbered issue list. The Ride files the issues against Linear; the design doc stays untangled from their lifecycle.
- If a section's body would currently be "TBD" / "to draft" / a placeholder paragraph, omit the section. The next commit on the PR adds it as settled. The PR body is the right place to say "Act III and Ending land in subsequent commits".
- Reviewing a design doc: flag any bullet list titled "Follow-up issues," "Next steps as issues," "Fiction cascade," "Update references"; any mission codename in a section heading; any "to draft" / "TBD" stub paragraph; any preamble that describes the rewrite or compares the doc to its prior shape.
- Exception: cross-references to specific Linear issues as inline links are fine where a design doc genuinely depends on a concurrent issue (e.g. "see SH-X for the reconciler wiring"). The rule is against enumerated issue lists and codename headings, not all Linear mentions.
