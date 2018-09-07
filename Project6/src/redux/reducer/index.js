import * as types from '../constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
  auth: {
    loginSuccess: null,
  },
  errorMessage: '',
  results: [],
  addedItemIds: [],
};

const reduceItemsId = (arr, id) => {
  const newArray = arr.slice();
  const index = newArray.indexOf(id);
  if (index >= 0) {
    newArray.splice(index, 1);
  }
  return newArray;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...initialState,
        auth: {
          ...state.auth,
          loginSuccess: true,
        },
      };
    case types.LOGIN_FAILED:
      return {
        ...initialState,
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
        ...initialState,
        errorMessage: action.errorMessage,
      };
    case types.SET_ITEM_ADDED:
    { const { itemId } = action;
      return {
        ...state,
        addedItemIds: [
          ...state.addedItemIds,
          itemId,
        ],
      };
    }
    case types.ITEM_REMOVED:
      return {
        ...state,
        removedItemId: action.itemId,
        addedItemIds: reduceItemsId(state.addedItemIds, action.itemId),
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

