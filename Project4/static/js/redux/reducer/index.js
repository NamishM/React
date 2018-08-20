import * as types from '../constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
    errorMessage: '',
		results: [],
		addedItemIds: []
};

const reduceItemsId = (arr, id) => {
	let newArray = arr.slice();
	const index = newArray.indexOf(id);
	if (index >= 0) {
		newArray.splice( index, 1 );
	}
	return newArray;
};

export default (state = initialState, action) => {
  switch (action.type) {
	case types.ITEMS_LOAD_SUCCESS:			
		return {
			...state,
			results: action.options,
		};				
		case types.ITEMS_LOAD_FAILED:
		return {
			...initialState,
			errorMessage: action.errorMessage
		};
		case types.SET_ITEM_ADDED: 
		{ const { itemId } = action;
			return {
				...state,
				addedItemIds: [
					...state.addedItemIds,
					itemId
				]
			};
		}
		case types.ITEM_REMOVED:
		return {
			...state,
			removedItemId: action.itemId,
			addedItemIds : reduceItemsId(state.addedItemIds, action.itemId)
		};	
		default:
			return state;	
    }
};

const getItemsList = state => state.results || [];
const getAddedItemsIds = state => state.addedItemIds || [];

/*export const setCartStatusFalse = createSelector(
	[
	  getItemsList
	],
	(
	  itemsList
	) => itemsList.map(item => ({
	  id: item.id,
	  imageURL: item.imageURL,
	  name: item.name,
	  price: item.price,
	  currency: item.currency,
	  addedToCart: false
	})),
);

export const setCartStatusTrue = (
	  itemsList
	) => itemsList.map(item => ({
	  id: item.id,
	  imageURL: item.imageURL,
	  name: item.name,
	  price: item.price,
	  currency: item.currency,
	  addedToCart: true
	}));*/

export const getCartProducts = createSelector(
	[
		getItemsList,
		getAddedItemsIds
	],
	(
		itemsList,
		addedItemIds
	) => {
		const cartItems = [];
		addedItemIds.length > 0 ? addedItemIds.map(id =>
			cartItems.push(itemsList.filter(item => item.id === id)[0])
		) : null;
		return cartItems;
	}
);

export const getPrices = (cartItems) => {
	const priceList = [];
	cartItems.map(item =>
		priceList.push(item.price)
	);
	return priceList;
};

export const getTotalAmount = createSelector(
	[
		getItemsList,
		getAddedItemsIds
	],
	(
		itemsList,
		addedItemIds
	) => {
		const cartItems = [];
		addedItemIds.length > 0 ? addedItemIds.map(id =>
			cartItems.push(itemsList.filter(item => item.id === id)[0])
		) : null;
		return getPrices(cartItems).reduce((total, price) =>
			total + price, 0
		);
	}
);
