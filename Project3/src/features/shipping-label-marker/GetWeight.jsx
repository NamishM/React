import React, { Component } from 'react';
import PropTypes from 'prop-types';
class GetWeight extends Component {
  render() {
    const {
      state
    } = this.props;
    return (
      <div className="infoPanel">
        <h3>Enter Weight</h3>  
        <form>
            <div className="input">
                <label>Weight</label>
                <input type="text" name="Weight" ref={(input) => { this.weight = input }}/>
            </div>
            <span id="weight-error" className="error hide">Weight value is mandatory to fill</span> 
            <div className="action">
                <button 
                  type="button"
                  className="previous"
                  disabled={this.props.state.pageNumber === 1}
                  onClick={
                    () => this.props.callbackFromParent(
                        { 
                          from: state.wizardContext.from,
                          to: {
                              name: '',
                              street: '',
                              city: '',
                              state: '',
                              zip: '',
                          },
                          weight: null,
                          shippingOption: null
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
                    () => {
                       if(this.weight.value !== '') {
                        this.props.callbackFromParent(
                          { 
                            from: state.wizardContext.from,
                            to: state.wizardContext.to,
                            weight: this.weight.value,
                            shippingOption: null
                          }, 
                        this.props.state.pageNumber + 1,
                        null
                        );
                        document.getElementById('weight-error').style.display = 'none';  
                      } else {
                        document.getElementById('weight-error').style.display = 'block';
                      }
                    }
                  }>
                    Next
                </button>
            </div>                 
        </form>
      </div>
    );
  }
}

GetWeight.propTypes = {
  state: PropTypes.object.isRequired,
};

export default GetWeight;