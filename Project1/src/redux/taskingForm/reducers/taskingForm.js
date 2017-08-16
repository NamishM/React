import * as types from '../constants/ActionTypes';

const initialState = {
  isVisible: false,
  isExpanded: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TASKINGFORM_TOGGLE_VISIBLITY:
      return {
        ...state,
        isVisible: action.isVisible,
      };
    case types.TASKINGFORM_RESIZEMODAL:
      return {
        ...state,
        isExpanded: action.isExpanded,
      };
    case types.TASKINGFORM_RESETTODEFAULT:
      return {
        ...state,
        isExpanded: true,
        isVisible: false,
      };
    default:
      return state;
  }
};
