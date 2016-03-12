'use strict';

const defineGetter = require('./util/defineGetter');
const t = require('babel-types');

module.exports = {
  name: 'Import',
  check: t.isImportDeclaration,
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.dependencies = result.dependencies || [];
    result.dependencies.push(getter('source.value'));
  }
};
