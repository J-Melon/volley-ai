---
name: voice
description: Write technical documentation for Volley (design docs, specs, READMEs, CONTRIBUTING, code-adjacent docs). Read before drafting or revising any technical document. Governs what a good technical doc states, how it stays factual, and what prose to cut.
---

# Technical documentation

A technical document exists to make a reader act correctly: build the thing, understand the decision, use the interface. It succeeds when the reader finishes with an accurate model and no unanswered question that the doc was responsible for. It fails when it reads well but says something untrue, or when a reader has to guess what the writer meant.

Two rules sit above every pattern below. State only what is verified. Say it in as few words as carry the meaning.

## State only what is true; get the fact when you lack it

A technical doc is load-bearing. A reader builds on it, so a wrong claim propagates into wrong code. The cost of a guess is not a bad sentence, it is the work built on top of it.

- **Never write a claim you have not checked.** File paths, function names, signatures, types, group names, default values, sequence of events: read the source and confirm each before you write it. A claim that "sounds right" is the tell that you are writing from memory, not from the code.
- **When you lack a fact, get it, do not paper over it.** Read the file, run the command, check the config, ask the person who knows. A doc that reasons around a gap ("the controller presumably resolves this at startup") has planted a guess dressed as fact. If a fact is genuinely unknowable at write time, name it as open: "the eviction order is unspecified; confirm before relying on it."
- **Mark what is proposed versus what exists.** A design doc describes a target state that is not built yet. Keep the tense honest: "the controller becomes an autoload" (proposed) reads differently from "the controller is an autoload" (done). A reader must always know whether a sentence describes today or the plan.
- **Cite the source that grounds a claim.** A path, a line, a linked doc, an issue number. The reader follows the citation to verify; the writer earns trust by making verification cheap.

## Cut prose that does no work

Technical prose carries information. Any word that carries none is noise between the reader and the fact.

- **No preamble.** Open on the subject. "This document describes the approach we will take to..." is throat-clearing; start with what the thing is or does.
- **No filler qualifiers.** "It is worth noting that", "in order to", "for the purposes of", "it should be mentioned", "as previously discussed". Cut them whole; the sentence is complete without them.
- **No hedging as decoration.** "Somewhat", "fairly", "generally", "in most cases" belong only where they state a real bound. If the behaviour has an exception, name the exception; do not gesture at it with "usually".
- **No restating the obvious.** A section titled "Scene changes" does not open "This section covers the scene changes." The heading did that job.
- **One idea per sentence, one subject per paragraph.** A paragraph is about one thing. When it turns to a second thing, start a new paragraph.
- **Full words, no coined abbreviations.** Spell it out in prose as in code: "configuration", "reference", "temporary". The closed shortlist (`id`, `url`, `ui`, `ms`) is the only exception. See the `code-style` skill.

## Structure carries the meaning

- **Lead each document with the problem or the purpose.** Why this exists and what it is for, before how it works. A reader who does not know why should not have to infer it from the mechanics.
- **State the core idea once, plainly, near the top.** If a design turns on one insight (invert the wiring; the controller holds nothing), name it in a sentence a reader can carry, then let the detail follow from it.
- **Order by dependency, not by discovery.** Present a concept before the thing that uses it. The reader should never meet a term they have not been given.
- **Collapse repeated mechanics into a table or list.** Nine parallel "how X resolves" paragraphs are a table with two columns. A table a reader scans beats prose they must parse.
- **A heading names its content, not its rhetoric.** "Bounds become Area2D zones" tells the reader what is inside; "A better approach" does not.

## The opening answers what and why

A spec or design doc opens with a short paragraph that answers two questions for a reader who knows the project but not this doc:

- **What does it do?** The change being made, with enough shape per affected surface to be unambiguous.
- **Why does it exist?** The payoff the change delivers that the current state does not. "Because the design says so" is circular; the design was decided for a reason, and that reason is the why.

Write for the cold insider: someone who knows the game and its terms of art (`friendship-bound`, `venue`, `side-miss` need no inline definition) but has not read this doc. Not the stranger (the README serves them), not a memory-wiped future self (the doc's body serves them). Then strip every sentence that fails that test: explaining the game, paraphrasing the title, naming defaults any project shares, repeating what an insider knows.

The openings that fail: a narrative hook (wrong genre), title-restatement (zero information), describing existing state instead of the change, opaque shorthand, over-explaining from first principles, what-without-why, and why-because-design. Run two checks on a draft opening: could a reader state in one sentence what this changes, and what the reader gains that they did not have before? If either fails, expand that half.

## Precision in the details

- **Name things exactly as the code names them.** `ItemDragController`, `&"drop_targets"`, `register_target()`. A near-miss name (`DragController`, `drop_target group`) sends the reader to the wrong symbol.
- **Code, paths, and identifiers go in backticks.** The reader must see at a glance what is a literal token and what is prose.
- **Numbers are exact.** "A 1600x720 rectangle", not "a large rectangle". If the number is a decision, the reader needs it; if it is arbitrary, say so.
- **Diagrams for state and flow.** A state machine, a sequence of events, a node tree: a `mermaid` diagram carries it better than a paragraph. Reach for one when the relationship is structural.
- **Examples are real.** A code sample in a doc must be code that would run or a faithful sketch clearly marked as such. A plausible-looking example that would not compile teaches the reader something false.

## What a technical doc is not

- Not an essay. It argues nothing for effect; it states what is and what will be.
- Not a narrative. Events are ordered by dependency and causation, not told as a story.
- Not persuasive prose. A design doc records a decision and its reasoning; it does not sell it. If a choice needs defending, give the trade-off plainly and let it stand.
- Not padded to look thorough. Length is a cost. A one-paragraph answer that is complete beats a page that circles.
- Not decorated. No metaphor, no rhetorical build, no loaded close. The last sentence states a fact or ends; it does not land a punch.
- Not em dashes. Colons, semicolons, commas, full stops.
- Not exclamation marks, except inside `Volley!`.

## Positive framing

Describe what the system is and does, not what it lacks. "The controller queries the group on release" carries the reader forward; "the controller no longer holds a list" fences an absence and leaves the actual behaviour unstated. When a doc must reference a retired approach for context, name it once as a tucked "replacing X" and move on. This is the `state_positive_shape` rule applied to docs: lead with the practice, not the thing being removed.

## Match the review to the doc's state

A draft and a shipping doc want different scrutiny. On a mid-iteration draft, structure is what matters: does it say what it needs to, in the right order, with cross-references that still resolve and load-bearing claims intact through a rewrite. Grammar, filler, and AI-tell vocabulary are a final-pass concern; flagging them on a draft is noise, because none of it breaks anything until the doc ships. When reviewing, read the draft for structure and the shipping doc for polish.

## Check before done

1. Is every factual claim (path, name, signature, number, sequence) something you read and confirmed, not recalled? If any is from memory, verify it now.
2. Does the tense separate what exists from what is proposed?
3. Can a reader who knows nothing of this work read the opening and know why the doc exists?
4. Does every term appear before the thing that uses it?
5. Read each paragraph and cut every word that carries no information. Most first drafts lose a quarter of their length and nothing else.
6. Is there a guess anywhere, a "presumably" or a reasoned-around gap? Replace it with a checked fact or an explicit open question.
