import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShippingOption } from '../../helper/helper';

class Confirm extends Component {
  render() {
      const {
        state
      } = this.props;
      const shippingRate = 0.40;
      const weight = state.wizardContext.weight;
      let shippingOption = state.wizardContext.shippingOption;
      shippingOption = shippingOption === 'ground' ? 1 : 2;
      const shippingCost = weight * shippingRate * (shippingOption === ShippingOption.ground ? 1 : 1.5);
    return (
      <div className="infoPanel">
        <h3>Please verify your details</h3>  
        <div className="infoBlock">
            <strong>From:</strong><br />
            {state.wizardContext.from.name}<br />
            {state.wizardContext.from.street}<br />
            {state.wizardContext.from.city}<br/>
            {state.wizardContext.from.state}<br />
            {state.wizardContext.from.zip}
        </div>
        <div className="infoBlock">
            <strong>To:</strong><br />
            {state.wizardContext.to.name}<br />
            {state.wizardContext.to.street}<br />
            {state.wizardContext.to.city}<br/>
            {state.wizardContext.to.state} <br />
            {state.wizardContext.to.zip}
        </div> 
        <div className="infoBlock">
            <strong>Weight:</strong> {state.wizardContext.weight}<br/>
            <strong>Shipping Option:</strong> {state.wizardContext.shippingOption}
        </div> 
         <div className="infoBlock payment">
            <strong>Total Payment:</strong> <span>${shippingCost.toFixed(2)}</span>
        </div>         
        <div className="action">
                <button 
                  type="button"
                  className="previous"
                  disabled={this.props.state.pageNumber === 1}
                  onClick={
                    () => this.props.callbackFromParent(
                        { 
                          from: state.wizardContext.from,
                          to: state.wizardContext.to,
                          weight: state.wizardContext.weight,
                          shippingOption: 'ground'
                        }, 
                        this.props.state.pageNumber - 1
                      )
                  }>
                    Previous
                </button>
                <button
                  type="button"
                  className="next"
                  disabled={this.props.state.pageNumber === 6}
                  onClick={
                    () => this.props.callbackFromParent(
                        { 
                          from: state.wizardContext.from,
                          to: state.wizardContext.to,
                          weight: state.wizardContext.weight,
                          shippingOption: state.wizardContext.shippingOption
                        }, 
                        this.props.state.pageNumber + 1,
                        shippingCost
                      )
                  }>
                    Next
                </button>
            </div>     
        
      </div>
    );
  }
}

Confirm.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Confirm;