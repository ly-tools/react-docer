import defineGetter from './util/defineGetter';
import {
  isAssignmentExpression,
  isMemberExpression,
  isStringLiteral
} from 'babel-types';

function getDisplayName(node, cla) {
  const getter = defineGetter(node);
  cla.displayName = getter('value');
}

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
    let cla = (result.classes || []).find(c => c.name === getter('left.object.name'));
    if (!cla) return;
    getDisplayName(getter('right'), cla);
  },
  after: result => {
    (result.classes || []).map(cla => {
      const displayNameProperty = (cla.properties || []).find(property => property.name === 'displayName');
      if (!displayNameProperty) return;
      getDisplayName(displayNameProperty.value, cla);
    });
  }
};
