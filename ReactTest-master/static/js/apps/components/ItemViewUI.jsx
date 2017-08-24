import React, { Component } from 'react';

class ItemViewUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 	added: false
		};
	}
	render() {
    	const {
      		itemList
    	} = this.props;
    return (
      <div className="item-viewer">
         <div className="list-heading">Product List</div>
         <div className="item-container-wrap">
           <div className="item-container">
             <div className="item-color-box">
               <img src="http://placehold.it/150/1b21a0/ffffff" alt="item" />
             </div>
             <div className="item-detail-box">
              <div className="item-name">
                Product A
              </div>
              <div className="item-price">
                $250
              </div>
              <div className="btn-container">
                <button type="button" className="btn-cart">Add to cart</button>
              </div>
             </div>  
            </div>
           </div>    
      </div>
    );
  }
}

export default ItemViewUI;