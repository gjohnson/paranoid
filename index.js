
/**
 * Dependencies.
 */

var vm = require('vm');
var clone = require('clone');

/**
 * Export `paranoid`
 */

module.exports = paranoid;

/**
 * Paranoid.
 *
 * @param {Function} fn
 * @param {Object} [sandbox]
 * @return {Function}
 */

function paranoid(fn, sandbox){
  sandbox = sandbox || {};
  var code = fn.toString();
  var name = /\W*function\s+([\w\$]+)\(/.exec(code)[1];
  return function(){
    var args = JSON.stringify([].slice.call(arguments));
    var call = '__return__ = ' + name + '.apply(null, ' + args + ')';
    var script = code + '\n\n' + call;
    var context = clone(sandbox);
    context.__return__ = undefined;
    vm.runInNewContext(script, context);
    return context.__return__;
  };
}