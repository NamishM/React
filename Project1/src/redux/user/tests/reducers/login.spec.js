
import { login, dataSources, getUserId, getLoggedInStatus,
  getAccessTokenMobileOrEhr, getUserProfileSettings } from '../../reducers/login';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import * as index from '../../reducers';
import { modelReducer, formReducer } from 'react-redux-form';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

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
};
describe('dataSources reducer', () => {
  it('should handle ADD_DATA_SOURCE', () => {
    const state = [{
      id: 0,
      name: 'Primary',
    }];

    expect(
      dataSources(state,
        {
          type: types.ADD_DATA_SOURCE,
          id: 0,
          name: 'Primary',
        }),
    ).toEqual([
      ...state,
      {
        id: 0,
        name: 'Primary',
      },
    ]);
  });
});
describe('login reducer', () => {
  it('should handle initial state', () => {
    expect(
      login(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle LOGIN_SET_IDENTITYSERVERMODEL error', () => {
    const state = { ...initialState };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_SET_IDENTITYSERVERMODEL,
        identityServerModel: {
          model: {
            requestId: '5cbe46c8-8772-4113-a952-839c9fffe5cd',
            siteUrl: 'http://localhost/SRSIdentityServer/',
            siteName: 'IdentityServer3',
            currentUser: null,
            logoutUrl: 'http://localhost/SRSIdentityServer/logout',
            custom: null,
            errorMessage: 'There was an unexpected error',
          },
          redirectUri: null,
        },
      }),
    ).toEqual({
      ...initialState,
      identityServerModel: {
        ...initialState.identityServerModel,
        requestId: '5cbe46c8-8772-4113-a952-839c9fffe5cd',
        siteUrl: 'http://localhost/SRSIdentityServer/',
        siteName: 'IdentityServer3',
        currentUser: null,
        logoutUrl: 'http://localhost/SRSIdentityServer/logout',
        custom: null,
        redirectUri: null,
        errorMessage: 'There was an unexpected error',
      },
    });
  });
  it('should handle LOGIN_SET_IDENTITYSERVERMODEL', () => {
    const state = { ...initialState };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_SET_IDENTITYSERVERMODEL,
        identityServerModel: {
          model: {
            requestId: null,
            antiForgery: {
              name: null,
              value: null,
            },
            externalProviders: [],
            errorMessage: null,
            siteUrl: null,
            siteName: null,
            currentUser: {
              id: 'fast',
              Password: 'srs',
            },
            logoutUrl: null,
            custom: null,
          },
          redirectUri: null,
        },
      }),
    ).toEqual({
      ...state,
      identityServerModel: {
        ...state.identityServerModel,
        requestId: null,
        antiForgery: {
          name: null,
          value: null,
        },
        externalProviders: [],
        errorMessage: null,
        siteUrl: null,
        siteName: null,
        currentUser: {
          id: 'fast',
          Password: 'srs',
        },
        logoutUrl: null,
        custom: null,
        redirectUri: null,
      },
    });
  });
  it('should handle LOGIN_SET_IDENTITYSERVERMODEL', () => {
    const state = { ...initialState };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_SET_IDENTITYSERVERMODEL,
        identityServerModel: null,
      }),
    ).toEqual({
      ...state,
      identityServerModel: {
        ...state.identityServerModel,
      },
    });
  });
  it('should handle DATA_SOURCE_FETCH_REQUESTED', () => {
    const state = {
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.DATA_SOURCE_FETCH_REQUESTED,
      }),
    ).toEqual({
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
    });
  });

  it('should handle DATA_SOURCE_FETCH_SUCCEEDED', () => {
    const state = {
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.DATA_SOURCE_FETCH_SUCCEEDED,
        dataSources: [{
          name: 'Primary',
          id: 0,
        }],
      }),
    ).toEqual({
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [{
        name: 'Primary',
        id: 0,
      }],
    });
  });

  it('should handle VIEW_PATIENT_TRACKING', () => {
    const state = {
      config: {
        ptDefaultView: 2,
      },
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.VIEW_PATIENT_TRACKING,
      }),
    ).toEqual({
      config: {
        ptDefaultView: 2,
      },
    });
  });
  it('should handle VIEW_TASKING', () => {
    const state = {
      config: {
        ptDefaultView: 1,
      },
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.VIEW_TASKING,
      }),
    ).toEqual({
      config: {
        ptDefaultView: 1,
      },
    });
  });

  it('should handle GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED', () => {
    const state = {
      isTaskingEnabled: true,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED,
        isTaskingEnabled: true,
      }),
    ).toEqual({
      isTaskingEnabled: true,
    });
  });

  it('should handle GET_ENABLE_TASKING_FETCH_STATUS_FAILED', () => {
    const state = {
      isTaskingEnabled: false,
      errorMessage: 'Error in API response',
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.GET_ENABLE_TASKING_FETCH_STATUS_FAILED,
        isTaskingEnabled: false,
        errorMessage: 'Error in API response',
      }),
    ).toEqual({
      isTaskingEnabled: false,
      errorMessage: 'Error in API response',
    });
  });

  it('should handle DATA_SOURCE_FETCH_FAILED', () => {
    const state = {
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [{
        name: 'Primary',
        id: 0,
      }],
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.DATA_SOURCE_FETCH_FAILED,
        message: 'error',
      }),
    ).toEqual({
      isLoading: false,
      loggedIn: false,
      errorMessage: 'error',
      dataSources: [],
    });
  });
  it('should handle LOGIN_SESSION_REMOTE_RESTORED', () => {
    const state = {
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
      progressValueNow: 0,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_SESSION_REMOTE_RESTORED,
      }),
    ).toEqual({
      isLoading: true,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
      progressValueNow: 50,
    });
  });
  it('should handle LOGIN_REQUESTED', () => {
    const state = {
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
      progressValueNow: 0,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_REQUESTED,
      }),
    ).toEqual({
      isLoading: true,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
      progressValueNow: 50,
    });
  });

  it('should handle LOGIN_SET_DEFAULT_USER_PROFILE', () => {
    const state = {
      ...initialState,
      config: {
        ...initialState.config,
        desktopAlternate: 2,
        desktopPrimary: 1,
        iDashUrl: 'about:blank',
        taskingRefreshInterval: 0,
      },
    };
    deepFreeze(state);

    expect(login(state, {
      type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
      url: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
      desktopPrimary: 1,
      desktopAlternate: 3,
      ptDefaultView: 2,
      taskingRefreshInterval: 10,
    })).toEqual({
      ...state,
      config: {
        ...state.config,
        desktopAlternate: 3,
        desktopPrimary: 1,
        iDashUrl: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
        ptDefaultView: 2,
        taskingRefreshInterval: 10,
      },
    });
  });
  it('should handle LOGIN_SUCCEEDED', () => {
    const state = {
      isLoading: true,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
      loginAttempts: 0,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_SUCCEEDED,
      }),
    ).toEqual({
      isLoading: false,
      loggedIn: true,
      errorMessage: '',
      dataSources: [],
      progressValueNow: 100,
      loginAttempts: 0,
    });
  });

  it('should handle GET_OIDC_FROM_EHR_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.GET_OIDC_FROM_EHR_SUCCESS,
        userId: 1,
        accessToken: 'ehr',
      }),
    ).toEqual({
      ...state,
      ehrToken: {
        userId: 1,
        accessToken: 'ehr',
      },
    });
  });
  it('should handle GET_OIDC_FROM_EHR_REFRESH_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.GET_OIDC_FROM_EHR_REFRESH_SUCCESS,
        accessToken: 'ehr',
      }),
    ).toEqual({
      ...state,
      ehrToken: {
        ...state.ehrToken,
        accessToken: 'ehr',
      },
    });
  });

  it('should handle LOGIN_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_FAILED,
        message: 'error',
        loginAttempts: 1,
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: 'error',
      dataSources: [],
      loginAttempts: 1,
    });
  });
  it('should handle LOGIN_FAILED2', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_FAILED,
        message: 'unauthorized',
        loginAttempts: 1,
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: 'The User Name or Password is incorrect: Accounts will be locked after multiple failed attempts.', // eslint-disable-line max-len
      dataSources: [],
      loginAttempts: 1,
    });
  });
  it('should handle LOGOUT_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGOUT_FAILED,
        message: 'error',
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: 'error',
      dataSources: [],
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    const state = {
      isLoading: false,
      loggedIn: true,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGOUT_REQUESTED,
      }),
    ).toEqual({
      isLoading: false,
      loggedIn: true,
      errorMessage: '',
      dataSources: [],
      userLocked: false,
    });
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    const state = {
      ...initialState,
      isLoading: true,
      loggedIn: true,
      errorMessage: '',
      dataSources: [],
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGOUT_SESSION_REMOTE_ENDED,
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
    });
  });
  it('should handle LOGOUT_SUCCEEDED', () => {
    const state = {
      ...initialState,
      isLoading: true,
      loggedIn: true,
      errorMessage: '',
      dataSources: [],
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGOUT_SUCCEEDED,
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: '',
      dataSources: [],
    });
  });
});

describe('Login Function', () => {
  it('should handle create getUserId Funtion', () => {
    const state = { oidc: { user: { profile: { sub: 'Super' } } } };
    expect(getUserId(state)).toEqual({ userId: 'Super' });
  });
  it('should handle create getAccessTokenMobileOrEhr Funtion', () => {
    const state = {
      oidc: { user: { access_token: 'oidc' } },
      login: { ehrToken: { accessToken: 'ehr' } },
    };
    expect(getAccessTokenMobileOrEhr(state)).toEqual('oidc');
  });
  it('should handle create getAccessTokenMobileOrEhr Funtion', () => {
    const state = {
      oidc: { user: null },
    };
    expect(getAccessTokenMobileOrEhr(state)).toEqual(null);
  });
  it('should handle create getUserProfileSettings Funtion', () => {
    const state = {
      oidc: { user: { access_token: 'oidc' } },
      login: {
        config: {
          desktopPrimary: 1,
          desktopAlternate: 2,
          taskingRefreshInterval: 10,
        },
        ptDefaultView: 1,
        ehrToken: {
          accessToken: 'ehr',
        },
      },
    };
    expect(getUserProfileSettings(state))
      .toEqual({
        desktopPrimary: 1,
        desktopAlternate: 2,
        ptDefaultView: 1,
        taskingRefreshInterval: 10,
      });
  });
  it('should handle getLoggedInStatus  Funtion', () => {
    const state = { login: { loggedIn: true } };
    expect(getLoggedInStatus(state)).toEqual({ isLoggedIn: true });
  });
});

const model = {
  userName: '',
  password: '',
  isEmergencyAccess: false,
  dataSourceId: null,
};

const user = modelReducer('user', model);
const userForm = formReducer('user', model);

describe('Login index', () => {
  it('should handle user', () => {
    expect(index.user.toString()).toEqual(user.toString());
  });
  it('should handle userForm', () => {
    expect(index.userForm.toString()).toEqual(userForm.toString());
  });
  it('should handle login', () => {
    expect(index.login.toString()).toEqual(login.toString());
  });
});
