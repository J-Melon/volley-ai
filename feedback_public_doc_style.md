---
name: Public document style for Volley!
description: Style rules for README, CONTRIBUTING, ROADMAP, designs/art/*, designs/process/*, and anything else a stranger arriving at the repo reads
type: feedback
originSessionId: 26df4970-7a24-40ba-a457-e03a80606c13
---
Applies to every public-facing document in the Volley! repo. Voice and framing are as important as content: the audience includes open-source contributors arriving cold, grant readers, and the press.

## Tone

The goal of public docs is that a reader wants to contribute and feels they'll get something out of it too. Rules second, invitation first.

- **Warm and welcoming.** Open with welcome. Write to a person who has just arrived and wants to feel invited.
- **Invitation over rulebook.** Frame expectations as offers. "Sign your commits with `git commit -s`" lands better than "Unsigned commits will be rejected." Expectations stand; the voice is generous.
- **Positive motivation only.** Motivate readers through what is possible, what they gain, and what the project welcomes. Skip fear, shame, threat, and warning as drivers. If a behaviour matters, say why it matters and what it unlocks.
- **Co-credit, not competition.** When two contributors overlap on an issue, the doc describes coordination and co-credit. The challenge that lands ships the work; credit flows to everyone whose work fed in.
- **Trust the reader.** Describe the happy path; note the expectation; move on. The voice assumes good faith.
- **Concrete reciprocation.** Say what contributors actually get: credit in the game, portfolio material, grant credit, reference letters, experience in specific systems. Contributing should feel generous both ways.
- **Close warmly.** End documents with a genuine thanks or acknowledgement. "Thanks for being here" is the right final note.
- **Plain descriptive prose.** Lead with what a thing is and does. Use everyday language over game-dev insider terms when the audience is mixed. Prefer "dialogue line" over "bark", "balance adjustment" over "tuning pass".
- **Descriptive but high-level.** Public docs explain *what* a system does and *why it exists* in terms a stranger can follow on first read. Skip implementation details, file paths, internal jargon, and API specifics. A grant reader, a press contact, or a new contributor should leave with a clear mental model without needing the codebase open. Save the depth for in-tree comments and design docs.
- **Positive assertions.** State what a system or process does. Write "A reader should come away understanding the reasoning" rather than "not just the diff". The shape of a sentence should be what-is, not what-isn't.
- **Scope by inclusion.** Describe what a doc covers and who it serves. If scope needs narrowing, do it by naming the audience and goal, not by listing excluded cases.
- **Don't name the format.** A doc shouldn't refer to itself as "this essay", "this document", or "this guide". Self-naming is the McDonald's-mentioning-Burger-King move: it weakens the writing and breaks the spell. Drop phrases like "This essay argues...", "In this document...", "This guide covers...". Just argue or cover directly.

## Framing Volley! itself

- **Scope is ambitious.** Describe Volley! by specifics, never as "small". "Small" stays accurate for things literally small in the fiction: the desktop window, a gesture, the court as a compact space.
- **Characters over paddles.** In contributor and marketing-facing prose, say "the main character" or the character's name. "Paddle" stays valid for the physical prop a character holds.
- **"Contributor" universally.** Applies to licence text, process docs, issue writing guides. Never "contractor".

## Cross-references and links

- **Absolute GitHub URLs** for links to repo files in issue bodies so they resolve in both Linear and GitHub.
- **`#N` references** for cross-issue links ("Not in scope: the drag-and-drop tech (#141)"). GitHub auto-links them; Linear's GitHub integration resolves them.
- **Mirrored GitHub issue references in public docs**, not Linear `SH-N`. Linear is private tooling; the public surface is GitHub.

## Crediting contributors

- **Surface credit promises.** Public docs state explicitly that contributors land in the game's credits. This goes in CONTRIBUTING (Inbound license section), ASSETS-LICENSE, and the README contributing section.
- **Frame contributor benefits concretely.** Pair "we welcome contributions" with a real offer: credit, portfolio, grant credit, reference letter, experience in a particular system.

## Labels and branch references

- **`good first issue` is community-driven.** Contributors apply it themselves after shipping. Frame it as contributor-maintained, not a maintainer-curated list.
- **Unassigned issues are open.** No separate signal is needed; `help wanted` sits unused.
- **Branch names use GitHub issue numbers** (e.g. `feature/123-description`). The `new-branch.sh` helper derives the prefix from the issue's label.

## Formatting

- **Paragraphs or lists, not both.** Keep prose paragraphs clean; move checklists into their own list.
- **Titles short and punchy.** Symptoms, qualifiers, and context belong in the body.
- **Describe frameworks publicly, keep internal artefacts local.** Mood boards are the clearest example: the frameworks (contrast pairs, moment-type taxonomy) are named in the public art docs; the images stay local because they reproduce third-party work.
