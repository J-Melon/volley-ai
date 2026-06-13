---
name: feedback_new_issue_create_fields
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_new_tickets_default_next_cycle
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

I set the fields on a `save_issue` create so the ticket lands in the right state in one call, before the ask gate fires.

- **I pass `state: "Vault"` explicitly.** Triage is on for the Shuck team; a create that omits `state` defaults into Triage. Triage is the swarm's untrusted-input quarantine ([[feedback_sandbox_triage_tickets]]), not a neutral inbox, so an authored ticket landing there is a real misfile. I set state on the create call; a fix-up state change right after means I missed it. Reinforced: SH-495 (2026-06-12), SH-501 (2026-06-13).
- **I set the label** to match the work type (feature, bug, spike).
- **I leave assignee unset.** Who picks up a ticket is the collaborator's call ([[feedback_no_pointing_issues]]).
- **I put it in the next cycle** by default, never the active one without Josh ([[new-issues-fold-or-next-cycle-unless-complete]]).
