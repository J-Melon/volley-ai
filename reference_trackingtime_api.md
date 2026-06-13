---
name: TrackingTime API auth available
description: Josh has a TrackingTime (trackingtime.co) API credential in env as TRACKINGTIME_AUTH; usable for time-tracking queries or pushes
type: reference
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
The shell env exposes `TRACKINGTIME_AUTH` for the TrackingTime REST API at `https://app.trackingtime.co/api/v4/`. The value is **already base64-encoded**; use as `-H "Authorization: Basic $TRACKINGTIME_AUTH"`. Do NOT pass to `curl -u`; that treats the string as literal `user:pass` and leaks the encoded credential into the terminal as a prompt.

**Why tracked:** Josh flagged 2026-04-24 that this key exists; available for time-tracking lookups or pushes on missions, Challenges, or cycles.

**How to apply:**
- Query time entries: `curl -H "Authorization: Basic $TRACKINGTIME_AUTH" https://app.trackingtime.co/api/v4/events`
- Docs: https://trackingtime.co/api (verify endpoint shape before writing actions).
- Don't echo the full token in command output or in challenge bodies; treat as secret.
- If Josh wants mission-duration stats, TrackingTime events can be queried per project/task; match TrackingTime task to Linear mission/issue as needed.

Not clear yet whether Josh wants this for reporting, automation, or just visibility. Ask before writing logic against it.
