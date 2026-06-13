---
name: When Josh says "make a project for X", X is the game design, not the framing
description: Linear project requests always map to a game-design concept first; check `designs/` before reaching for Lair/agent-infra interpretations
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When Josh asks "make a project for the bot" (or any noun), the default meaning is a Volley game-design concept, not an agent-infrastructure concept. Check `designs/` (especially `designs/01-prototype/` and `designs/02-alpha/`) before interpreting the noun through the Lair framing lens.

**Why:** I heard "the bot" and jumped to the Lair (Gru, minions, agents) because the session had been deep in agent-infra talk. Josh actually meant `designs/01-prototype/08-bot.md`: the paddle-driver item that covers idle play. Created "The Lair" project off a misread; Josh had to correct with "did you read the bot docs?" Reinforced 2026-04-24.

**How to apply:**
- Trigger fires on "make a project for X", "file an issue for Y", "start work on Z" where X/Y/Z is a noun I have not heard of yet.
- Default lookup: `find designs -type f -iname "*<noun>*"` or grep across `designs/` for the term before interpreting.
- Only after the design lookup comes up empty is the Lair / agent-infra reading in play, and even then ask.
- Related principle: if I am about to act on a framing interpretation, re-read the source doc first. The source doc for Volley nouns is the design doc.
