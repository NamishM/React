import * as types from '../constants/ActionTypes';

const initialState = {
  isIdle: true,
  statusChanged: null,
};

export const idle = (state = initialState, action) => {
  switch (action.type) {
    case types.IDLE_ACTIVE_SILENT:
    case types.IDLE_ACTIVE:
      return {
        ...state,
        isIdle: false,
        statusChanged: action.statusChanged,
      };
    case types.IDLE_INACTIVE:
      return {
        ...state,
        isIdle: true,
        statusChanged: action.statusChanged,
      };
    default:
      return state;
  }
};
