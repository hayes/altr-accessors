module.exports = add_arrow

function add_arrow(types) {
  types.push(create_arrow)
}

function create_arrow(parts, change) {
  parts = this.split(parts, '->')

  if(parts.length < 2) {
    return
  }

  var right = this.createPart(parts[1], change)
    , left = this.createPart(parts[0], update)

  return left

  function update(val, ctx) {
    right(val, ctx)
  }
}
