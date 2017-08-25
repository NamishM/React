import React from 'react';
import { connect } from 'react-redux';
import {
  setItemAdded,
  removeItem
}
  from '../../redux/actions/ItemsAction';
import {
    setCartStatus
}
  from '../../redux/reducer';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  itemList: setCartStatus(state),
  itemsAdded: state.cartItemList,
  totalSum: state.totalSum
});

const mapDispatchToProps = dispatch => ({
  onSetItemAdded: ({
    id,
    itemName,
    itemCurrency,
    itemImageURL,
    itemPrice,
    addedToCart
  }) => dispatch(setItemAdded({
    id,
    itemName,
    itemCurrency,
    itemImageURL,
    itemPrice,
    addedToCart
  })),
  onRemoveItem : ({
    id
  }) => dispatch(removeItem({
    id
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
