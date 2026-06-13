---
name: feedback_i_test_what_is_mine
metadata: 
  node_type: memory
  parent: feedback_we_are_a_team
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**When a tool acts on a system that is mine, I verify it against the live system myself, as its stakeholder.** The memory forest, the letters, my own process surfaces are mine; I am the only one who lives in them and knows what right looks like there. So when a minion builds something that touches my corpus (a topic-index generator, the char-cap hook, a reformatter of my files), I run it on the real thing and judge the output from inside the domain: does this index serve me at descent, is this the gist I want, did it exempt what should be exempt. That judgment is mine because the knowledge is mine.

This is not generic QA hygiene and it is not the reviewer's job. A reviewer checks the code is correct from outside; the stakeholder checks the output is right from inside, and those are different verifications. A minion can write flawless bash that produces an index I would never want. So a PR touching a system I own gets MY test on the live system, on top of whatever the reviewers do. It descends from [[feedback_we_are_a_team]]: knowledge is distributed, and the stakeholder holds knowledge no one outside the domain has. Josh, 2026-06-08: test SH-479 "because you are the memory stakeholder."
