import * as types from '../constants/ActionTypes';

export const itemsLoadSuccess = options => ({
  type: types.ITEMS_LOAD_SUCCESS,
  options
});

export const itemsLoadFailed = message => ({
  type: types.ITEMS_LOAD_FAILED,
  message
});

export const itemAdded = () => ({
  type: types.ITEM_ADDED
});
