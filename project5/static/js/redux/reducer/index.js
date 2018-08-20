import * as types from '../constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
    errorMessage: '',
		results: [],
		addedItemIds: []
};

const updateProductDetails = (state = {}, action) => {
	switch (action.type) {
		case types.ADD_PRODUCT:
		return {
		  id: action.id,
		  name: action.name,
		  price: action.price,
		  currency: '$',
		  quantityRemaining: action.quantity,
		  quantityAdded: 0
		};
		case types.SET_ITEM_ADDED:
		case types.ITEM_INCREASED:
		{
			if(state.id == action.id) {
				return {
					...state,
					quantityRemaining: state.quantityRemaining > 0 ? state.quantityRemaining - 1 : 0,
					quantityAdded: state.quantityRemaining > 0 ? state.quantityAdded + 1 :  state.quantityAdded
				};
			}
		}
	  case types.ITEM_REMOVED:
	  {
			if(state.id == action.id) {
				return {
					...state,
					quantityRemaining: state.quantityAdded == 0 ? state.quantityRemaining : state.quantityRemaining + state.quantityAdded,
					quantityAdded: 0
				};
			}
		}
		case types.ITEM_DECREASED:
		{
			if(state.id == action.id) {
				return {
					...state,
					quantityRemaining: state.quantityAdded > 0 ? state.quantityRemaining + 1 : state.quantityRemaining,
					quantityAdded: state.quantityAdded > 0 ? state.quantityAdded - 1 :  0
				};
			}
		}
	  default:
		return state;
	}
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
	case types.ADD_PRODUCT:
	  return {
			...state,
			results: [
				...state.results,
				updateProductDetails({}, action)
			]
		};
	/*case types.ITEMS_LOAD_SUCCESS:			
		return Object.assign({}, state, {
        	results: action.options.map(option => updateProductDetails(option, action)),
      	});				
		case types.ITEMS_LOAD_FAILED:
		return {
			...initialState,
			errorMessage: action.errorMessage
		};*/
		case types.SET_ITEM_ADDED:
		return {
			...state,
			results: state.results.map(option => updateProductDetails(option, action)),
			addedItemIds: [...new Set([
				...state.addedItemIds,
				action.id
			])]
		};
		case types.ITEM_REMOVED:
		return {
			...state,
			results: state.results.map(option => updateProductDetails(option, action)),
			addedItemIds : [...new Set(reduceItemsId(state.addedItemIds, action.id))]
		};
		case types.ITEM_INCREASED:
		return {
			...state,
			results: state.results.map(option => updateProductDetails(option, action))
		};
		case types.ITEM_DECREASED:
		return {
			...state,
			results: state.results.map(option => updateProductDetails(option, action))
		};
		default:
			return state;	
    }
};

export const getItemsList = state => state.results || [];
const getAddedItemsIds = state => state.addedItemIds || [];

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
		priceList.push(parseInt(item.price)*parseInt(item.quantityAdded))
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
