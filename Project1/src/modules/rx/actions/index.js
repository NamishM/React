
import * as types from '../constants/ActionTypes';

export const setInitialData = (userName, password, practiceId, systemName) => ({
  type: types.SET_INITIAL_DATA,
  userName,
  password,
  practiceId,
  systemName,
});

export const showWidget = (widgetName, targetDiv, properties) => ({
  type: types.SHOW_WIDGET,
  widgetName,
  targetDiv,
  properties,
});

export const initRx = patientId => ({
  type: types.ON_INIT,
  patientId,
});

export const authenticationSuccess = authResult => ({
  type: types.AUTHENTICATION_SUCCESS,
  authResult,
});

export const authenticationFailed = msg => ({
  type: types.AUTHENTICATION_FAILURE,
  msg,
});
