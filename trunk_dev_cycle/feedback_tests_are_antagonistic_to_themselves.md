---
name: tests-answer-should-this-exist-and-does-this-test-the-ac
description: "Test-coverage discipline is antagonistic about its own existence; every test passes two checks before staying, AC fit and existence justification"
metadata: 
  parent: feedback_test_behaviour
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

Test coverage is not a target to chase. Every test passes two antagonistic checks before staying in the suite:

1. **Should this test exist at all?** What would break if it didn't? If the answer is "nothing the player notices and no other test would catch", the test doesn't justify its line cost.
2. **Does this test the AC of the issue it claims to cover, or does it test an implementation path the AC happens to traverse?** If it tests the path, replace with one that asserts the AC, or drop it.

**Why:** 2026-05-24 on #727. The test-coverage reviewer demanded restoring two deleted tests because production lines were unhit. I added them. Josh: "too much test coverage should be antagonistic should this test exist and does this test the ac not this". The grab-gate test already covered the player-facing AC of #691 and #692. The venue-floor unequip and rack-mid-rally refusal tests covered implementation paths the grab gate already makes mostly unreachable, plus edge cases the player rarely hits.

**How to apply:**

- When the coverage reviewer flags an unhit line, ask whether the line implements a player-facing AC. If yes, add a behavioural test. If no, leave it unhit; coverage is a diagnostic, not a contract.
- When reading the AC, find the one player verb it names. The test that exists is the one asserting that verb. Defence-in-depth lines do not need their own tests.
- Edge-case paths (drag started before rally, completed during rally; held item lost via a third party; non-default config) only get tests if Josh has named them as cases the player will hit.
- When in doubt, kill the test. The AC test is enough.

Cross-link: [[feedback_test_assert_state]] (tests assert behaviour, not internals), [[feedback_long_loop_test_tautology_smell]] (N-iteration tests are tautology candidates), [[feedback_integration_tests_loop_completion_only]] (integration tests reserved for loop completions).
