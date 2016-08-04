import defineGetter from './util/defineGetter';
import {
  isCallExpression,
  isArrayExpression,
  isStringLiteral
} from 'babel-types';

export default {
  name: 'Require',
  check: node => {
    const getter = defineGetter(node);
    return isCallExpression(node) && getter('callee.name') === 'require' && getter('arguments.length');
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.dependencies = result.dependencies || [];
    const firstArg = getter('arguments[0]');
    if (isArrayExpression(firstArg)) {
      firstArg.elements.forEach(ele => isStringLiteral(ele) && result.dependencies.push(ele.value));
    } else if (isStringLiteral(firstArg)) {
      result.dependencies.push(getter('arguments[0].value'));
    }
  }
};
