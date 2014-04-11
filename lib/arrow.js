module.exports = add_arrow

function add_arrow(types) {
  types.push(create_arrow)
}

function create_arrow(parts, change) {
  var remaining = parts
    , count = 0
    , split

  for(var i = 0, l = parts.length; i < l; ++i) {
    split = parts.slice(i).indexOf('->')

    parts[i] === '(' ?
      ++count : parts[i] === ')' ?
      --count : null

    if(count < 0 || split < 0) {
      return
    }

    if(count) {
      continue
    }

    if(!split) {
      break
    }
  }

  if(count) {
    return
  }

  var right = this.create_part(parts.slice(i + 2), change)
    , left = this.create_part(parts.slice(0, i), update)

  return left

  function update(val, ctx) {
    right(val, ctx)
  }
}
