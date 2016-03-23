import {
  isIdentifier,
  isMemberExpression,
  isCallExpression,
  isFunctionExpression,
  isArrowFunctionExpression
} from 'babel-types';
import defineGetter from './defineGetter';
import getClosestComment from './getClosestComment';

function parseType(node) {
  const getter = defineGetter(node);
  let rst = {};
  if (isIdentifier(node)) {
    rst.name = getter('name');
  } else if (isMemberExpression(node)) {
    rst.name = getter('property.name');
  } else if (isCallExpression(node)) {
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
          const isRequired = isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
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
  } else if (isFunctionExpression(node) || isArrowFunctionExpression(node)) {
    rst.name = 'Custom Validator';
  }
  return rst;
}

module.exports = parseType;
