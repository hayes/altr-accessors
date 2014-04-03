var accessor = require('../index')()
  , test = require('tape')

test('binary operators', function(t) {
  t.plan(29)

  accessor.create('0 || 1', function(val) {
    t.strictEqual(val, 1)
  })()
  accessor.create('3 || 0', function(val) {
    t.strictEqual(val, 3)
  })()
  accessor.create('3 || 1', function(val) {
    t.strictEqual(val, 3)
  })()
  accessor.create('0 && 1', function(val) {
    t.strictEqual(val, 0)
  })()
  accessor.create('3 && 0', function(val) {
    t.strictEqual(val, 0)
  })()
  accessor.create('3 && 1', function(val) {
    t.strictEqual(val, 1)
  })()
  accessor.create('2 | 1', function(val) {
    t.strictEqual(val, 3)
  })()
  accessor.create('1 & 3', function(val) {
    t.strictEqual(val, 1)
  })()
  accessor.create('1 ^ 3', function(val) {
    t.strictEqual(val, 2)
  })()
  accessor.create('"1" == 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('"2" == 1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('"1" === 1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('1 === 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 < 2', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 < 1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('1 <= 2', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 <= 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 <= 0', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('2 > 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 > 1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('2 >= 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('1 >= 1', function(val) {
    t.strictEqual(val, true)
  })()
  accessor.create('0 >= 1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('1 + 1', function(val) {
    t.strictEqual(val, 2)
  })()
  accessor.create('1 - 1', function(val) {
    t.strictEqual(val, 0)
  })()
  accessor.create('"1" + 1', function(val) {
    t.strictEqual(val, '11')
  })()
  accessor.create('1 * 3', function(val) {
    t.strictEqual(val, 3)
  })()
  accessor.create('3 / 3', function(val) {
    t.strictEqual(val, 1)
  })()
  accessor.create('5 % 3', function(val) {
    t.strictEqual(val, 2)
  })()
})

test('unary operators', function(t) {
  t.plan(4)

  accessor.create('!1', function(val) {
    t.strictEqual(val, false)
  })()
  accessor.create('~0', function(val) {
    t.strictEqual(val, -1)
  })()
  accessor.create('+"1"', function(val) {
    t.strictEqual(val, 1)
  })()
  accessor.create('-1', function(val) {
    t.strictEqual(val, -1)
  })()
})
