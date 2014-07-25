module.exports = create_list

function create_list(parts, change, all) {
  var updating = false
    , changed = false
    , accessors = []
    , state = []

  if(!parts.length) {
    return function(val, ctx) {
      change([], ctx)
    }
  }

  for(var i = 0, l = parts.length; i < l; ++i) {
    accessors.push(this.createPart(parts[i], update.bind(this, i)))
  }

  return function(val, ctx) {
    ctx = arguments.length > 1 ? ctx : val
    changed = false
    updating = true
    get_parts(val, ctx)
    updating = false

    if(!all && changed) {
      change(state, ctx)
    }
  }

  function update(index, val, ctx) {
    state[index] = val
    changed = true

    if(all || !updating) {
      change(state, ctx)
    }
  }

  function get_parts(val, ctx) {
    for(var i = 0, l = accessors.length; i < l; ++i) {
      accessors[i](val, ctx)
    }
  }
}
