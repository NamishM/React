import * as types from '../constants/ActionTypes';

const initialState = {
  auth: {
    loginSuccess: null,
  },
  errorMessage: '',
  results: [],
  addedItemIds: [],
  planetsItem: null,
};

export default (state = initialState, action: any) => {
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
