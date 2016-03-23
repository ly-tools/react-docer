import defineGetter from './util/defineGetter';
import {
  isCallExpression
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
    result.dependencies.push(getter('arguments[0].value'));
  }
};
