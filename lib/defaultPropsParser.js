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

function getDefaultProps(node, cla) {
  var getter = (0, _defineGetter2.default)(node);
  cla.propTypes = cla.propTypes || [];
  (getter('properties') || []).filter(function (prop) {
    return (0, _babelTypes.isObjectProperty)(prop);
  }).forEach(function (prop) {
    var propGetter = (0, _defineGetter2.default)(prop);
    var code = (0, _babelGenerator2.default)(propGetter('value')).code;
    var name = propGetter('key.name');
    var proptype = cla.propTypes.find(function (p) {
      return p.name === name;
    });
    if (!proptype) cla.propTypes.push({
      name: name,
      defaultValue: code
    });else proptype.defaultValue = code;
  });
}

exports.default = {
  name: 'DefaultProps',
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
    getDefaultProps(getter('right'), cla);
  },
  after: function after(result) {
    (result.classes || []).map(function (cla) {
      var defaultPropsProperty = (cla.properties || []).find(function (property) {
        return property.name === 'defaultProps';
      });
      if (!defaultPropsProperty) return;
      getDefaultProps(defaultPropsProperty.value, cla);
    });
  }
};
module.exports = exports['default'];