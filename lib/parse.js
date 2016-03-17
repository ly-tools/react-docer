'use strict';

const babylon = require('babylon');
const _ = require('lodash');
const traverse = require('babel-traverse').default;
const logger = require('./util/logger');
const PLUGINS = [
  require('./requireParser'),
  require('./importParser'),
  require('./classParser'),
  require('./displayNameParser'),
  require('./propTypesParser'),
  require('./defaultPropsParser')
];

const DEFAULT_CONFIG = {
  plugins: []
};

module.exports = (content, config) => {
  config = _.defaults({}, config || {}, DEFAULT_CONFIG);
  const plugins = [].concat(PLUGINS, config.plugins);
  let result = {};
  traverse(babylon.parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  }), {
    enter(path) {
      const node = path.node;
      plugins.forEach(plugin => {
        try {
          plugin.check(node) && plugin.parse(node, result);
        } catch (e) {
          logger.error(`Error occur in plugin ${plugin.name}: ${e.message}`);
        }
      });
    }
  });
  return result;
};
