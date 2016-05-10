'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _getClosestComment = require('./util/getClosestComment');

var _getClosestComment2 = _interopRequireDefault(_getClosestComment);

var _parseType = require('./util/parseType');

var _parseType2 = _interopRequireDefault(_parseType);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPropTypes(node, cla) {
  var getter = (0, _defineGetter2.default)(node);
  cla.propTypes = cla.propTypes || [];
  (getter('properties') || []).filter(function (prop) {
    return (0, _babelTypes.isObjectProperty)(prop);
  }).forEach(function (prop) {
    var propGetter = (0, _defineGetter2.default)(prop);
    var name = propGetter('key.name');
    var required = (0, _babelTypes.isMemberExpression)(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
    var type = (0, _parseType2.default)((0, _babelTypes.isMemberExpression)(propGetter('value')) && propGetter('value.property.name') === 'isRequired' ? propGetter('value.object') : propGetter('value'));
    var description = (0, _getClosestComment2.default)(prop);
    var proptype = cla.propTypes.find(function (p) {
      return p.name === name;
    });
    if (!proptype) cla.propTypes.push({
      name: name,
      required: required,
      type: type,
      description: description
    });else (0, _lodash.assign)(proptype, {
      name: name,
      required: required,
      type: type,
      description: description
    });
  });
}

exports.default = {
  name: 'PropTypes',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isAssignmentExpression)(node) && (0, _babelTypes.isMemberExpression)(getter('left')) && getter('left.property.name') === 'propTypes' && (0, _babelTypes.isObjectExpression)(getter('right'));
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    var cla = (result.classes || []).find(function (c) {
      return c.name === getter('left.object.name');
    });
    if (!cla) return;
    getPropTypes(getter('right'), cla);
  },
  after: function after(result) {
    (result.classes || []).map(function (cla) {
      var propTypesProperty = (cla.properties || []).find(function (property) {
        return property.name === 'propTypes';
      });
      if (!propTypesProperty) return;
      getPropTypes(propTypesProperty.value, cla);
    });
  }
};
module.exports = exports['default'];