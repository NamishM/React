import React, { Component } from 'react';

class ItemUI extends Component {
	constructor(props) {
		super(props);
    }
	render() {
    	const {
      		item,
            onSetItemAdded,
            onRemoveItem,
            incrementItem,
  	        decrementItem,
            view
        } = this.props; 
        return (
            <div id={item.id} className="item-container">
                <div className="item-detail-box">
                    <div className="item-name">
                        Product: {item.name}
                    </div>
                    <div className="item-price">
                        {item.currency}{item.price}
                    </div>
                    <div className="item-price">
                        Quantity: {view === 'CartView' ? item.quantityAdded : item.quantityRemaining}
                    </div>
                    {view === 'CartView' ?
                    <div className="item-price">
                     <button
                      type="button"
                      className='btn'
                      onClick={() => incrementItem(item.id)}
                     >
                        <i className="fa fa-plus"></i>
                     </button>
                     <button
                      type="button"
                      className='btn'
                      onClick={() => decrementItem(item.id)}
                     >
                        <i className="fa fa-minus"></i>
                     </button>
                     </div>
                      : null}
                    <div className="btn-container">
                        <button 
                            type="button"
                            className={view === 'ItemView' ? 'btn-cart' : 'btn-cart'}
                            className='btn-cart'
                            onClick={() => {
                                view === 'CartView' ?
                                 onRemoveItem(item.id) :
                                onSetItemAdded(item.id);
                            }}
                        >
                            {
                                view === 'ItemView' ?
                                'Add to cart'
                                : 'Remove from Cart'
                            }
                        </button>
                    </div>
                </div>  
            </div>                    
        );            
    }
}

export default ItemUI;