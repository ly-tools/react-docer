import defineGetter from './util/defineGetter';
import {
  isAssignmentExpression,
  isMemberExpression,
  isStringLiteral
} from 'babel-types';

export default {
  name: 'DisplayName',
  check: node => {
    const getter = defineGetter(node);
    return isAssignmentExpression(node) &&
      isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'displayName' &&
      isStringLiteral(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    (result.classes || []).find(cla => cla.name === getter('left.object.name')).displayName = getter('right.value');
  }
};
