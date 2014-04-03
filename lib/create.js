module.exports = accessor

function accessor(key, change) {
  var parts = key.split('->')
    , context
    , next
    , prev

  for(var i = 0, l = parts.length; i < l; ++i) {
    parts[i] = build_part.call(this, parts[i], call_next.bind(this, i + 1))
  }

  return call_next.bind(this, 0)

  function call_next(i, val, ctx) {
    if(!i) {
      context = ctx || val
    }

    if(i === parts.length) {
      return change.call(this, val, context)
    }

    parts[i](val, context)
  }

  function finish(val, context) {
    if(val === prev) {
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
