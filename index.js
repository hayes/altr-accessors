var add_operators = require('./lib/operators')
  , create_accesor = require('./lib/create')
  , add_filters = require('./lib/filter')
  , add_lookup = require('./lib/lookup')
  , add_parens = require('./lib/parens')
  , debounce = require('just-debounce')
  , add_types = require('./lib/types')
  , add_arrow = require('./lib/arrow')
  , split = require('./lib/split')
  , types = []

module.exports = accessors

// order is important
add_types(types)
add_arrow(types)
add_filters(types)
add_parens(types)
add_operators(types)
add_lookup(types)

accessors.prototype.create_part = create_accesor
accessors.prototype.add_filter = add_filter
accessors.prototype.create = create
accessors.prototype.types = types
accessors.prototype.split = split

function accessors(filters, delay) {
  if(!(this instanceof accessors)) {
    return new accessors(filters, delay)
  }

  if(!delay && delay !== false) {
    delay = 0
  }

  this.delay = delay
  this.filters = filters || {}
}

function add_filter(name, fn) {
  this.filters[name] = fn
}

function create(str, change, all) {
  var part = this.create_part(
      str
    , this.delay === false ? update : debounce(change, this.delay, false, true)
  )

  var sync = false
    , prev = {}
    , out

  return write

  function write(data) {
    var _out = {}

    sync = true
    out = _out
    part(data)
    sync = false

    if(out !== _out) {
      change.apply(null, out)
    }
  }

  function update(val, ctx) {
    if(!all && typeof val !== 'object' && val === prev) {
      return
    }

    out = [].slice.call(arguments)
    prev = val

    if(!sync) {
      change.apply(null, out)
    }
  }
}
