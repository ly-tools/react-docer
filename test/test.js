import 'babel-polyfill';
import fs from 'fs';
import docer from '../lib/parse'
import path from 'path';

const content = `
const React = require('react');
import babel from 'babel';
/**
 * class description
 */
class Component extends React.Component {
  /**
   * constructor description
   */
  constructor() {
    super();
  }
  /**
   * render description
   */
  render() {
    return (
      <div></div>
    );
  }
}

Component.propTypes = {
  /**
   * Description of someProp.
   */
  someProp: React.PropTypes.string
};
Component.displayName = 'Component';
Component.defaultProps = {
  someProp: ''
};
`;

describe('react-docer', () => {
  it('should work', () => {
    docer(fs.readFileSync(path.join(__dirname, 'source.jsx'), 'utf-8')).should.be.eql(require(path.join(__dirname, 'result.json')));
  });
});
