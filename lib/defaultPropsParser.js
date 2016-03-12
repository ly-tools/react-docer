'use strict';

const t = require('babel-types');
const generator = require('babel-generator').default;
const defineGetter = require('./util/defineGetter');

module.exports = {
  name: 'DefaultPropes',
  check: node => {
    const getter = defineGetter(node);
    return t.isAssignmentExpression(node) &&
      t.isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'defaultProps' &&
      t.isObjectExpression(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    let cla = result.classes.find(c => c.name === getter('left.object.name'));
    if (!cla) return;
    (getter('right.properties') || []).filter(prop => t.isObjectProperty(prop)).forEach(prop => {
      const propGetter = defineGetter(prop);
      let proptype = cla.propTypes.find(p => p.name === propGetter('key.name'));
      proptype && (proptype.defaultValue = generator(propGetter('value')).code);
    });
  }
};
