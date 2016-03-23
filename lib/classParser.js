'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var _getClosestComment = require('./util/getClosestComment');

var _getClosestComment2 = _interopRequireDefault(_getClosestComment);

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Class',
  check: _babelTypes.isClassDeclaration,
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    result.classes = result.classes || [];
    result.classes.push({
      name: getter('id.name'),
      description: (0, _getClosestComment2.default)(node),
      methods: (getter('body.body') || []).filter(_babelTypes.isClassMethod).map(function (method) {
        var methodGetter = (0, _defineGetter2.default)(method);
        return {
          description: (0, _getClosestComment2.default)(method),
          name: methodGetter('key.name'),
          params: (methodGetter('params') || []).map(function (param) {
            return param.name;
          })
        };
      })
    });
  }
};
module.exports = exports['default'];