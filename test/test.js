'use strict';

const fs = require('fs');
const docer = require('../lib/parse');
const path = require('path');

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

console.log(JSON.stringify(docer(content), null, 2));

describe('react-docer', () => {
  it('should work', () => {
    docer(fs.readFileSync(path.join(__dirname, 'source.jsx'), 'utf-8')).should.be.eql(require(path.join(__dirname, 'result.json')));
  });
});
