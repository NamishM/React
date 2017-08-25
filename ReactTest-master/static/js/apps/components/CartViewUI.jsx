import React, { Component } from 'react';
import ItemUI from '../components/ItemUI';

class CartViewUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 	added: false
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
        <span className="item-total">Total: ${totalSum}</span>
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
    );
  }
}

export default CartViewUI;
