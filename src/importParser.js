import defineGetter from './util/defineGetter';
import {
  isImportDeclaration
} from 'babel-types';

module.exports = {
  name: 'Import',
  check: isImportDeclaration,
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.dependencies = result.dependencies || [];
    result.dependencies.push(getter('source.value'));
  }
};
