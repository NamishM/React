import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Operations extends Component {
  render() {
    const {
        operation
      } = this.props;
    return (  
    <div className="operation-wrapper">  
        <button 
            type="button"
            className="operation"
            onClick={
            () => this.props.callbackFromParent(
                { 
                    operation: {operation}
                }
            )
            }>
            {operation}
        </button>
        </div>     
    );
  }
}

Operations.propTypes = {
    operation: PropTypes.String,
};

export default Operations;