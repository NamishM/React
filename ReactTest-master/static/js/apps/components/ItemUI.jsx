import React, { Component } from 'react';

class ItemUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 	added: false
		};
	}
	render() {
    	const {
      		item,
            onItemAdded
    	} = this.props;
        return (
            <div id={item.id} className="item-container">
                <div className="item-color-box">
                    <img src={item.imageURL} alt="item" />
                </div>
                <div className="item-detail-box">
                    <div className="item-name">
                    {item.name}
                    </div>
                    <div className="item-price">
                    {item.currency}{item.price}
                    </div>
                    <div className="btn-container">
                    <button type="button" className="btn-cart">Add to cart</button>
                    </div>
                </div>  
            </div>                    
        );            
    }
}

export default ItemUI;