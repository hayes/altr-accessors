module.exports = add_arrow

function add_arrow(types) {
  types.push(create_arrow)
}

function create_arrow(parts, change) {
  parts = parts.split('->')

  if(parts.length < 2) {
    return
  }

  var right = this.create_part(parts.slice(1).join(''), change)
    , left = this.create_part(parts[0], update)

  return left

  function update(val, ctx) {
    right(val, ctx)
  }
}
