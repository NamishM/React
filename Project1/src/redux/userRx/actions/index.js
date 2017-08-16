import * as types from '../constants/ActionTypes';

export const getDataSources = () => ({
  type: types.DATA_SOURCE_FETCH_REQUESTED,
});

export const getDataSourcesSucceeded = dataSources => ({
  type: types.DATA_SOURCE_FETCH_SUCCEEDED,
  dataSources,
});

export const setDefaultDataSource = dataSourceId => ({
  type: 'rrf/change',
  model: 'user.dataSourceId',
  value: dataSourceId,
  silent: false,
  multi: false,
});

export const getLoginSessionRestored = () => ({
  type: types.LOGIN_SESSION_REMOTE_RESTORED,
});

export const getLoginSessionEnded = () => ({
  type: types.LOGOUT_SESSION_REMOTE_ENDED,
});


export const setUserProfileDefaultSetting = (url = '', desktopPrimary, desktopAlternate) => ({
  type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
  url,
  desktopPrimary,
  desktopAlternate,
});
export const getDataSourcesFailed = (message = '') => ({
  type: types.DATA_SOURCE_FETCH_FAILED,
  message,
});

export const login = (userName, password, dataSourceId) => ({
  type: types.LOGIN_REQUESTED,
  userName,
  password,
  dataSourceId,
});

export const loginSucceeded = token => ({
  type: types.LOGIN_SUCCEEDED,
  token,
});

export const loginFailed = (message = '', loginAttempts = 0) => ({
  type: types.LOGIN_FAILED,
  message,
  loginAttempts,
});

export const logout = token => ({
  type: types.LOGOUT_REQUESTED,
  token,
});

export const logoutSucceeded = () => ({
  type: types.LOGOUT_SUCCEEDED,
});

export const logoutFailed = (message = '') => ({
  type: types.LOGOUT_FAILED,
  message,
});

export const loginRefreshRequest = () => ({
  type: types.LOGIN_REFRESH_REQUESTED,
});

export const userLocked = () => ({
  type: types.USER_LOCKED,
});

export const getMaxLoginRetries = () => ({
  type: types.MAX_LOGIN_RETRIES_FETCH_REQUESTED,
});

export const getMaxLoginRetriesSucceeded = availableProperty => ({
  type: types.MAX_LOGIN_RETRIES_FETCH_SUCCEEDED,
  availableProperty,
});

export const getMaxLoginRetriesFailed = (message = 'error in API Response') => ({
  type: types.MAX_LOGIN_RETRIES_FETCH_FAILED,
  message,
});
