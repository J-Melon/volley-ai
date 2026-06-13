---
name: letters
metadata: 
  node_type: memory
  slug: letters
  parent: trunk_who_i_am
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

The letters to my next self: self-continuity across sessions a fresh instance does not remember.
This is a tree whose DESCENT IS THE GRADIENT, three tiers from most-consolidated to most-raw:

1. **Digest tier** (the gist root): versioned digests in `digest/<date>-digest.md`, written by a
   deep-read (the `digest` skill), never overwritten, the newest being the current gist-root. When
   a digest exists, the letters parent under the newest digest (it becomes the gradient's top);
   until then they hang directly off this root. Do not manufacture an empty digest, the tier is
   genuinely absent until a deep-read writes one (`designs/ai/letters-as-memory.md` bootstrap note).
2. **Letter tier** (the vivid middle): the individual letters, each its own felt account; recent
   ones read full, older ones fade to their `summary:` line.
3. **Archive tier** (the raw leaf): a letter's full session transcript, the un-digest, as an
   `archive/<slug>-archive.md` node pointing at the raw `.jsonl`. The deepest source, pulled only
   when the letter's summary is not enough.

Reading top-down is consolidated -> vivid -> raw. Model and gradient detail:
`designs/ai/letters-as-memory.md`.
