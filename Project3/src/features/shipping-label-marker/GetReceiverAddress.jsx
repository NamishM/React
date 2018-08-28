import React, { Component } from 'react';
import PropTypes from 'prop-types';
class GetReceiverAddress extends Component {
  render() {
    const {
        state
      } = this.props;
    return (
      <div className="infoPanel">
        <h3>Enter the Receiver's address</h3>  
        <form>
            <div className="input">
                <label>Name</label>
                <input type="text" name="name" ref={(input) => { this.name = input }}/>
            </div>
            <div className="input">
                <label>Street</label>
                <input type="text" name="street" ref={(input) => { this.street = input }}/>
            </div>
            <div className="input short">
                <label>City</label>
                <input type="text" name="city" ref={(input) => { this.city = input }}/>
            </div>
            <div className="input short">
                <label>State</label>
                <input type="text" name="State" ref={(input) => { this.state = input }}/>
            </div>
            <div className="input short">
                <label>Zip</label>
                <input type="text" name="Zip" ref={(input) => { this.zip = input }}/>
            </div> 
            <span id="receiver-error" className="error hide">All fields are mandatory to fill</span>
            <div className="action">
                <button 
                  type="button"
                  className="previous"
                  disabled={this.props.state.pageNumber === 1}
                  onClick={
                    () => this.props.callbackFromParent(
                        { 
                        from: {
                            name: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                        },
                        to: state.wizardContext.to,
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
                        if(this.name.value !== '' && this.street.value !== '' && this.city.value !== '' && this.state.value !== '' && this.zip.value !== '') {
                            this.props.callbackFromParent(
                            { 
                            from: state.wizardContext.from,
                            to: {
                                name: this.name.value,
                                street: this.street.value,
                                city: this.city.value,
                                state: this.state.value,
                                zip: this.zip.value,
                            },
                            weight: null,
                            shippingOption: null
                            }, 
                            this.props.state.pageNumber + 1,
                            null
                        );
                        document.getElementById('receiver-error').style.display = 'none';
                     } else {
                        document.getElementById('receiver-error').style.display = 'block';
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

GetReceiverAddress.propTypes = {
  state: PropTypes.object.isRequired,
};

export default GetReceiverAddress;