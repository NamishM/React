import * as types from '../constants/ActionTypes';

export const registerApplication = appName => ({
  type: types.APP_REGISTRATION_REGISTERED,
  appName,
});

export const unregisterApplication = () => ({
  type: types.APP_REGISTRATION_UNREGISTERED,
});

export const selectEndpoint = endpoint => ({
  type: types.APP_REGISTRATION_ENDPOINT_SELECTED,
  endpoint,
});

export const unselectEndpoint = endpoint => ({
  type: types.APP_REGISTRATION_ENDPOINT_UNSELECTED,
  endpoint,
});
