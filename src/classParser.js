import {
  isClassDeclaration,
  isClassMethod,
  isClassProperty
} from 'babel-types';
import getClosestComment from './util/getClosestComment';
import defineGetter from './util/defineGetter';
import generator from 'babel-generator';

export default {
  name: 'Class',
  check: isClassDeclaration,
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes = result.classes || [];
    result.classes.push({
      name: getter('id.name'),
      superClass: generator(getter('superClass')).code,
      description: getClosestComment(node),
      methods: (getter('body.body') || []).filter(isClassMethod).map(method => {
        const methodGetter = defineGetter(method);
        return {
          description: getClosestComment(method),
          name: methodGetter('key.name'),
          params: (methodGetter('params') || []).map(param => param.name)
        };
      }),
      properties: (getter('body.body') || []).filter(isClassProperty).map(property => {
        const propertyGetter = defineGetter(property);
        return {
          description: getClosestComment(property),
          name: propertyGetter('key.name'),
          value: propertyGetter('value'),
          'static': !!propertyGetter('static')
        };
      })
    });
  },
  after: result => {
    result.classes.forEach(cla => cla.properties.forEach(property => {
      property.value = generator(property.value).code;
    }));
  }
};
