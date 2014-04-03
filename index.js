var add_operators = require('./lib/operators')
  , create_accesor = require('./lib/create')
  , add_lookup = require('./lib/lookup')
  , add_filter = require('./lib/filter')
  , add_types = require('./lib/types')
  , debounce = require('debounce')
  , types = []

module.exports = accessors

// order is important
add_operators(types)
add_filter(types)
add_types(types)
add_lookup(types)

accessors.prototype._create = create_accesor
accessors.prototype.add_filter = add_filter
accessors.prototype.create = create
accessors.prototype.types = types

function accessors(filters, debounce) {
  if(!(this instanceof accessors)) {
    return new accessors(filters, debounce)
  }

  if(!debounce && debounce !== false) {
    debounce = 0
  }

  this.debounce = debounce
  this.filters = filters || {}
}

function add_filter(name, fn) {
  this.filters[name] = fn
}

function create(str, change) {
  return this._create(
      str
    , this.debounce === false ? change : debounce(change, this.debounce)
  )
}
