'use strict';

const defineGetter = require('./util/defineGetter');
const t = require('babel-types');

module.exports = {
  name: 'Require',
  check: node => {
    const getter = defineGetter(node);
    return t.isCallExpression(node) && getter('callee.name') === 'require' && getter('arguments.length');
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.dependencies = result.dependencies || [];
    result.dependencies.push(getter('arguments[0].value'));
  }
};
