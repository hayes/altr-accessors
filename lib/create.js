module.exports = accessor

function accessor(key, change) {
  var part = build_part.call(this, key, finish.bind(this))
    , context

  return call

  function call(val, ctx) {
    part(val, context = ctx || val)
  }

  function finish(val, ctx) {
    change.call(this, val, typeof ctx === 'undefined' ? context : ctx)
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
