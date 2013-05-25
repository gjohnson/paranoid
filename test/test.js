
var assert = require('better-assert');
var paranoid = require('..');

// noob version
function add(a, b){
  ILOVEGLOBALS = true;
  return a + b;
}

// safe version
var fn = paranoid(add);
var sum = fn(2, 2);

// got result?
assert(sum === 4);

// no side effects?
assert(global.ILOVEGLOBALS === undefined);