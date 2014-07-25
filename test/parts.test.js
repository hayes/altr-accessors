var accessor = require('../index')()
  , test = require('tape')

test('parts', function(t) {
  t.plan(4)

  var state = {a: 5, b: 10, c: 15}

  accessor.createPart('a + 5', function(val, ctx) {
    t.equal(val, 10)
    t.equal(ctx, state)
  })(state)

  accessor.createParts(['a', 'b', 'c'], function(args, ctx) {
    t.equal(ctx, state)
    t.deepEqual(args, [5, 10, 15])
  })(state)
})
