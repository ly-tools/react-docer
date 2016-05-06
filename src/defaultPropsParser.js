import {
  isAssignmentExpression,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty
} from 'babel-types';
import generator from 'babel-generator';
import defineGetter from './util/defineGetter';

export default {
  name: 'DefaultPropes',
  check: node => {
    const getter = defineGetter(node);
    return isAssignmentExpression(node) &&
      isMemberExpression(getter('left')) &&
      getter('left.property.name') === 'defaultProps' &&
      isObjectExpression(getter('right'));
  },
  parse: (node, result) => {
    const getter = defineGetter(node);
    let cla = (result.classes || []).find(c => c.name === getter('left.object.name'));
    if (!cla) return;
    (getter('right.properties') || []).filter(prop => isObjectProperty(prop)).forEach(prop => {
      const propGetter = defineGetter(prop);
      let proptype = (cla.propTypes || []).find(p => p.name === propGetter('key.name'));
      proptype && (proptype.defaultValue = generator(propGetter('value')).code);
    });
  }
};
