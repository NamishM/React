
// import { login, dataSources, getLoggedInStatus, getUserId, getToken,
// getLoginCounts, getUserProfileSettings, getUserTimeOut } from '../../reducers/login';
import { login, dataSources, getLoggedInStatus, getUserId,
  getLoginCounts } from '../../reducers/login';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
// import { modelReducer, formReducer } from 'react-redux-form';
// import * as index from '../../reducers/index';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  isLoading: false,
  loggedIn: false,
  token: {
    decoded: {
      userId: 0,
    },
    encoded: null,
    reference: {},
  },
  errorMessage: '',
  dataSources: [],
  config: {
    iDashUrl: 'about:blank',
    desktopPrimary: 1,
    desktopAlternate: 2,
  },
  maxLoginRetries: 3,
  loginAttempts: 0,
  userLocked: false,
  progressValueNow: 0,
  // loginRedirectURL: '',
};

// const model = {
//  userName: '',
//  password: '',
//  isEmergencyAccess: false,
//  dataSourceId: null,
// };

// const user = modelReducer('user', model);

// const userForm = formReducer('user', model);

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
        url: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
        desktopPrimary: 1,
        desktopAlternate: 3,
      },
    };
    deepFreeze(state);

    expect(login(state, {
      type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
      url: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
      desktopPrimary: 1,
      desktopAlternate: 3,
    })).toEqual({
      ...state,
      config: {
        ...state.config,
        iDashUrl: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
        desktopPrimary: 1,
        desktopAlternate: 3,
      },
    });
  });
  // it('should handle LOGIN_SUCCEEDED', () => {
  //  const state = {
  //   ...initialState,
  //    loggedIn: true,
  //    isLoading: false,
  //    errorMessage: '',
  //    token: action.token,
  //    userId: 27,
  //    loginAttempts: 0,
  //    progressValueNow: 100,
  //  };
  //  deepFreeze(state);

  //  expect(
  //  login(state, {
  //    type: types.LOGIN_SUCCEEDED,
  //    token: '123',
  //  }),
  // ).toEqual({
  //    ...intialState,
  //    loggedIn: true,
  //    isLoading: false,
  //    errorMessage: '',
  //    token: action.token,
  //    userId: 27,
  //    loginAttempts: 0,
  //    progressValueNow: 100,
  // });
  // });

  it('should handle LOGIN_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.LOGIN_FAILED,
        message: 'The User Name or Password is incorrect: Accounts will be locked after multiple failed attempts.',
        loginAttempts: 1,
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      loggedIn: false,
      errorMessage: 'The User Name or Password is incorrect: Accounts will be locked after multiple failed attempts.',
      dataSources: [],
      loginAttempts: 1,
    });
  });

  // it('should handle USER_LOCKED', () => {
  //  const state = {
  //    ...initialState,
  //  };
  //  deepFreeze(state);

  //  expect(
  // login(state, {
  // type: types.USER_LOCKED,
  // ...initialState,
  // }),
  // ).toEqual({
  //  ...initialState,
  // isLoading: false,
  // loginAttempts: 0,
  // userLocked: true,
  // errorMessage: 'You have exceeded the maximum number of login attempts.
  // Please contact your system admin.',
  // });
  // });

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

  it('should handle MAX_LOGIN_RETRIES_FETCH_FAILED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);
    expect(
      login(state, {
        type: types.MAX_LOGIN_RETRIES_FETCH_FAILED,
        message: '',
      }),
    ).toEqual({
      ...initialState,
    });
  });

  it('should handle MAX_LOGIN_RETRIES_FETCH_SUCCEEDED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      login(state, {
        type: types.MAX_LOGIN_RETRIES_FETCH_SUCCEEDED,
        availableProperty: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});

describe('UserRx Function', () => {
  it('should handle create getUserId Funtion', () => {
    const state = { login: { userId: '27' } };
    expect(getUserId(state)).toEqual({ userId: '27' });
  });

  // it('should handle getToken  Funtion', () => {
  //  const state = { login: { jti: '111' } };
  //  expect(getToken(state)).toEqual({ jti: '111' });
  // });

  it('should handle getLoginCounts  Funtion', () => {
    const state = { login: { loginAttempts: '1', maxLoginRetries: 2 } };
    expect(getLoginCounts(state)).toEqual({ loginAttempts: '1', maxRetries: 2 });
  });

  it('should handle getLoggedInStatus  Funtion', () => {
    const state = { login: { loggedIn: true } };
    expect(getLoggedInStatus(state)).toEqual({ isLoggedIn: true });
  });

  // it('should handle getUserProfileSettings  Funtion', () => {
  //  const state = { login: { desktopPrimary: true, desktopAlternate: 2 } };
  //  expect(getUserProfileSettings(state)).toEqual({ desktopPrimary: true, desktopAlternate: 2 });
  // });

  // it('should handle getUserTimeOut  Funtion', () => {
  //  const state = { login: { exp: 5, iat: 2 } };
  //  expect(getUserTimeOut(state)).toEqual({ expiryTime: 5, issuedTime: 2 });
  // });
});

// describe(' userForm index', () => {
//  it('should handle index.js', () => {
//    expect(index).toEqual({ login, user, userForm });
//  });
// });

