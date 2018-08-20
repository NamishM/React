import * as types from '../constants/ActionTypes';
import { v4 } from  'uuid';

export const addProduct = (name, quantity, price) => ({
  type: types.ADD_PRODUCT,
  id: v4(),
  name,
  quantity,
  price
});

export const itemsLoadSuccess = options => ({
  type: types.ITEMS_LOAD_SUCCESS,
  options
});

export const itemsLoadFailed = message => ({
  type: types.ITEMS_LOAD_FAILED,
  message
});

export const setItemAdded = (id) => ({
  type: types.SET_ITEM_ADDED,
  id
});

export const removeItem = (id) => ({
  type: types.ITEM_REMOVED,
  id
})

export const decrementItem = (id) => ({
  type: types.ITEM_DECREASED,
  id
})

export const incrementItem = (id) => ({
  type: types.ITEM_INCREASED,
  id
})