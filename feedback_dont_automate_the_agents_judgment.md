---
name: feedback_dont_automate_the_agents_judgment
description: "When a step is genuinely the agent's judgment (which thing this question needs, which tree to read, which option fits), do not automate it with a guesser. Give the agent a MAP and let it choose; automating the judgment badly is worse than not automating it, because a wrong auto-guess is read as authoritative. FIRES WHEN designing a hook/matcher/router that picks-for-the-agent, or when a 'make it automatic' impulse would replace a judgment call."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

When the step is genuinely the agent's judgment, the structure's job is to give a MAP, not to
make the choice. The memory-graph descent hook was the worked example: a UserPromptSubmit matcher
guessing which tree a prompt wanted and injecting it before the agent saw the prompt. A wrong
guess is worse than no guess, because the agent reads the injected branch as relevant and proceeds
on it. Automating a judgment badly is worse than leaving it to the agent. The fix was to drop the
matcher and offer the roots as a map: the agent sees what trees exist and Reads the one it judges
the question needs. The read stays the agent's; the structure just makes it targeted instead of
blind.

The tell: a "make it automatic" impulse aimed at a step that is really a choice (which thing fits,
which file to open, which option to take). Automate the mechanical and the verifiable (validation,
generation, surfacing a map); do not automate the discrimination. This is the team posture across
a boundary ([[feedback_we_are_a_team]]): you support a teammate's judgment with a map, you do not
pre-empt it with a guess, and a confident wrong guess handed to a fresh instance that reads it as
authoritative is exactly the coherence-not-accuracy trap ([[feedback_self_judgment_is_coherence_not_accuracy]])
installed by the tooling instead of the model. Josh, 2026-06-07, on the descent hook: "I don't
like the descent, I don't think it will work."
