'use strict';

var _defineGetter = require('./util/defineGetter');

var _defineGetter2 = _interopRequireDefault(_defineGetter);

var _babelTypes = require('babel-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: 'Import',
  check: _babelTypes.isImportDeclaration,
  parse: function parse(node, result) {
    var getter = (0, _defineGetter2.default)(node);
    result.dependencies = result.dependencies || [];
    result.dependencies.push(getter('source.value'));
  }
};