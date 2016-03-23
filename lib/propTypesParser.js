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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'PropTypes',
  check: function check(node) {
    var getter = (0, _defineGetter2.default)(node);
    return (0, _babelTypes.isAssignmentExpression)(node) && (0, _babelTypes.isMemberExpression)(getter('left')) && getter('left.property.name') === 'propTypes' && (0, _babelTypes.isObjectExpression)(getter('right'));
  },
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    result.classes.find(function (cla) {
      return cla.name === getter('left.object.name');
    }).propTypes = (getter('right.properties') || []).filter(function (prop) {
      return (0, _babelTypes.isObjectProperty)(prop);
    }).map(function (prop) {
      var propGetter = (0, _defineGetter2.default)(prop);
      var isRequired = (0, _babelTypes.isMemberExpression)(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
      return {
        name: propGetter('key.name'),
        required: isRequired,
        type: (0, _parseType2.default)((0, _babelTypes.isMemberExpression)(propGetter('value')) && propGetter('value.property.name') === 'isRequired' ? propGetter('value.object') : propGetter('value')),
        description: (0, _getClosestComment2.default)(prop)
      };
    });
  }
};
module.exports = exports['default'];