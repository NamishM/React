import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';

const initialState = {
  desktopVisiblePanel: 'both',
  deviceVisiblePanel: 'left',
  leftArea: '',
  mainArea: '',
};

// TODO: See if this can go in location instead.
// TODO: Make this more generic...
const getMain = (pathname) => {
  if (/desktop/i.test(pathname)) {
    return 'desktop';
  }
  if (/tasking/i.test(pathname)) {
    return 'tasking';
  }
  return '';
};

const getLeft = (pathname) => {
  if (/appointment/i.test(pathname)) {
    return 'appointment';
  }
  if (/chart/i.test(pathname)) {
    return 'chart';
  }
  return '';
};


const wireframe = (state = initialState, action) => {
  switch (action.type) {
    case 'WIREFRAME_DESKTOP_TOGGLE_FULLSCREEN':
      return {
        ...state,
        desktopVisiblePanel: state.desktopVisiblePanel === 'both' ? 'right' : 'both',
      };
    case 'WIREFRAME_SMALL_TOGGLE_PANELS':
      return {
        ...state,
        deviceVisiblePanel: state.deviceVisiblePanel === 'right' ? 'left' : 'right',
      };
    case 'WIREFRAME_VIEW_LEFT':
      return {
        ...state,
        deviceVisiblePanel: 'left',
      };
    case 'WIREFRAME_VIEW_RIGHT':
      return {
        ...state,
        deviceVisiblePanel: 'right',
      };
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        mainArea: getMain(action.payload.pathname),
        leftArea: getLeft(action.payload.pathname),
      };
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    default:
      return state;
  }
};

export default wireframe;
