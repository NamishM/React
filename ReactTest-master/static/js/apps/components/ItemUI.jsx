import React, { Component } from 'react';

class ItemUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 	isAdded: false
		};
	}
	render() {
    	const {
      		item,
            onSetItemAdded
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
                        <button 
                            disabled={this.state.isAdded}
                            type="button" 
                            className={this.state.isAdded ? 'btn-cart added' : 'btn-cart'}
                            onClick={() => {
                                onSetItemAdded({
                                    itemName: item.name,
                                    itemCurrency: item.currency,
                                    itemImageURL: item.imageURL,
                                    itemPrice: item.price
                                });
                                this.setState({ isAdded: !this.state.isAdded });
                            }}
                        >
                            {this.state.isAdded ? 'Added to cart' : 'Add to cart'}
                        </button>
                    </div>
                </div>  
            </div>                    
        );            
    }
}

export default ItemUI;