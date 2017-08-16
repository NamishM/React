import * as types from '../constants/ActionTypes';

export const displayTimeOutAlert = () => ({
  type: types.DISPLAY_TIMEOUTALERT,
});

export const updateCountDownTime = countDownTime => ({
  type: types.TIMEOUTALERT_UPDATE_COUNTDOWN_TIME,
  countDownTime,
});

export const signOutFromSession = () => ({
  type: types.TIMEOUTALERT_SESSION_SIGNOUT,
});

export const continueSession = () => ({
  type: types.TIMEOUTALERT_SESSION_CONTINUE,
});

export const sessionTimedOut = () => ({
  type: types.TIMEOUTALERT_SESSION_EXPIRED,
});

export const sessionTimeOutMessage = message => ({
  type: types.SET_ERROR_MESSAGE,
  message,
});

export const sessionRemoteExpiring = statusChanged => ({
  type: types.TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
  statusChanged,
});
