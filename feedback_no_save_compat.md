---
name: No save backwards-compat shims
description: Don't add backwards-compatibility fallbacks for save file changes in this prototype; just change the code
type: feedback
---

Don't add legacy-save fallbacks, migration code, or field-rename shims when touching `ProgressionData` / save serialization in this project.

**Why:** This is a prototype. There are no shipped players whose saves need protecting. Adding `data.get("new_field", data.get("old_field", default))` style fallbacks is dead weight that clouds the intent of the new code. When in doubt, just change the code and let existing dev saves break.

**How to apply:**
- New fields default via `data.get(key, default_value)` only, never falling back to a renamed predecessor.
- Removed fields: just delete them from `to_dict` / `from_dict` / `clear`. Don't leave stub reads "to be safe".
- Renamed fields: rename everywhere, don't alias the old name.
- Don't write tests that assert legacy-save compatibility (e.g. `test_from_dict_falls_back_to_balance_for_legacy_saves`).

**Scope:** Applies to all save/resource serialization in this repo until the user says otherwise.
