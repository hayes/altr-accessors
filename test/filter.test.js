var accessor = require('../index')()
  , test = require('tape')

accessor.addFilter('double', double)
accessor.addFilter('double_scope', double_scope)

function double(change) {
  return function(args, ctx) {
    change(2 * args[0], ctx)
  }
}

function double_scope(change) {
  return function(args, ctx) {
    change(2 * ctx, ctx)
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
