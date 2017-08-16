import * as types from '../constants/ActionTypes';

const initialState = {
  isNestedTaskVisible: false,
  isNoTaskGridVisible: false,
};

const nestedTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NESTEDTASK_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isNestedTaskVisible: !state.isNestedTaskVisible,
      });
    }
    case types.NOTASKGRID_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isNoTaskGridVisible: !state.isNoTaskGridVisible,
      });
    }
    default:
      return state;
  }
};

export default nestedTaskReducer;
