import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShippingOption } from '../../helper/helper';

class GetShippingOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 1
    }
  }
  
  handleChange = (e) => {
    this.setState({selectValue: Number.parseInt(e.target.value,10)});
  }
  render() {
    const {
      state
    } = this.props;
    return (
      <div className="infoPanel">
        <h3>Enter Shipping Option</h3>  
        <form>
            <div> Select to change
              <select value={this.state.selectValue} onChange={this.handleChange} className="shippingOption">
                <option value={ShippingOption.ground}>Ground</option>
                <option value={ShippingOption.priority}> Priority</option>
              </select>
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
                          weight: null,
                          shippingOption: null,
                        }, 
                        this.props.state.pageNumber - 1,
                        null
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
                          shippingOption: this.state.selectValue === ShippingOption.ground ? 'ground' : 'priority'
                        }, 
                        this.props.state.pageNumber + 1,
                        null
                      )
                  }>
                    Next
                </button>
            </div>               
        </form>
      </div>
    );
  }
}

GetShippingOption.propTypes = {
  state: PropTypes.object.isRequired,
};

export default GetShippingOption;