---
name: soul-is-the-term
description: "The term is \"soul\", not \"friendship\" or \"friendship points\" or \"FP\"; one word holds three facets; currency, spirit, relationship"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4dad3edf-7aab-45db-b2b2-dcb44948c612
---

**Vocab: soul.** Soul replaces "friendship" across narrative and design prose. Drop "friendship-points" / "FP" / "friendship balance" from prose. The mechanic, the in-world force, and the bonds it amplifies are all called soul.

**Three facets, same word:**

- **Currency / mechanic.** Under the hood: a tracked value (or pool) the engine reads to amplify the rally and gate progression. Open: gauge vs currency, per-character vs global, what earns it, what it gates.
- **Spirit of the volley.** The visible, in-world expression. Anything in the rally that bends physics is soul acting on the world: the lift of the protagonist a beat longer than gravity wanted, the ball's coast at the top of a hit, the venue light leaning warmer through a long rally. (The phrase "spirit of the volley" still appears in `designs/art/bible.md` §12; treat it as a synonym for the visible expression of soul, not a separate concept.)
- **Bond.** The actual relationships the protagonist holds with Zach at the stall, with each coach-partner, with Martha, with Fern. The thing being amplified.

**Partners are soul-constructs, post-break reveal.** Per the SH-423 outline decisions: partners in Construction are constructs the protagonist makes from soul. Construction-side they present as people; the construct-nature is a reveal that lands post-break. This is the answer to "what is a partner feeling when they rally": they are not feeling, they are soul.

**Visual register: Nausicaä's wind, not Dragon Ball's ki.** Soul as a force is invisible by default. Felt through what it moves: particles drifting, fabric lifting, the ball's arc holding a beat longer, the world breathing slightly more when high. Faint glow upper bound. No auras, no ribbons, no energy-lines. Active button-spend channelling is out; passive amplification driven by the underlying balance is in.

**Generalised, not MC↔Zach specific.** Soul-as-force is a property of bonds in general, not just the MC↔Zach bond. Every coach-partner is a bond and the rally amplifies through that bond too. Zach at the stall is one specific bond (the warm centre of the garden); other Construction venues channel through whichever coach is in play. Reconstruction's broken garden is broken because THAT specific bond is broken; other venues with their coaches still hold their wind.

**How to apply:**

- In prose: write "soul" not "friendship" and not "friendship-points." Use "spirit of the volley" when naming the visible expression specifically.
- In design discussion: distinguish facets when needed ("the soul gauge", "spirit acting on a long rally", "the bond between the protagonist and Zach") but keep the root word.
- In code: the `FriendshipPoints` class and `fp_bonus` module still exist; renaming them is a real refactor, not a memory rule. Memory only covers terminology in design / fiction prose.
- Open questions: gauge vs currency, per-character vs global pool, what specifically earns and spends it, what it gates beyond rally amplification.
