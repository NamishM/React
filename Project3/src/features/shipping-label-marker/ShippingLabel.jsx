import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ShippingLabel extends Component {
  render() {
      const {
        state
      } = this.props;
    return (
      <div className="infoPanel">
        <h3>Congratulations! Your order has been placed.</h3>  
        <div className="infoBlock payment">
           You have paid <span>${state.totalAmount.toFixed(2)}</span><br/>
        </div>
        
      </div>
    );
  }
}

ShippingLabel.propTypes = {
  state: PropTypes.object.isRequired,
};

export default ShippingLabel;