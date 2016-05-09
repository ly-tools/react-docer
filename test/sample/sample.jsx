const React = require('react');
import babel from 'babel';
/**
 * class description
 */
class Component extends React.Component {
  /**
   * static prop description
   */
  static someProps = 'qwerty'
  /**
   * constructor description
   */
  constructor() {
    super();
  }
  /**
   * get value
   */
  getValue() {}
  /**
   * set value
   */
  setValue(value) {}
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
