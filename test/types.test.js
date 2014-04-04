var accessor = require('../index')()
  , test = require('tape')

test('types', function(t) {
  t.plan(4)

  accessor.create('5', function(val) {
    t.strictEqual(val, 5)
  })()

  accessor.create('5.5 + 5', function(val) {
    t.strictEqual(val, 10.5)
  })()

  accessor.create('"5" + 10', function(val) {
    t.strictEqual(val, '510')
  })()

  accessor.create("'5.5 + 5'", function(val) {
    t.strictEqual(val, '5.5 + 5')
  })()
})
