import * as types from '../constants/ActionTypes';

const initialState = {
  errorMessage: '',
  results: [],
	itemAdded: [],
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
					itemAdded: [action.itemAdded],
					totalSum: action.itemAdded.itemPrice
			};	
			default:
				return state;	
    }
};