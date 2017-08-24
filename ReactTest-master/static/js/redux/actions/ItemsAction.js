import * as types from '../constants/ActionTypes';

export const getItemsList = () => ({
  type: types.GET_ITEMS_LIST
});

export const itemsLoadSuccess = options => ({
  type: types.ITEMS_LOAD_SUCCESS
});

export const itemsLoadFailed = message => ({
  type: types.ITEMS_LOAD_FAILED,
  message
});