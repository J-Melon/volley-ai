---
name: code-style
description: Pre-push checklist for implementer and reviewer agents. CODE_STYLE.md (in the volley repo) is the source of truth for the core conventions; this skill adds the rules that live outside it. Skim before declaring done.
---

# Code style

Read `CODE_STYLE.md` at the root of the volley repo first. It is the source of
truth for: blank line before every `if`, `@export` over `@onready` for child
nodes, full-word names, descriptive variable names, one-line WHY-only comments,
and tunables-live-in-data (`Resource` subclass once a cluster forms). Do not
duplicate those rules here, with one deliberate exception: full words, restated
below because it is the one agents break most. If this skill and CODE_STYLE.md
ever disagree, CODE_STYLE.md wins and this skill needs fixing.

This skill covers what CODE_STYLE.md does not, and reinforces the one rule agents break most.

## Full words, no abbreviations

Spell every word out, in identifiers and in prose. `paddle_velocity`, not `pdl_vel`;
`current_state`, not `cur_st`; `configuration`, not `config` in a name you are coining;
`button`, not `btn`; `position`, not `pos`; `reference`, not `ref`; `temporary`, not `tmp`.
The extra letters cost nothing to type and save the next reader the guess.

The allowed shortlist is closed: `id`, `url`, `ui`, `ms`. Nothing joins it. When you catch
yourself shortening a word to save space, that is the signal to write it out. This applies to
variable, function, and file names, to comments, and to the prose in design docs and PR bodies.
A reviewer who sees a coined abbreviation flags it.

## Resource and script UIDs

- Every `.tres` file declares `uid="uid://…"` at the top.
- Every `[ext_resource type="Script" ...]` line in a `.tres` or `.tscn` carries
  `uid=`. Survives renames. Flag a new resource that ships without one;
  style-warden is `.gd`-only and never sees this.
- Files renamed via plain rename (not `file_ops`) lose their `uid://` anchor.
  Flag any `.gd.uid` / `.tscn.uid` change that doesn't correspond to an
  intentional move.

## Class-name async cache

For a `class_name X` added in the current session: use
`load("res://path/to/x.gd").new()` rather than `X.new()`. The class-name cache
updates async; the load form bypasses it. See CLAUDE.md's "Known quirks."

## Tests

- Player-observable assertions over implementation details. Don't assert
  internal flag values when an external behaviour proves the same thing.
- Run `./scripts/ci/run_gut.sh` before declaring done.

## Test output is clean

CI fails on any of these in the GUT output (gate lives in
`scripts/ci/run_gut.sh` and `.github/workflows/test.yml`):

- `WARNING:` / `ERROR:` / `SCRIPT ERROR:` / `USER WARNING:` / `USER ERROR:`
  lines (Godot's `push_warning` / `push_error`, addon noise, `ObjectDB
  instances leaked at exit`).
- Per-test orphan counts > 0 (yellow `N Orphans` lines after each test method).

What that means for the code:

- **Don't `push_warning` for a design-intended silent no-op.** If the contract
  is "refuse and stay quiet," the code must stay quiet. Use a return value or
  state flag the caller / test can assert on.
- **Don't `queue_free` a node you just `remove_child`'d** unless it has live
  consumers (`_process`, `_physics_process`, or pending signals). The
  idle-frame gap leaves it orphaned. Use `free()` when ownership is exclusive.
- **Don't `await get_tree().process_frame` inside `while is_inside_tree():`
  polling loops.** When the host is freed mid-await, the coroutine state
  survives. Use a signal (`get_tree().node_added`, a typed ready-signal on the
  producer) and disconnect in `_exit_tree`.
- **In test files, route every `Node.new()` / `add_child` /
  `PackedScene.instantiate()` through `autofree` / `add_child_autofree`**
  unless GUT already manages the host (doubles are auto-freed).

See `ai/scratchpads/gut-orphans-research.md` (volley repo) for the diagnostic
recipe and Volley-specific suspect list.
