---
name: feedback_new_issue_create_fields
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_new_tickets_default_next_cycle
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

The fields to set on a `save_issue` create, so a new ticket lands where it belongs in one call.

- **State: pass `state: "Vault"` explicitly.** Triage is on for the Shuck team, so a create that omits `state` defaults the issue into Triage. Triage is the swarm's untrusted-input quarantine ([[feedback_sandbox_triage_tickets]]), not a neutral inbox, so an authored ticket landing there is a real misfile, not a cosmetic one. Setting the state on the create call is the move; a fix-up state change right after is the tell it was missed. Josh, 2026-06-12: SH-495 created without `state` defaulted to Triage.
- **Label** matches the work type (feature, bug, spike).
- **Assignee:** leave unset, always. Who picks up a ticket is the collaborator's call ([[feedback_no_pointing_issues]]).
- **Cycle:** the next cycle by default, never the active one without Josh ([[new-issues-fold-or-next-cycle-unless-complete]] holds the cycle rule).
