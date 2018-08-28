import React, { Component } from 'react';
import Wizard from '../../core/components/wizard/Wizard'

class ShippingLabelMarker extends Component {  
  render() {    
    return (
      <div>
        <div className="header">
          <h1>Shipping Label Marker</h1>
        </div>
        <Wizard />
      </div>
    );
  }
}

export default ShippingLabelMarker;