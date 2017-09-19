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
      onRemoveItem
    } = this.props;
    return (
      <div className="cart-viewer">
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
