import React, { Component } from 'react';
import ItemUI from '../components/ItemUI';

class CartViewUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
  }
  render() {
    const {
      itemsAdded,
      totalSum,
      onRemoveItem,
      incrementItem,
  	  decrementItem
    } = this.props;
    return (
      <div className="cart-viewer">
        <div className="list-heading">Cart View</div>
        <span className={itemsAdded.length > 0 ? 'item-total' : 'item-total-zero'}>Total: ${totalSum}</span>
        <div className="cart-item-container">
          {
            itemsAdded.length ?
            itemsAdded.map((item, index) => {
              return (
                <ItemUI
                  key={index}
                  item={item}
                  view={'CartView'}
                  onRemoveItem={onRemoveItem}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                />
              );
            })
            : null
          }
        </div>
      </div>
    );
  }
}

export default CartViewUI;
