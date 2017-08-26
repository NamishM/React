import React from 'react';
import { connect } from 'react-redux';
import {
  setItemAdded,
  removeItem
}
  from '../../redux/actions/ItemsAction';
import {
    //setCartStatusFalse,
    //setCartStatusTrue,
    getCartProducts,
    getTotalAmount
}
  from '../../redux/reducer';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  //itemList: setCartStatusFalse(state),
  //itemsAdded: setCartStatusTrue(getCartProducts(state)),
  itemList: state.results,
  itemsAdded: getCartProducts(state),
  totalSum: getTotalAmount(state)
});

const mapDispatchToProps = dispatch => ({
  onSetItemAdded: ({
    id
  }) => dispatch(setItemAdded(id)),
  onRemoveItem : ({
    id
  }) => dispatch(removeItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
