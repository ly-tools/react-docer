'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function (node) {
  return (0, _lodash.curry)(_lodash.get, 2)(node);
};

module.exports = exports['default'];