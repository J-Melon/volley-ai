import assert from "node:assert/strict"
import { describe, it } from "node:test"

const STATE_CLAIM =
  /\b(merged|is open|is closed|reopened|blocked|approve|approves|approved|approval|passing|passed|failing|failed|mergeable|queued|landed|ready to merge|auto-?merge|all checks|checks? (pass|green|red|fail)|review (passed|verdict|blocked|approved)|green|red)\b/i
const MENTIONS_PR = /(?<!\b(?:GitHub\s)?issue\s|ticket\s)#\d+|\bPRs?\b|pull request/i
const GH_READ = /gh pr (view|list|status|checks)|gh api[^\n]*(\/pulls|\/issues)/i

// ---- MENTIONS_PR ----

describe("MENTIONS_PR", () => {
  const should = (label, text) => it(label, () => assert.ok(MENTIONS_PR.test(text)))
  const shouldNot = (label, text) => it(label, () => assert.ok(!MENTIONS_PR.test(text)))

  should("PR #1001", "PR #1001 is merged")
  should("pull request #1001", "pull request #1001 needs review")
  should("bare #number not preceded by issue context", "#1001 passed all checks")
  should("PRs standalone", "both PRs are green")
  should("pull request standalone", "the pull request is ready")

  shouldNot("GitHub issue #N", "GitHub issue #1011 is open")
  shouldNot("bare issue #N", "issue #1011 tracks the LFS work")
  shouldNot("ticket #N", "ticket #1011 has no comments")
  shouldNot("SH- dash reference", "SH-522 is Ready")
  shouldNot("plain text no PR mention", "the game runs at 120 fps")
})

// ---- STATE_CLAIM ----

describe("STATE_CLAIM", () => {
  const matches = (label, text) => it(label, () => assert.ok(STATE_CLAIM.test(text)))
  const noMatch = (label, text) => it(label, () => assert.ok(!STATE_CLAIM.test(text)))

  matches("merged", "PR #1002 merged")
  matches("is open", "PR #1001 is open")
  matches("is closed", "the PR is closed")
  matches("approved", "review approved by Zaphod")
  matches("passing", "CI is all passing")
  matches("failing", "checks are failing on main")
  matches("mergeable", "PR is mergeable")
  matches("green", "all checks green")
  matches("red", "CI is red")
  matches("ready to merge", "ready to merge after rebase")
  matches("review passed", "review passed with 2 approvals")
  matches("auto-merge", "auto-merge is enabled")
  matches("automerge", "automerge after CI")

  noMatch("opencode (word boundary)", "opencode is running")
  noMatch("disapproved (word boundary)", "the change was disapproved")
  noMatch("emerge (partial word boundary)", "they emerge from the void")
})

// ---- GH_READ ----

describe("GH_READ", () => {
  const isRead = (label, cmd) => it(label, () => assert.ok(GH_READ.test(cmd)))
  const notRead = (label, cmd) => it(label, () => assert.ok(!GH_READ.test(cmd)))

  isRead("gh pr view", "gh pr view 1001 --json state,mergeable")
  isRead("gh pr list", "gh pr list --state open --json number,state")
  isRead("gh pr status", "gh pr status")
  isRead("gh pr checks", "gh pr checks 1001")
  isRead("gh api pulls", "gh api repos/shuck-dev/volley/pulls/1001")

  notRead("gh issue view", "gh issue view 1011 --json title")
  notRead("git log", "git log --oneline -5")
})

// ---- combined: MENTIONS_PR && STATE_CLAIM ----

describe("combined", () => {
  const fires = (label, text) => it(label, () => {
    assert.ok(MENTIONS_PR.test(text), "MENTIONS_PR should match")
    assert.ok(STATE_CLAIM.test(text), "STATE_CLAIM should match")
  })
  const silent = (label, text) => it(label, () => {
    const match = MENTIONS_PR.test(text) && STATE_CLAIM.test(text)
    assert.ok(!match, "should not fire")
  })

  fires("PR #N merged", "PR #1002 merged yesterday")
  fires("bare #N is open", "#1001 is open and mergeable")
  fires("PRs green", "both PRs are green after the push")
  fires("pull request review passed", "the pull request review passed")
  fires("bare #N ready to merge", "#1001 ready to merge")

  silent("GitHub issue #N is open", "GitHub issue #1011 is open, no comments")
  silent("bare issue #N is open", "issue #1011 is open")
  silent("no PR mention, has state word", "the game runs at 120 fps and is green")
  silent("SH- dash with state", "SH-522 is open and ready")
})
