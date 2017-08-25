import React from 'react';
import { connect } from 'react-redux';
import {
  setItemAdded,
}
  from '../../redux/actions/ItemsAction';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  itemList: state.results,
  itemsAdded: state.itemsAdded,
  totalSum: state.totalSum
});

const mapDispatchToProps = dispatch => ({
  onSetItemAdded: ({
    itemName,
    itemCurrency,
    itemImageURL,
    itemPrice
  }) => dispatch(setItemAdded({
    itemName,
    itemCurrency,
    itemImageURL,
    itemPrice
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
