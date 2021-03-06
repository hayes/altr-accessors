module.exports = add_lookup

function add_lookup(types) {
  types.push(create_lookup)
}

function create_lookup(path, change) {
  if(!path.indexOf('$data')) {
    path = path.slice('$data.'.length)

    if(!path) {
      return change
    }
  }

  return lookup(path.match(/\s*(.*[^\s])\s*/)[1], change)
}

function lookup(path, done) {
  var parts = path ? path.split('.') : []

  return function(obj, ctx) {
    var result = search(obj, parts)

    if(typeof result === 'undefined' && ctx) {
      result = search(ctx, parts)
    }

    done(result, ctx)
  }
}

function search(obj, parts) {
  for(var i = 0, l = parts.length; obj && i < l; ++i) {
    obj = obj[parts[i]]
  }

  if(i === l) {
    return obj
  }
}
