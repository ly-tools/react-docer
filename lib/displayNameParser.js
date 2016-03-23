'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _babelTypes = require('babel-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'DisplayName',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isAssignmentExpression)(node) && (0, _babelTypes.isMemberExpression)(getter('left')) && getter('left.property.name') === 'displayName' && (0, _babelTypes.isStringLiteral)(getter('right'));
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    result.classes.find(function (cla) {
      return cla.name === getter('left.object.name');
    }).displayName = getter('right.value');
  }
};
module.exports = exports['default'];