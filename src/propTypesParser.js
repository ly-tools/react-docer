import {
  isAssignmentExpression,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty
} from 'babel-types';
import defineGetter from './util/defineGetter';
import getClosestComment from './util/getClosestComment';
import parseType from './util/parseType';

export default {
  name: 'PropTypes',
  check: node => {
    const getter = defineGetter(node);
    return isAssignmentExpression(node) &&
      isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'propTypes' &&
      isObjectExpression(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes.find(cla => cla.name === getter('left.object.name')).propTypes = (getter('right.properties') || []).filter(prop => isObjectProperty(prop)).map(prop => {
      const propGetter = defineGetter(prop);
      const isRequired = isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
      return {
        name: propGetter('key.name'),
        required: isRequired,
        type: parseType(isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired' ? propGetter('value.object') : propGetter('value')),
        description: getClosestComment(prop)
      };
    });
  }
};
