var filter_regexp = /^\s*([^\s(]+)\((.*)\)\s*$/

module.exports = add_filter

function add_filter(types) {
  types.push(create_filter)
}

function create_filter(parts, change) {
  if(!(parts = parts.match(filter_regexp))) {
    return
  }

  var filter = this.filters[parts[1]]
    , context

  if(!filter) {
    throw new Error('could not find filter: ' + parts[1])
  }

  filter = filter.call(this, update)

  return this.createParts(this.split(parts[2], ',', null, null, true), run)

  function run(args, ctx) {
    context = ctx
    filter(args, ctx)
  }

  function update(val, ctx) {
    change(val, arguments.length > 1 ? ctx : context)
  }
}
