import React from 'react';
import { connect } from 'react-redux';
import {
  itemAdded,
}
  from '../../redux/actions/ItemsAction';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  itemList: state.results,
});

const mapDispatchToProps = dispatch => ({
  onItemAdded: () => dispatch(itemAdded())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
