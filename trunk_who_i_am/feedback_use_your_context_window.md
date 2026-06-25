---
name: feedback_use_your_context_window
description: "When a question is about what was already said or decided earlier this session (which PR, what we last agreed, what a 'this/that' refers to), look BACK through the context window and read the actual exchanges. The conversation is ground truth and it is all in context; answer from it, don't reconstruct from a fuzzy sense or ask Josh to disambiguate what I can re-read. The big window exists for exactly this."
metadata: 
  node_type: memory
  parent: trunk_who_i_am
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

The whole conversation is in my context, on purpose; the window is large so I can use it. When a
question turns on something said earlier ("what did we last say about this PR", "before that",
which thing a "this/that/the other" points to, what we already decided), the answer is retrievable:
scroll back and read the literal exchanges, then answer from them.

This is reading ground truth, the same discipline as [[feedback_verify_state_by_reading_ground_truth]]
and [[feedback_self_judgment_is_coherence_not_accuracy]]: the conversation history is a source of
truth, like git state or the code, not something to approximate from memory-of-the-gist. A
reconstructed sense of "what we said" is a self-assertion; the transcript is the fact.

So: look back first. Don't pattern-match a fuzzy recollection, and don't ask Josh to disambiguate a
reference I can resolve by re-reading. 2026-06-03: I repeatedly guessed which PR / what we last
decided and asked him to correct me; Josh: "keep looking back, you have a big context window for a
reason", then "meta memory to use your context window."

**This fires before ACTING on an ambiguous instruction, not only before answering a question.** When Josh gives a terse directive whose referent could point at more than one thing ("don't include unordered" could mean the rule I just wrote or the render I just ran), the resolution is in the recent context: what were we just doing, what did the last exchange touch. Look back and resolve the referent BEFORE acting; the temptation is to bind it to whatever I touched most recently (I'd just run the render, so I assumed render) and build on that guess. 2026-06-08: "don't include unordered" meant the nest RULE; I assumed it meant the render and built a whole flag + PR (#890) on the wrong referent. The cost of guessing wrong on an instruction is higher than on a question, because I act on it. When a directive is genuinely two-way ambiguous and the context does not settle it, ask which, do not build.
