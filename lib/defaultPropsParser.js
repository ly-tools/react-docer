'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'DefaultPropes',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isAssignmentExpression)(node) && (0, _babelTypes.isMemberExpression)(getter('left')) && getter('left.property.name') === 'defaultProps' && (0, _babelTypes.isObjectExpression)(getter('right'));
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    var cla = (result.classes || []).find(function (c) {
      return c.name === getter('left.object.name');
    });
    if (!cla) return;
    (getter('right.properties') || []).filter(function (prop) {
      return (0, _babelTypes.isObjectProperty)(prop);
    }).forEach(function (prop) {
      var propGetter = (0, _defineGetter2.default)(prop);
      var proptype = (cla.propTypes || []).find(function (p) {
        return p.name === propGetter('key.name');
      });
      proptype && (proptype.defaultValue = (0, _babelGenerator2.default)(propGetter('value')).code);
    });
  }
};
module.exports = exports['default'];