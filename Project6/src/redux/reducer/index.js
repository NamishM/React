import * as types from '../constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
  auth: {
    loginSuccess: null,
  },
  errorMessage: '',
  results: [],
  addedItemIds: [],
  planetsItem: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loginSuccess: true,
        },
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        auth: {
          ...state.auth,
          loginSuccess: false,
        },
      };
    case types.ITEMS_LOAD_SUCCESS:
      return {
        ...state,
        results: action.options,
      };
    case types.ITEMS_LOAD_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case types.PLANETS_LOAD_SUCCESS:
      return {
        ...state,
        planetsItem: action.options,
      };
    case types.PLANETS_LOAD_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const getItemsList = state => state.results || [];

export const getCartProducts = createSelector(
  [
    getItemsList,
  ],
  (
    itemsList,
  ) => {
    const cartItems = [itemsList];
    return cartItems;
  },
);

export const getPrices = (cartItems) => {
  const priceList = [];
  cartItems.map(item =>
    priceList.push(item.price),
  );
  return priceList;
};

