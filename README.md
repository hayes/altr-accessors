# altr-accessors

generate lookup functions that call a callback each time the computed value changes.

```
var accessors = new require('altr-accrssors')

var update = accessors.create('a.b + 5', function(val) {
  console.log(val)
})

update({a: {b: 5}}) // logs 10
update({a: {b: 5}}) // callback is not called
update({a: {b: '5'}}) // logs 55
```
### Lookups:
By defaut accessor strings are treated as dot path lookups into the current contextt

`a.b.c` will look for an `a` key in the current context, then it will look up b in the value of that key.  and finally look up c in that result.  if at any point a value is not found undefined will be returned rather than throwing an error.

### Literals:
accessors may also contain litteral numbers and strings.

`5.5`
`"abc"`

### Operators
altr-accessors suport a most of javascripts operators out of the box (including parentheses, and follow javascripts order of operations.

##### Unary:
* `!`,  `+`,  `-`, `~`

##### Binary:
* `||`, `&&`, `|`, `^`, `&`, `===`, `!==`, `==`, `!=`, `>=`, `<=`, `>`, `<`, ` in `, ` instanceof `, `+`, `-`, `*`, `/`, `%`

##### Ternary:
* `a ? b : c`

##### Arrow:
the `->` operator will use the result of the left side as the context for the expression on the right.

`a.b -> c + d` is equivelent to `a.b.c + a.b.d`

### Filters
filters a simple way to transform the values you are accessing in an accessor.

###### to add a filter that doubles a value:
```
accessors.addFilter('double', function(args, change) {
  return function(args, ctx) {
    change(args[0] * 2)
  }
})

accessors.create('double(5)', console.log)() //logs 10
accessors.create('double(double(5))', console.log)() //logs 20
```

###### to add a filter that multiplies
```
accessors.addFilter('mult', function(args, change) {
  return function(args, ctx) {
    change(args[0] * args[1])
  }
})

accessors.create('mult(mult(4, 5), x)', console.log)({x: 3}) //logs 60
```

###### using the arrow and context
```
accessors.addFilter('mult', function(args, change) {
  return function(args, ctx) {
    change(ctx * args[0])
  }
})

accessors.create('x -> mult(5)', console.log)({x: 3}) //logs 15
```


### API
##### `alter-accessors([filters[, delay]])` -> instance
* filters: an abjenct mapping filter names to filter constructor functions
* delay: debouce delay, defaults to 0, pass false for syncronous changes

creates an accessors instance with its own set of filters.

##### `instance.create(str, change[, all])` -> update function
* str: the accessor string to look up
* change: a callback that gets called any time the state changes
* all: if true, change may be called multiple times as each part of the lookup is calculated.

creates a new lookup function. this function takes a state, and if the new state changes the output, calls the callback with the new state.

##### `instance.createPart(str, change)` -> update function
* str: the accessor string to look up
* change: a callback that gets called any time the state changes

the same as create, but does not debounce changes and will callback even if the resulting value did not change.

##### `instance.createParts(parts, change)` -> update function
* parts: an array of strings
* change: a callback that gets called with an array of values any time any part changes.

similar to createPart, but takes an array of parts, and calls back with an array of values.

##### `instance.addFilter(name, constructor)`
* name: name of the filter
* constructor: a filter constructor function.

Adds a filter for use in lookups created by this insance. constructor should implement the api below.

###### `filter_constructor(change)` -> update
* change: a callback to call anytime the filters result updates
* update: will be called with 2 arguments (args, context) any time the state changes. args is an array containing the current value of each argument to the filter, context is the current context that lookups are performed on.

when update is called, the filter should look at the passed in value and call change with the filters result and the original context. (passing context is not required but is recomended).

The filter constructor will be called with the altr-accessor instance as its context so instance methods such as createPart and split will be avaialbe on `this`

##### `instance.split(str, key, pairs, all)` -> Array of strings
* str: the original string to split
* key: the key to split on
* pairs: an array of arrays. inner arrays should contain 2 single character strings.  defaults to [['(', ')']]
* all: like the g flag in a regexp, if true will split all rather just on the first instance of key

Splits a string on a key, but does not split in the middle of matching pairs (parens by default).
