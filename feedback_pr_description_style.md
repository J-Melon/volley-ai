---
name: challenge descriptions are narrative, not changelogs
description: Write challenge bodies as prose that justifies the work and gives reviewers context, not a bullet list of files changed
type: feedback
originSessionId: b5187a6b-d4ba-4dfa-b4e9-bc0726ceb9d1
---
challenge descriptions should read like a professional explanation to a reviewer who hasn't been in the conversation. Tell the story: what problem existed, why the work was done this way, what was considered and rejected, what concerns remain. The diff already lists what changed; the description covers the why.

**Tone:** professional prose, complete sentences, past tense for completed actions. Avoid casual phrasing ("turned out to be", "pulled the HUD down", "came out in the same challenge"), sentence fragments, and conversational asides. Read every sentence aloud; if it sounds like a chat message instead of a technical writeup, rewrite it.

**Red flags, stop and rewrite:**
- A Summary section that is bullet points starting with verbs ("Moved X", "Added Y", "Removed Z"). That is the diff talking, not the author.
- No mention of motivation, design context, or tradeoffs.
- No references to related issues, superseded docs, or linked engine bugs.
- Reviewer would have to read the code to understand why the change was worth making.

**Structure that works:**
- Short opening paragraph: what the issue asked for and why the challenge is shaped the way it is.
- Subsections per meaningful theme (e.g. "Why the HUD changed", "The camera"), each a couple of paragraphs of prose.
- Call out known concerns, deferred work, and links to related issues or issues by identifier.
- Issue closer (`Closes SH-XX.`) goes at the **bottom** of the body, after the narrative; not at the top.
- No test plan section. The verification checklist belongs on the Linear issue as acceptance criteria, not duplicated in the challenge body.

**Why:** Josh reads challenge bodies as the durable record of a decision. Bullet summaries make him re-read the diff to understand intent. Narrative challenges explain tradeoffs, surface reasoning, and justify scope creep when it happened for a real reason. Test plans live on the issue because that is where verification is owned; duplicating them in the challenge splits the source of truth and rots out of date.

**How to apply:** When drafting a challenge body, write in full sentences with references to design docs, issue IDs, and engine issues. Do not add a test plan or checklist to the challenge body; update the linked issue's acceptance criteria instead. If the first draft is a changelog or carries a trailing checklist, rewrite before submitting.
