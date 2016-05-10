import {
  isAssignmentExpression,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty
} from 'babel-types';
import defineGetter from './util/defineGetter';
import getClosestComment from './util/getClosestComment';
import parseType from './util/parseType';
import {
  assign
} from 'lodash';

function getPropTypes(node, cla) {
  const getter = defineGetter(node);
  cla.propTypes = cla.propTypes || [];
  (getter('properties') || []).filter(prop => isObjectProperty(prop)).forEach(prop => {
    const propGetter = defineGetter(prop);
    const name = propGetter('key.name');
    const required = isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired';
    const type = parseType(isMemberExpression(propGetter('value')) && propGetter('value.property.name') === 'isRequired' ? propGetter('value.object') : propGetter('value'));
    const description = getClosestComment(prop);
    let proptype = cla.propTypes.find(p => p.name === name);
    if (!proptype)
      cla.propTypes.push({
        name,
        required,
        type,
        description
      });
    else
      assign(proptype, {
        name,
        required,
        type,
        description
      });
  });
}

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
    const cla = (result.classes || []).find(c => c.name === getter('left.object.name'));
    if (!cla) return;
    getPropTypes(getter('right'), cla);
  },
  after: result => {
    (result.classes || []).map(cla => {
      const propTypesProperty = (cla.properties || []).find(property => property.name === 'propTypes');
      if (!propTypesProperty) return;
      getPropTypes(propTypesProperty.value, cla);
    });
  }
};
