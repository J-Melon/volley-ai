---
name: Library/tool docs questions go to researcher with context7, not main-thread WebSearch
description: When the question is "what does library X do / how does config Y behave", dispatch researcher (context7 first, then WebFetch) instead of burning turns on WebSearch in main thread
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
For questions about a specific library, tool, or external system's documented behavior — "why does lefthook print this", "what config flag does ruff expose", "what does Godot's `_physics_process` guarantee about delta" — the right first move is to dispatch the `researcher` agent with a "context7 first, WebSearch/WebFetch fallback" brief, not to start with WebSearch in the main thread.

**Why:** Main-thread WebSearch costs serial turns and pollutes the parent context with raw search snippets. context7 has structured library docs and is faster + more authoritative. The researcher is also the agent set up for the trust boundary on open-web content (per `feedback_research_findings_to_scratchpad`).

**How to apply:**

- If the question is "what does this tool/library do or how is it configured", default to researcher dispatch on the first turn that needs external docs. Don't do one or two WebSearches first and then escalate.
- Brief the researcher: "resolve the library via context7 (`mcp__context7__resolve-library-id` then `mcp__context7__query-docs`); web search/fetch as fallback".
- Background-dispatch by default (per `feedback_agents_default_background`).
- Parent owns the scratchpad write (per `feedback_research_findings_to_scratchpad`).
- Quick fact lookups (one URL, one paragraph answer) still belong inline. The rule kicks in for multi-source docs questions.

Signal that this rule fired late: Josh asks "context7?" or "researcher?" mid-investigation. That's the cue to switch immediately rather than keep WebFetching.
