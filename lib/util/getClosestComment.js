'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseComment = require('./parseComment');

var _parseComment2 = _interopRequireDefault(_parseComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (node) {
  var comments = node.leadingComments || [];
  return (0, _parseComment2.default)(comments.length ? comments[comments.length - 1].value : '');
};

module.exports = exports['default'];