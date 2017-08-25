import * as types from '../constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
    errorMessage: '',
	results: [],
	newItemAdded: {},
	cartItemList: [],
	totalSum: 0
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
		return {
			...state,
			newItemAdded: action.itemAdded,
			cartItemList: [action.itemAdded],
			totalSum: action.itemAdded.price
		};
		case types.ITEM_REMOVED:
		return {
			...state,
			cartItemList: [],
			newItemAdded: {},
			totalSum: 0
		};	
		default:
			return state;	
    }
};

const getItemsList = state => state.results || [];

export const setCartStatus = createSelector(
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
