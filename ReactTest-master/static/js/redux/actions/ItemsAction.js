import * as types from '../constants/ActionTypes';

export const itemsLoadSuccess = options => ({
  type: types.ITEMS_LOAD_SUCCESS,
  options
});

export const itemsLoadFailed = message => ({
  type: types.ITEMS_LOAD_FAILED,
  message
});

export const setItemAdded = ({
  id,
  itemName,
  itemCurrency,
  itemImageURL,
  itemPrice,
  addedToCart
}) => ({
  type: types.SET_ITEM_ADDED,
  itemAdded: {
    id,
    name: itemName,
    currency: itemCurrency,
    imageURL: itemImageURL,
    price: itemPrice,
    addedToCart
  }
});

export const removeItem = ({
  id
}) => ({
  type: types.ITEM_REMOVED,
  id
})
