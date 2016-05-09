'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _babelTypes = require('babel-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(node, cla) {
  var getter = (0, _defineGetter2.default)(node);
  cla.displayName = getter('value');
}

exports.default = {
  name: 'DisplayName',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isAssignmentExpression)(node) && (0, _babelTypes.isMemberExpression)(getter('left')) && getter('left.property.name') === 'displayName' && (0, _babelTypes.isStringLiteral)(getter('right'));
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    var cla = (result.classes || []).find(function (c) {
      return c.name === getter('left.object.name');
    });
    if (!cla) return;
    getDisplayName(getter('right'), cla);
  },
  after: function after(result) {
    (result.classes || []).map(function (cla) {
      var displayNameProperty = (cla.properties || []).find(function (property) {
        return property.name === 'displayName';
      });
      if (!displayNameProperty) return;
      getDisplayName(displayNameProperty.value, cla);
    });
  }
};
module.exports = exports['default'];