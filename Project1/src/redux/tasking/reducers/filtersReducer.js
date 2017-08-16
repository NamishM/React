import * as types from '../constants/ActionTypes';

const initialState = {
  isFilterBoardVisible: false,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTERS_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: !state.isFilterBoardVisible,
      });
    }
    default:
      return state;
  }
};

export default filtersReducer;
