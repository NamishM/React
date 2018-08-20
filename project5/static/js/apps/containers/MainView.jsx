import React from 'react';
import { connect } from 'react-redux';
import {
  setItemAdded,
  removeItem,
  addProduct,
  incrementItem,
  decrementItem
}
  from '../../redux/actions/ItemsAction';
import {
    getItemsList,
    getCartProducts,
    getTotalAmount
}
  from '../../redux/reducer';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  //itemList: setCartStatusFalse(state),
  //itemsAdded: setCartStatusTrue(getCartProducts(state)),
  itemList: getItemsList(state),
  itemsAdded: getCartProducts(state),
  totalSum: getTotalAmount(state)
});

const mapDispatchToProps = dispatch => ({
  onAddProduct: (
    name,
    quantity,
    price
  ) => dispatch(addProduct(name, quantity, price)),
  onSetItemAdded: (id) => dispatch(setItemAdded(id)),
  onRemoveItem : (id) => dispatch(removeItem(id)),
  incrementItem: (id) => dispatch(incrementItem(id)),
  decrementItem : (id) => dispatch(decrementItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
