import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Numbers extends Component {
  constructor(props) {
    super(props);
  }  
  render() {
      
    const {
        digit,
        callbackFromParent
      } = this.props;
    return (  
    <div className="digits-wrapper">  
        <button 
            type="button"
            className="digits"
            onClick={
            () => {
                alert('asdas');
                callbackFromParent(
                    { 
                    digit: {digit}
                    }
                );
            }
            }>
            {digit}
        </button>
        </div>     
    );
  }
}

Numbers.propTypes = {
  digit: PropTypes.numbers,
  callbackFromParent: PropTypes.func,
};

export default Numbers;