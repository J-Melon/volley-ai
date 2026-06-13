---
name: Design docs don't name specific collaborators
description: design docs (designs/**) read for any current and future collaborator; don't pin them to whoever happens to be on the project right now
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
Design docs (`designs/audio/**`, `designs/art/**`, `designs/narrative/**`, `designs/characters/**`, etc.) describe the work the discipline owns. They do not name the specific person currently doing it. The doc has to read for *anyone* who picks up the brief, including the collaborator who replaces today's collaborator three years from now.

**Why:** A design bible that says "Patrick's natural instrument is piano" reads as a personal context note, not as a design statement. When Patrick is no longer the composer, the line either gets stale or has to be rewritten. The doc's job is to hold the why; the *who* is operational state and lives in operational surfaces (Linear, the briefing thread, the kickoff doc), not in the bible. Established 2026-05-01 after I named Patrick (the composer briefed for the audio bible) twice in `designs/audio/bible.md` and Josh corrected: "Don't mention Patrick this is for anyone."

**How to apply:**
- When writing or editing a design doc, refer to roles by role: "the composer", "the artist", "the engineer", "the writer", "the collaborator picking this up".
- If a constraint is tied to the *current* collaborator's circumstances (e.g. "they're most fluent at piano so we start there"), frame it as a property of the moment, not of the person: "the composer who picks this up first is most fluent at the keyboard" rather than "Patrick's natural instrument is piano".
- Operational facts about who's doing what live in Linear ticket descriptions, Slack threads, or `designs/private/` notes if a durable record is needed. They do not live in the bible.
- Exception: published essays and external-facing docs (`designs/research/**`) do cite real authors as references; that is normal scholarship, not project-collaborator naming.
