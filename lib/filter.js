var filter_regexp = /^\s*([^\s(]+)\((.*)\)\s*$/

module.exports = add_filter

function add_filter(types) {
  types.push(create_filter)
}

function create_filter(parts, change) {
  if(!(parts = parts.match(filter_regexp))) {
    return
  }

  var count = 0

  for(var i = 0, l = parts[2].length; i < l; ++i) {
    parts[2][i] === '(' ?
      ++count : parts[2][i] === ')' ?
      --count : null

    if(count < 0) {
      break
    }
  }

  if(count) {
    return
  }

  var filter = this.filters[parts[1]]

  if(!filter) {
    throw new Error('could not find filter: ' + parts[1])
  }

  return filter.call(this, parts[2], change)
}
