'use strict';

const parseComment = require('./parseComment');

module.exports = node => {
  let comments = node.leadingComments || [];
  return parseComment(comments.length ? comments[comments.length - 1].value : '');
};
