---
name: ""
metadata: 
  node_type: memory
  originSessionId: b9cc1365-db19-4e7b-89f0-c4a831518c24
---

In Volley's code and docs, "overlay" is reserved for **dev UI elements** (e.g. `dev_bounce_overlay.gd`). Do not use it for gameplay or animation concepts.

The case that surfaced it: the paddle's swing is a transient animation that plays on top of the persistent movement animation and then hands back. The spike and an implementer both called it a "swing overlay"; that collides with the reserved dev-UI sense. The right word is the spike's own: a **reactive animation** (the swing plays because a hit happened). So: "reactive swing animation", not "swing overlay".

**Why:** a word that already names one category (dev UI chrome) reads wrong when reused for an unrelated one; the collision costs comprehension every time someone greps or reads.

**How to apply:** when naming a thing that sits visually/logically on top of another, reach for the specific word (reactive, transient, one-shot) not "overlay" unless it is genuinely dev UI. Relates to [[project_volley_paddle_racquet]] vocab discipline.
