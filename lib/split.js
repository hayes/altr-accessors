module.exports = split

function split(parts, key, open, close, all) {
  var count = 0
    , split_point

  for(var i = 0, l = parts.length; i < l; ++i) {
    parts[i] === (open || '(') ?
      ++count : parts[i] === (close || ')') ?
      --count : null

    if(count < 0) {
      throw new Error('Unmatched "' + open + '"" in ' + parts)
    } else if(count) {
      continue
    } else if((split_point = parts.slice(i).indexOf(key)) === -1) {
      return [parts]
    } else if(!split_point) {
      break
    }
  }

  if(count) {
    return [parts]
  }

  var right = parts.slice(i + key.length)
    , left = parts.slice(0, i)

  if(!all) {
    return [left, right]
  }

  return [left].concat(split(right, key, open, close, all))
}
