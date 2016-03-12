'use strict';

const t = require('babel-types');
const defineGetter = require('./defineGetter');
const getClosestComment = require('./getClosestComment');

function parseType(node) {
  const getter = defineGetter(node);
  let rst = {};
  if (t.isIdentifier(node)) {
    rst.name = getter('name');
  } else if (t.isMemberExpression(node)) {
    rst.name = getter('property.name');
  } else if (t.isCallExpression(node)) {
    rst.name = getter('callee.property.name');
    switch (rst.name) {
      case 'instanceOf':
      case 'arrayOf':
      case 'objectOf':
        rst.value = parseType(getter('arguments[0]'));
        break;
      case 'oneOf':
        rst.value = (getter('arguments[0].elements') || []).map(v => v.value);
        break;
      case 'oneOfType':
        rst.value = (getter('arguments[0].elements') || []).map(parseType);
        break;
      case 'shape':
        rst.value = (getter('arguments[0].properties') || []).map(prop => {
          const propGetter = defineGetter(prop);
          const isRequired = t.isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
          return {
            name: propGetter('key.name'),
            required: isRequired,
            type: parseType(isRequired ? propGetter('value.object') : propGetter('value')),
            description: getClosestComment(prop)
          };
        });
        break;
      default:
        break;
    }
  } else if (t.isFunctionExpression(node) || t.isArrowFunctionExpression(node)) {
    rst.name = 'Custom Validator';
  }
  return rst;
}

module.exports = parseType;
