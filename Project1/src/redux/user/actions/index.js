import * as types from '../constants/ActionTypes';

// TODO: Some of the actions (and backing action types) are specific to the Login
// page (served at IdentityServer). We should move the types, actions, reducer
// to a redux/login area.
export const setIdentityServerModel = identityServerModel => ({
  type: types.LOGIN_SET_IDENTITYSERVERMODEL,
  identityServerModel,
});

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

export const setUserProfileDefaultSetting = ({
  url = '',
  desktopPrimary,
  desktopAlternate,
  ptDefaultView,
  taskingRefreshInterval,
  taskingSettings: {
    canCreateTasks,
    canDeleteTasks,
    canUpdateTasks,
  },
}) => ({
  type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
  url,
  desktopPrimary,
  desktopAlternate,
  ptDefaultView,
  taskingRefreshInterval,
  taskingSettings: {
    canCreateTasks,
    canDeleteTasks,
    canUpdateTasks,
  },
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

export const loginSucceeded = () => ({
  type: types.LOGIN_SUCCEEDED,
});

export const loginFailed = (message = '', loginAttempts = 0) => ({
  type: types.LOGIN_FAILED,
  message,
  loginAttempts,
});

export const logout = () => ({
  type: types.LOGOUT_REQUESTED,
});

export const logoutSucceeded = () => ({
  type: types.LOGOUT_SUCCEEDED,
});

export const logoutFailed = (message = '') => ({
  type: types.LOGOUT_FAILED,
  message,
});

export const getOidcUserSuccess = (user = null) => ({
  type: types.GET_OIDC_USER_SUCCESS,
  user,
});

export const getOidcUserFailed = (message = '') => ({
  type: types.GET_OIDC_USER_FAILED,
  message,
});

export const getOidcUserExpired = (user = null) => ({
  type: types.GET_OIDC_USER_EXPIRED,
  user,
});

export const getOidcUserFromEhrSuccess = (userId, accessToken) => ({
  type: types.GET_OIDC_FROM_EHR_SUCCESS,
  userId,
  accessToken,
});

export const getOidcUserFromRefreshSuccess = accessToken => ({
  type: types.GET_OIDC_FROM_EHR_REFRESH_SUCCESS,
  accessToken,
});

export const viewTasking = () => ({
  type: types.VIEW_TASKING,
  ptDefaultView: 1,
});

export const viewPatientTracking = () => ({
  type: types.VIEW_PATIENT_TRACKING,
  ptDefaultView: 2,
});

export const getEnableTaskingStatusSucceeded = isTaskingEnabled => ({
  type: types.GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED,
  isTaskingEnabled,
});

export const getEnableTaskingStatusFailed = (message = 'error in API Response') => ({
  type: types.GET_ENABLE_TASKING_FETCH_STATUS_FAILED,
  message,
  isTaskingEnabled: false,
});
