'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _babylon = require('babylon');

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _logger = require('./util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGINS = [require('./requireParser'), require('./importParser'), require('./classParser'), require('./displayNameParser'), require('./propTypesParser'), require('./defaultPropsParser')];

var DEFAULT_CONFIG = {
  plugins: []
};

exports.default = function (content, config) {
  config = (0, _extends3.default)({}, DEFAULT_CONFIG, config);
  var plugins = [].concat(PLUGINS, config.plugins);
  var result = {};
  (0, _babelTraverse2.default)((0, _babylon.parse)(content, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  }), {
    enter: function enter(path) {
      var node = path.node;
      plugins.forEach(function (plugin) {
        try {
          plugin.check(node) && plugin.parse(node, result);
        } catch (e) {
          _logger2.default.error('Error occur in plugin ' + plugin.name + ': ' + e.message);
        }
      });
    }
  });
  return result;
};

module.exports = exports['default'];