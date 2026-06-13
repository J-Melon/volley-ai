---
name: project_rest_damping_is_ball_state_not_court
description: "rest-roll damping (and rest behaviour generally) is a property of the ball's REST STATE, not of the court, because the venue rolls/rests balls too; the court is not the only place a ball comes to rest"
metadata: 
  node_type: memory
  type: project
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

A resting or rolling ball's damping belongs to the ball's rest state (BallStateConfig / out_rest.tres), not to the court. Reason: the **venue rolls balls too**, so resting happens off the court. Anything scoped to "court" leaves the venue case homeless.

This corrects a stale assumption that was baked into `ball.gd` (a comment claimed "damping is a court-tunable, not a ball-state-tunable" and overrode linear_damp from court_config) and that a spike agent on SH-425 also reasoned around from the config layout rather than the game. Both forgot the venue. Josh: "cannot be the court as venue rolls balls too."

Heuristic: when deciding where a ball-behaviour value lives, ask where the behaviour happens. If it happens in both court and venue, it's a ball/state property, not a court property. Don't infer ownership from which config file currently holds the field. Ties to [[feedback_spike_is_not_a_bug_fix]]: ground the design call in the actual game, not the existing structure.
