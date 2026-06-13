---
name: feedback_edit_config_as_text
metadata: 
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**To change a checked-in config file (settings.json, a YAML, a JSON fixture), edit the text in place; never round-trip it through a parser that re-serialises the whole file.** `python3 json.dump` (and yaml.dump) rewrite every line to the library's formatting, so a one-entry addition lands as a full-file reformat: the real change is buried in hundreds of churned lines, and the PR conflicts with every other branch touching that file. No formatter canonicalises `.claude/settings.json` (check-format is a commit-message check, not a JSON formatter), so there is no "correct" restyle to impose: neither expanding to multi-line nor collapsing to one-line is right. The only correct output is the file as it was plus my one change, in whatever local style the surrounding lines already use. Use a targeted text Edit on the exact lines so the diff is only the lines that actually changed.

This is the [[feedback_minimize_not_edit_pr_noise]] discipline applied to config files, and the reason `gh pr diff` and merge depend on a small diff. 2026-06-08: I added a hook entry to `.claude/settings.json` with `json.dump` on three separate PRs (#891, #894, #895); each reformatted the whole file, #891 shipped the churn to main, and #894/#895 then conflicted on every hook block. The fix each time was to restore the file from main and re-add the one entry as text. Josh, via the reviewers (Chert, Esker), flagged it every time. Edit as text from the first move.
