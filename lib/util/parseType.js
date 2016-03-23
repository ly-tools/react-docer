'use strict';

var _babelTypes = require('babel-types');

var _defineGetter = require('./defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _getClosestComment = require('./getClosestComment');

var _getClosestComment2 = _interopRequireDefault(_getClosestComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseType(node) {
  var getter = (0, _defineGetter2.default)(node);
  var rst = {};
  if ((0, _babelTypes.isIdentifier)(node)) {
    rst.name = getter('name');
  } else if ((0, _babelTypes.isMemberExpression)(node)) {
    rst.name = getter('property.name');
  } else if ((0, _babelTypes.isCallExpression)(node)) {
    rst.name = getter('callee.property.name');
    switch (rst.name) {
      case 'instanceOf':
      case 'arrayOf':
      case 'objectOf':
        rst.value = parseType(getter('arguments[0]'));
        break;
      case 'oneOf':
        rst.value = (getter('arguments[0].elements') || []).map(function (v) {
          return v.value;
        });
        break;
      case 'oneOfType':
        rst.value = (getter('arguments[0].elements') || []).map(parseType);
        break;
      case 'shape':
        rst.value = (getter('arguments[0].properties') || []).map(function (prop) {
          var propGetter = (0, _defineGetter2.default)(prop);
          var isRequired = (0, _babelTypes.isMemberExpression)(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
          return {
            name: propGetter('key.name'),
            required: isRequired,
            type: parseType(isRequired ? propGetter('value.object') : propGetter('value')),
            description: (0, _getClosestComment2.default)(prop)
          };
        });
        break;
      default:
        break;
    }
  } else if ((0, _babelTypes.isFunctionExpression)(node) || (0, _babelTypes.isArrowFunctionExpression)(node)) {
    rst.name = 'Custom Validator';
  }
  return rst;
}

module.exports = parseType;