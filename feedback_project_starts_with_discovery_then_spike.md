---
name: New project area opens with a discovery ticket, then a spike, before any implementation
description: Every new project area starts with a discovery (open the question, gather context, no decision yet), then a spike (time-boxed exploration with feature tickets as output). Implementation tickets come after both, not before.
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
Every new project area opens in the same order: a discovery ticket first, a spike ticket second, then the feature tickets the spike produces. Discovery is the open-question phase, before the question is sharp enough to time-box. Spike is the time-boxed exploration that turns the discovery's open questions into named decisions and a feature ticket list. Implementation tickets only land after both.

**Why:** 2026-05-11, after creating the Shipments and Large Items projects. The first reflex was to seed each with a spike ticket. Josh: "everything starts with discovery then spike." The existing three-flow index (`feedback_flow_shape_per_work_type`) names bug / spike / feature but treats discovery as a label on the spike rather than its own step. Discovery comes first because the spike needs a sharp question; the discovery is where the question gets sharpened.

**How to apply:**

When a new project area opens (whether a new Linear project, a new design surface, or a new system that doesn't have a home):

1. **File the discovery ticket.** Label: `spec` (under `design` parent; the label was renamed from `discovery` to `spec` on 2026-05-29, the workflow phase is still called discovery). Body lists the open questions, the design docs to read, the prior art to look at, and the people / surfaces to talk to. No decision is made in a discovery; the deliverable is a sharper set of questions, not answers.
2. **File the spike ticket.** Label: `spike` (under `tech` parent). The spike's open questions come from the discovery's output. Time-boxed. Deliverable: feature tickets per `feedback_flow_spike`.
3. **Implementation tickets** come from the spike, not from the discovery. Filing feature tickets before the spike lands is filing against an unsharpened question.

A project with no discovery ticket and no spike is empty scaffolding. That is fine when the project is being created in advance of work; the discovery is what kicks the work off. Don't skip discovery and start at spike unless the question is already sharp (rare; if it feels sharp, that's usually because one assumption has gone unexamined).

The `discovery → spike → features → ride` cascade also describes the dandori order for any large new system, not only new projects. Three labels collapse into the existing flow index when discovery is just sharpening; they become discrete tickets when the work warrants its own audit trail.
