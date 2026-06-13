---
name: Parent issue only when multiple sub-issues are required
description: Linear parent/child structure is for when a parent has multiple children; a single child means the two should be peers
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
A Linear issue should only be a parent when multiple sub-issues hang off it. If there's just one child, the parent/child link is wrong; make them peers (related, or both children of a higher feature) instead.

**Why:** Parent/child in Linear is a structural signal that work is being decomposed. One child doesn't decompose anything; it just adds a hop. Reviewers see the parent and expect a breakdown. Concrete trigger: SH-291 (design discovery) had only SH-292 (tech spike) as a child; the design+tech-spike split rule wants those as peers under a higher feature ticket (SH-293), not nested.

**How to apply:**
- When filing a parent, line up at least two children before parenting any of them.
- When auditing, if a parent has only one child, either unparent the child (peer relationship via relatedTo) or move both under a shared higher parent.
- Apply at file-time and at audit-time; don't carry single-child parents.
