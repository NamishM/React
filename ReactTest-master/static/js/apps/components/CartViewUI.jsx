import React from 'react';

const CartViewUI = ({
  itemsAdded,
  totalSum
}) => (
  <div className="cart-viewer">
    <span className="item-total">Total: ${totalSum}</span>
  </div>
);

export default CartViewUI;
