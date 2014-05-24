module.exports = accessor

function accessor(key, change) {
  var part = build_part.call(this, key, finish)
    , prev = {} // nothing will match this
    , context

  return call.bind(this)

  function call(val, ctx) {
    part(val, context = ctx || val)
  }

  function finish(val) {
    if(typeof val !== 'object' && val === prev) {
      return
    }

    prev = val
    change.call(this, val, context)
  }
}

function build_part(part, change) {
  var accessor

  for(var i = 0, l = this.types.length; i < l; ++i) {
    if(accessor = this.types[i].call(this, part, change)) {
      return accessor
    }
  }
}
