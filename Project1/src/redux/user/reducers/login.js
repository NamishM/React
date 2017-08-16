import * as types from '../constants/ActionTypes';
import { isLoadedWithAccessToken } from '../../../auth/oidc';

const initialState = {
  isTaskingEnabled: false,
  isLoading: false,
  loggedIn: false,
  errorMessage: '',
  dataSources: [],
  config: {
    iDashUrl: 'about:blank',
    desktopPrimary: 1,
    desktopAlternate: 2,
    ptDefaultView: 0,
    taskingRefreshInterval: 0,
  },
  ehrToken: {
    userId: null,
    dataSource: null,
    accessToken: null,
  },
  maxLoginRetries: 3,
  loginAttempts: 0,
  userLocked: false,
  progressValueNow: 0,
  identityServerModel: {
    loginUrl: null,
    antiForgery: {
      name: null,
      value: null,
    },
    allowRememberMe: null,
    rememberMe: null,
    username: null,
    externalProviders: [],
    additionalLinks: null,
    clientName: null,
    clientUrl: null,
    clientLogoUrl: null,
    errorMessage: null,
    requestId: null,
    siteUrl: null,
    siteName: null,
    currentUser: { },
    logoutUrl: null,
    custom: null,
    redirectUri: null,
  },
  // loginRedirectURL: '',
};

export const dataSources = (state = [], action) => {
  switch (action.type) {
    case types.ADD_DATA_SOURCE:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },
      ];
    default:
      return state;
  }
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_SOURCE_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        dataSources: action.dataSources,
      };
    case types.DATA_SOURCE_FETCH_FAILED:
      return {
        ...state,
        dataSources: dataSources(undefined, {}),
        isLoading: false,
        errorMessage: action.message,
      };
    case types.LOGIN_SET_IDENTITYSERVERMODEL:
      return {
        ...state,
        identityServerModel: action.identityServerModel ? {
          loginUrl: action.identityServerModel.model.loginUrl || null,
          antiForgery: action.identityServerModel.model.antiForgery ?
            {
              name: action.identityServerModel.model.antiForgery.name,
              value: action.identityServerModel.model.antiForgery.value,
            } : {
              name: null,
              value: null,
            },
          allowRememberMe: action.identityServerModel.model.allowRememberMe || null,
          rememberMe: action.identityServerModel.model.rememberMe || null,
          username: action.identityServerModel.model.username || null,
          externalProviders: action.identityServerModel.model.externalProviders ?
            [...action.identityServerModel.model.externalProviders] :
            [],
          additionalLinks: action.identityServerModel.model.additionalLinks || null,
          clientName: action.identityServerModel.model.clientName || null,
          clientUrl: action.identityServerModel.model.clientUrl || null,
          clientLogoUrl: action.identityServerModel.model.clientLogoUrl || null,
          errorMessage: action.identityServerModel.model.errorMessage || null,
          requestId: action.identityServerModel.model.requestId || null,
          siteUrl: action.identityServerModel.model.siteUrl || null,
          siteName: action.identityServerModel.model.siteName || null,
          currentUser: action.identityServerModel.model.currentUser ?
            { ...action.identityServerModel.model.currentUser } :
            null,
          logoutUrl: action.identityServerModel.model.logoutUrl || null,
          custom: action.identityServerModel.model.custom || null,
          redirectUri: action.identityServerModel.redirectUri || null,
        } : { ...initialState.identityServerModel },
      };
    case types.GET_OIDC_FROM_EHR_SUCCESS:
      return {
        ...state,
        ehrToken: {
          userId: action.userId,
          accessToken: action.accessToken,
        },
      };
    case types.GET_OIDC_FROM_EHR_REFRESH_SUCCESS:
      return {
        ...state,
        ehrToken: {
          ...state.ehrToken,
          accessToken: action.accessToken,
        },
      };
    case types.LOGIN_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        errorMessage: '',
        loginAttempts: 0,
        progressValueNow: 100,
      };
    case types.LOGOUT_SESSION_REMOTE_ENDED:
    case types.LOGOUT_SUCCEEDED:
      return {
        ...state,
        loggedIn: false,
        isLoading: false,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        progressValueNow: 0,
        loginAttempts: action.loginAttempts,
        errorMessage: (action.message && action.message.toLowerCase() === 'unauthorized') ?
          'The User Name or Password is incorrect: Accounts will be locked after multiple failed attempts.'
          : action.message,
        config: {
          iDashUrl: 'about:blank',
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 0,
          taskingRefreshInterval: 0,
        },
      };
    case types.LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        errorMessage: action.message,
        config: {
          iDashUrl: 'about:blank',
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 0,
          taskingRefreshInterval: 0,
        },
      };
    case types.DATA_SOURCE_FETCH_REQUESTED:
    case types.LOGOUT_REQUESTED:
      return {
        ...state,
        userLocked: false,
      };
    case types.LOGIN_SESSION_REMOTE_RESTORED:
    case types.LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        userLocked: false,
        errorMessage: '',
        progressValueNow: 50,
      };
    case types.LOGIN_SET_DEFAULT_USER_PROFILE:
      return {
        ...state,
        config: {
          ...state.config,
          iDashUrl: action.url,
          desktopPrimary: action.desktopPrimary,
          desktopAlternate: action.desktopAlternate,
          ptDefaultView: action.ptDefaultView,
          taskingRefreshInterval: action.taskingRefreshInterval,
        },
      };
    case types.VIEW_PATIENT_TRACKING:
      return {
        ...state,
        config: {
          ...state.config,
          ptDefaultView: 2,
        },
      };
    case types.VIEW_TASKING:
      return {
        ...state,
        config: {
          ...state.config,
          ptDefaultView: 1,
        },
      };
    case types.GET_ENABLE_TASKING_FETCH_STATUS_FAILED:
    case types.GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED:
      return {
        ...state,
        isTaskingEnabled: action.isTaskingEnabled,
      };
    default:
      return state;
  }
};

export const getUserId = state => ({
  userId: isLoadedWithAccessToken ? state.login.ehrToken.userId : state.oidc.user.profile.sub,
});

export const getAccessTokenMobileOrEhr = (state) => {
  if (state.oidc.user !== null) {
    return state.oidc.user.access_token;
  } else if (isLoadedWithAccessToken && state.login.ehrToken.accessToken !== null) {
    // todo: rename accessToken so it's the same as property in OIDC
    return state.login.ehrToken.accessToken;
  }
  return null;
};

export const getLoggedInStatus = state => ({
  isLoggedIn: state.login.loggedIn,
});

// note: may want to keep this around
export const getUserProfileSettings = state => ({
  desktopPrimary: state.login.config.desktopPrimary,
  desktopAlternate: state.login.config.desktopAlternate,
  ptDefaultView: state.login.ptDefaultView,
  taskingRefreshInterval: state.login.config.taskingRefreshInterval,
});
