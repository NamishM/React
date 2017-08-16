import * as types from '../constants/ActionTypes';
import {
  LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED,
} from '../../user/constants/ActionTypes';

const initialState = {
  isDisplayTimeOutAlert: false,
  countDownTime: 0, // will be milliseconds in absolute time
};

const timeOutAlertExtension = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY_TIMEOUTALERT:
      return {
        ...state,
        isDisplayTimeOutAlert: true,
      };
    case types.TIMEOUTALERT_UPDATE_COUNTDOWN_TIME:
      return {
        ...state,
        countDownTime: action.countDownTime,
      };
    case types.TIMEOUTALERT_SESSION_CONTINUE:
      return {
        ...state,
        isDisplayTimeOutAlert: false,
      };
    case types.TIMEOUTALERT_SESSION_SIGNOUT:
    case types.TIMEOUTALERT_SESSION_EXPIRED:
      return {
        ...state,
        isDisplayTimeOutAlert: false,
      };
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    default:
      return state;
  }
};

export default timeOutAlertExtension;
