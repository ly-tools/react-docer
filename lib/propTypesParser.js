'use strict';

const t = require('babel-types');
const defineGetter = require('./util/defineGetter');
const getClosestComment = require('./util/getClosestComment');
const parseType = require('./util/parseType');

module.exports = {
  name: 'PropTypes',
  check: node => {
    const getter = defineGetter(node);
    return t.isAssignmentExpression(node) &&
      t.isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'propTypes' &&
      t.isObjectExpression(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes.find(cla => cla.name === getter('left.object.name')).propTypes = (getter('right.properties') || []).filter(prop => t.isObjectProperty(prop)).map(prop => {
      const propGetter = defineGetter(prop);
      const isRequired = t.isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
      return {
        name: propGetter('key.name'),
        required: isRequired,
        type: parseType(t.isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired' ? propGetter('value.object') : propGetter('value')),
        description: getClosestComment(prop)
      };
    });
  }
};
