var accessor = require('../index')()
  , test = require('tape')

accessor.filters.test = function(parts, change) {
  return this.create_part(parts[0], function(val) {
    change(2 * val)
  })
}

test('filters', function(t) {
  t.plan(2)

  accessor.create('test(5)', function(val) {
    t.strictEqual(val, 10)
  })()

  accessor.create('test(test(5)) + "" -> length', function(val) {
    t.strictEqual(val, 2)
  })()
})
