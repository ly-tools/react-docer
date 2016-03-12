'use strict';

const defineGetter = require('./util/defineGetter');
const t = require('babel-types');

module.exports = {
  name: 'DisplayName',
  check: node => {
    const getter = defineGetter(node);
    return t.isAssignmentExpression(node) &&
      t.isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'displayName' &&
      t.isStringLiteral(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes.find(cla => cla.name === getter('left.object.name')).displayName = getter('right.value');
  }
};
