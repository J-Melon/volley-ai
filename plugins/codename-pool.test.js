import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const codenamesJson = JSON.parse(readFileSync(join(here, "codenames.json"), "utf8"))
const POOL = Object.values(codenamesJson.pool).flat()

function pickCodenameCurrent(usedNames) {
  const free = POOL.find((n) => !usedNames.has(n))
  if (free) { usedNames.add(free); return free }
  return null
}

function pickCodenameSessionUnique(usedNames) {
  const free = POOL.find((n) => !usedNames.has(n))
  if (free) { usedNames.add(free); return free }
  return null
}

describe("codename uniqueness per session", () => {

  it("assigns a unique codename each time until the pool is exhausted", () => {
    const used = new Set()
    const assigned = new Set()
    for (let i = 0; i < POOL.length; i++) {
      const name = pickCodenameSessionUnique(used)
      assert.ok(name !== null, `pool should have an unused name at iteration ${i}`)
      assert.ok(!assigned.has(name), `codename "${name}" was assigned twice at iteration ${i}`)
      assigned.add(name)
    }
    const overflow = pickCodenameSessionUnique(used)
    assert.equal(overflow, null, "pool exhausted should return null")
  })

  it("returns null when pool is empty", () => {
    const used = new Set(POOL)
    const name = pickCodenameSessionUnique(used)
    assert.equal(name, null)
  })

  it("does NOT assign a codename freed by markDone", () => {
    const used = new Set()

    const name1 = pickCodenameCurrent(used)
    assert.ok(name1 !== null)
    assert.ok(used.has(name1))

    const freed = name1
    used.delete(freed)

    const name2 = pickCodenameCurrent(used)

    assert.notEqual(
      name2,
      freed,
      "BUG: codename was reassigned after markDone freed it. " +
      "Line 111 (usedNames.delete) violates uniqueness."
    )
  })

  it("names stay used even after minion completes", () => {
    const used = new Set()
    const dipper = pickCodenameSessionUnique(used)
    assert.equal(dipper, "Dipper")

    const next = pickCodenameSessionUnique(used)
    assert.notEqual(next, "Dipper", "Dipper should still be in use after minion completed")
    assert.ok(next !== null)
  })
})

describe("pool integrity", () => {

  it("every name in codenames.json resolves to a unique entry", () => {
    const seen = new Set()
    for (const name of POOL) {
      assert.ok(!seen.has(name), `duplicate codename "${name}" found across universes`)
      seen.add(name)
    }
  })

  it("pool is non-empty", () => {
    assert.ok(POOL.length > 0, "codename pool must not be empty")
  })

  it("Gru is NOT in the pool", () => {
    assert.ok(!POOL.includes("Gru"), "Gru is reserved for the dispatcher")
  })

  it("agent pool contains only named individuals", () => {
    const forbidden = ["Slig", "Minion", "Hearthian", "Nomai", "Mudokon", "Glukkon", "Vykkers"]
    for (const name of POOL) {
      for (const bad of forbidden) {
        assert.ok(name !== bad, `"${bad}" is a group label, not a named individual`)
      }
    }
  })
})
