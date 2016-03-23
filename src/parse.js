import {
  parse
} from 'babylon';
import traverse from 'babel-traverse';
import logger from './util/logger';
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

export default (content, config) => {
  config = {
    ...DEFAULT_CONFIG,
    ...config
  };
  const plugins = [].concat(PLUGINS, config.plugins);
  let result = {};
  traverse(parse(content, {
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