import React from 'react';
import { connect } from 'react-redux';
import {
  getItemsList,
}
  from '../../redux/actions/ItemsAction';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state) => ({
  itemList: state,
});

const mapDispatchToProps = dispatch => ({
  onGetItemsList: () => dispatch(getItemsList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
