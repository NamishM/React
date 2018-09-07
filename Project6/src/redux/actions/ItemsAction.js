import * as types from '../constants/ActionTypes';

export const checkCredentials = (username, password) => ({
  type: types.GET_USER_API,
  username,
  password,
});

export const LoginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const LoginFaied = () => ({
  type: types.LOGIN_FAILED,
});

export const itemsLoadSuccess = options => ({
  type: types.ITEMS_LOAD_SUCCESS,
  options,
});

export const itemsLoadFailed = message => ({
  type: types.ITEMS_LOAD_FAILED,
  message,
});

export const setItemAdded = itemId => ({
  type: types.SET_ITEM_ADDED,
  itemId,
});

export const removeItem = itemId => ({
  type: types.ITEM_REMOVED,
  itemId,
});
