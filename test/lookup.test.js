var accessor = require('../index')()
  , test = require('tape')

test('filters', function(t) {
  var val = {}

  val.a = {}
  val.a.b = '100'
  val.a.c = 95
  t.plan(3)

  accessor.create('a.b - a.c', function(val) {
    t.strictEqual(val, 5)
  })(val)

  accessor.create('a.b.length', function(val) {
    t.strictEqual(val, 3)
  })(val)

  accessor.create('(a.c - a.b) + "" -> length', function(val) {
    t.strictEqual(val, 2)
  })(val)
})
