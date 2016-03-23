import {
  isClassDeclaration,
  isClassMethod
} from 'babel-types';
import getClosestComment from './util/getClosestComment';
import defineGetter from './util/defineGetter';

export default {
  name: 'Class',
  check: isClassDeclaration,
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes = result.classes || [];
    result.classes.push({
      name: getter('id.name'),
      description: getClosestComment(node),
      methods: (getter('body.body') || []).filter(isClassMethod).map(method => {
        const methodGetter = defineGetter(method);
        return {
          description: getClosestComment(method),
          name: methodGetter('key.name'),
          params: (methodGetter('params') || []).map(param => param.name)
        };
      })
    });
  }
};
