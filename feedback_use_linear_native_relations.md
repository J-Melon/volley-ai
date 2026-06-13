---
name: Use Linear's native relations and links, not a References block
description: design doc links, blocks, blockedBy, and relatedTo live in Linear's native panels; don't duplicate them as a References section in the description
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
When an issue needs to point at other work, use Linear's native fields, not a markdown "References" block at the bottom of the description:

- **External links (design docs, external URLs):** `links` field → shows up as an attachment chip in the issue sidebar.
- **Dependent issues (blocks / blocked by):** `blocks` / `blockedBy` / `removeBlockedBy` → shows up in the Related panel and drives the blockedBy state.
- **Informational references to other issues:** `relatedTo` → also in the Related panel.

Don't duplicate any of those in the description body as a "References:" section.

**Why:** The description is the work spec. Linear's relation and link UI already surfaces pointers on the issue. Duplicating them in the body creates two sources of truth that drift, and clutters the spec itself. Josh flagged this on 2026-04-20 after I wrote "References:" blocks on the Equip Loop issues.

**How to apply:**
- When drafting a new issue, put the spec and AC in the description and nothing else.
- Attach design-doc URLs via `links`.
- Wire dependencies via `blocks` / `blockedBy`.
- Wire context references via `relatedTo`.
- If a reference really does need prose explanation (rare), put the explanation in a review comment on the issue, not the spec.

**Same rule applies at project and milestone level:**
- Project descriptions don't enumerate the issues in the project. The project view already lists them.
- Milestone descriptions don't list the issues attached to them. Setting `milestone` on each issue surfaces them in the milestone view.
- "Verified by Ride: SH-296" in a milestone description is the same anti-pattern as "References: SH-296" in an issue description; the relation lives in the field, not the prose.
- Reaffirmed 2026-04-27 after a Kyle Patrol milestone description named the Ride issue inline.
