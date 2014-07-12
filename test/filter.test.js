var accessor = require('../index')()
  , test = require('tape')

accessor.add_filter('double', double)
accessor.add_filter('double_scope', double_scope)

function double(parts, change) {
  return this.create_part(parts[0], function(val) {
    change(2 * val)
  })
}

function double_scope(parts, change) {
  return function(val) {
    change(2 * val)
  }
}

test('filters', function(t) {
  t.plan(3)

  accessor.create('double(5)', function(val) {
    t.strictEqual(val, 10)
  })()

  accessor.create('5 -> double_scope()', function(val) {
    t.strictEqual(val, 10)
  })()

  accessor.create('double(double(5)) + "" -> +$data + 1', function(val) {
    t.strictEqual(val, 21)
  })()
})
