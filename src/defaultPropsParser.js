import {
  isAssignmentExpression,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty
} from 'babel-types';
import generator from 'babel-generator';
import defineGetter from './util/defineGetter';

function getDefaultProps(node, cla) {
  const getter = defineGetter(node);
  cla.propTypes = cla.propTypes || [];
  (getter('properties') || []).filter(prop => isObjectProperty(prop)).forEach(prop => {
    const propGetter = defineGetter(prop);
    const code = generator(propGetter('value')).code;
    const name = propGetter('key.name');
    let proptype = cla.propTypes.find(p => p.name === name);
    if (!proptype)
      cla.propTypes.push({
        name: name,
        defaultValue: code
      });
    else
      proptype.defaultValue = code;
  });
}

export default {
  name: 'DefaultProps',
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
    getDefaultProps(getter('right'), cla);
  },
  after: result => {
    (result.classes || []).map(cla => {
      const defaultPropsProperty = (cla.properties || []).find(property => property.name === 'defaultProps');
      if (!defaultPropsProperty) return;
      getDefaultProps(defaultPropsProperty.value, cla);
    });
  }
};
