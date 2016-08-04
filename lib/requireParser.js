'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _babelTypes = require('babel-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Require',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isCallExpression)(node) && getter('callee.name') === 'require' && getter('arguments.length');
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    result.dependencies = result.dependencies || [];
    var firstArg = getter('arguments[0]');
    if ((0, _babelTypes.isArrayExpression)(firstArg)) {
      firstArg.elements.forEach(function (ele) {
        return (0, _babelTypes.isStringLiteral)(ele) && result.dependencies.push(ele.value);
      });
    } else if ((0, _babelTypes.isStringLiteral)(firstArg)) {
      result.dependencies.push(getter('arguments[0].value'));
    }
  }
};
module.exports = exports['default'];