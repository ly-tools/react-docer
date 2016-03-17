'use strict';
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
   * [private]
   * Description of multilineProp.
   */
  privateProp: React.PropTypes.string,
  /**
   * Description of multilineProp.
   * This should be multiline
   * Anything else ?
   */
  multilineProp: React.PropTypes.string,
  /**
   * Description of optionalArray.
   */
  optionalArray: React.PropTypes.array,
  /**
   * Description of optionalBool.
   */
  optionalBool: React.PropTypes.bool,
  /**
   * Description of optionalFunc.
   */
  optionalFunc: React.PropTypes.func,
  /**
   * Description of optionalNumber.
   */
  optionalNumber: React.PropTypes.number,
  /**
   * Description of optionalObject.
   */
  optionalObject: React.PropTypes.object,
  /**
   * Description of optionalString.
   */
  optionalString: React.PropTypes.string,
  /**
   * Description of optionalNode.
   */
  optionalNode: React.PropTypes.node,
  /**
   * Description of optionalElement.
   */
  optionalElement: React.PropTypes.element,
  /**
   * Description of optionalMessage.
   */
  optionalMessage: React.PropTypes.instanceOf(Message).isRequired,
  /**
   * Description of optionalEnum.
   */
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
  /**
   * Description of optionalUnion.
   */
  optionalUnion: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.instanceOf(Message)]),
  /**
   * Description of optionalArrayOf.
   */
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
  /**
   * Description of optionalObjectOf.
   */
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
  /**
   * Description of optionalObjectWithShape.
   */
  optionalObjectWithShape: React.PropTypes.shape({
    /**
     * Description of shape.color
     */
    color: React.PropTypes.string.isRequired,
    /**
     * Description of shape.fontSize
     */
    fontSize: React.PropTypes.number
  }),
  /**
   * Description of requiredFunc.
   */
  requiredFunc: React.PropTypes.func.isRequired,
  /**
   * Description of requiredAny.
   */
  requiredAny: React.PropTypes.any.isRequired,
  /**
   * Description of customProp.
   */
  customProp: function(props, propName, componentName) {},
  /**
   * Description of noDefaultValueProp.
   */
  noDefaultValueProp: React.PropTypes.string
};
Component.displayName = 'Component';
Component.defaultProps = {
  optionalArray: [],
  optionalBool: false,
  optionalFunc: () => {},
  optionalNumber: 123,
  optionalObject: {},
  optionalString: 'abc',
  optionalNode: null,
  optionalElement: null,
  optionalMessage: null,
  optionalEnum: 'News',
  optionalUnion: null,
  optionalArrayOf: [
    1, 2, 3
  ],
  optionalObjectOf: {},
  optionalObjectWithShape: {
    color: 'red',
    fontSize: 14
  },
  requiredFunc: () => {},
  requiredAny: false,
  customProp: null,
  notDefinedProp: null
};
module.exports = Component;
