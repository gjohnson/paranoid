
# paranoid

Just me exploring ways to run functions "safely" in node.

### Example

Given the function `add` which some noob on the team mistakenly leaked a global
variable, when we run the function through `paranoid` it will be "safely" executed
within its own context so the global leaked does not effect anything.

```js
var assert = require('better-assert');
var paranoid = require('paranoid')

// noob version
function add(a, b){
  ILOVEGLOBALS = true; // << leakity leak
  return a + b;
}

// safer version
var fn = paranoid(add);
var sum = fn(2, 2);

// got result? yep.
assert(sum === 4);

// no side effects? win.
assert(global.ILOVEGLOBALS === undefined);
```