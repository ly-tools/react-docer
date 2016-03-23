import parseComment from './parseComment';

export default node => {
  let comments = node.leadingComments || [];
  return parseComment(comments.length ? comments[comments.length - 1].value : '');
};
