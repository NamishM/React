import * as types from '../constants/ActionTypes';

const initialState = {
  errorMessage: '',
  results: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case types.ITEMS_LOAD_SUCCESS:
	return {
		...state,
		results: action.option,
	};
	case types.ITEMS_LOAD_FAILED:
	return {
        ...initialState,
        errorMessage: action.errorMessage
    }
	default:
	   return state;	
    }
};