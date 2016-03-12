'use strict';

const t = require('babel-types');
const getClosestComment = require('./util/getClosestComment');
const defineGetter = require('./util/defineGetter');

module.exports = {
  name: 'Class',
  check: t.isClassDeclaration,
  parse: (node, result) => {
    const getter = defineGetter(node);
    result.classes = result.classes || [];
    result.classes.push({
      name: getter('id.name'),
      description: getClosestComment(node),
      methods: (getter('body.body') || []).filter(t.isClassMethod).map(method => {
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
