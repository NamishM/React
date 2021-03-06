import React, { Component } from 'react';

class ItemUI extends Component {
	constructor(props) {
		super(props);
		/*this.state = {
		 	isAdded: false
		};*/
    }
    /*componentWillMount() {
        this.setState({ isAdded: this.props.item.addedToCart });
    }*/
	render() {
    	const {
      		item,
            onSetItemAdded,
            onRemoveItem,
            view
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
                            //disabled={view === 'ItemView' ? this.state.isAdded : null}
                            type="button"
                            //className={view === 'ItemView' ? this.state.isAdded ? 'btn-cart added' : 'btn-cart' : 'btn-cart'}
                            className='btn-cart'
                            onClick={() => {
                                view === 'CartView' ? onRemoveItem({id: item.id}) :
                                onSetItemAdded({
                                    id: item.id
                                });
                                //this.setState({ isAdded: !this.state.isAdded });
                            }}
                        >
                            {/*
                                view === 'ItemView' ?
                                this.state.isAdded ? 'Added to cart' : 'Add to cart'
                                : 'Remove from Cart'*/
                            }
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