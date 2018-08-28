import React, { Component } from 'react';
import ProgressBar from '../../../features/shipping-label-marker/ProgressBar';
import GetSenderAddress from '../../../features/shipping-label-marker/GetSenderAddress';
import GetReceiverAddress from '../../../features/shipping-label-marker/GetReceiverAddress';
import GetWeight from '../../../features/shipping-label-marker/GetWeight';
import GetShippingOption from '../../../features/shipping-label-marker/GetShippingOption';
import Confirm from '../../../features/shipping-label-marker/Confirm';
import ShippingLabel from '../../../features/shipping-label-marker/ShippingLabel';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      wizardContext: {
                    from: {
                            name: "",
                            street: "",
                            city: "",
                            state: "",
                            zip: ""
                        },
                    to: {
                        name: "",
                        street: "",
                        city: "",
                        state: "",
                        zip: ""
                    },
                    weight: null,
                    shippingOption: null
                },
       totalAmount: null         
    };
  }
  myCallback = (childData, pageNum, cost) => {
    this.setState({ wizardContext: childData, pageNumber: pageNum, totalAmount: cost });
  }  
  render() {    
    return (
      <div>        
        <div className="progressBarWrapper">
          <ProgressBar 
            state={this.state}
          />
        </div>
		{(() => {
				switch (this.state.pageNumber)
					{
						case 1:
							return <GetSenderAddress callbackFromParent={this.myCallback} state={this.state}/>
						case 2:
							return <GetReceiverAddress callbackFromParent={this.myCallback} state={this.state}/>
						case 3:
							return <GetWeight callbackFromParent={this.myCallback} state={this.state}/>
						case 4:
							return <GetShippingOption callbackFromParent={this.myCallback} state={this.state}/>
            case 5:
							return <Confirm callbackFromParent={this.myCallback} state={this.state}/> 
            case 6:
							return <ShippingLabel state={this.state}/>
						default:
							break;
					}
			})()}

        
			 
      </div>
    );
  }
}

export default Wizard;