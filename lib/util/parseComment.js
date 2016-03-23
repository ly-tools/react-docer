'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (str) {
  return str.replace(/\*\s+/g, '').split('\n').map(function (v) {
    return v.trim();
  }).join('\n').trim();
};

module.exports = exports['default'];