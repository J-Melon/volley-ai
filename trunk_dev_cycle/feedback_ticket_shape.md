---
name: ticket-shape-read-the-tickets-skill
description: "FIRES WHEN I am about to call save_issue or draft ticket prose in chat. I load the tickets skill first, before the save or the draft, not after. The skill holds the title, story-shape, outcome-AC, and links doctrine; this leaf points to it as the ticket-surface instance of name-the-outcome."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_write_from_the_players_experience
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

I load the `tickets` skill before any `save_issue` call or ticket-prose draft. It is the ticket-surface instance of [[feedback_write_from_the_players_experience]]: a ticket names the outcome the user observes. The skill carries the mechanics so they fire at draft time, for me and for any minion; this leaf only points.
