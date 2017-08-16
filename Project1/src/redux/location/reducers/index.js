import {
  LOCATION_CHANGE,
  LOCATION_SET_FULL_SCREEN_MODE,
} from '../constants/ActionTypes';

const initialState = {
  currentPath: '',
  previousPath: '',
  isFullScreenMode: false,
};

export const location = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        currentPath: action.payload.pathname,
        previousPath: state.currentPath,
      };
    case LOCATION_SET_FULL_SCREEN_MODE:
      return {
        ...state,
        isFullScreenMode: action.isFullScreenMode,
      };
    default:
      return state;
  }
};

export const getPaths = state => ({
  currentPath: state.routing.currentPath,
  previousPath: state.routing.previousPath,
  basename: state.routing.locationBeforeTransitions ?
    state.routing.locationBeforeTransitions.basename : '/',
});

export const getCurrentLocation = state => state.routing.currentPath;
