import * as types from '../constants/ActionTypes';
import { SET_ERROR_MESSAGE } from '../../timeOutAlert/constants/ActionTypes';

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
    case types.LOGIN_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        errorMessage: '',
        token: action.token,
        userId: action.token.decoded.userId,
        loginAttempts: 0,
        progressValueNow: 100,
      };
    case types.LOGOUT_SESSION_REMOTE_ENDED:
    case types.LOGOUT_SUCCEEDED:
      return {
        ...state,
        loggedIn: false,
        isLoading: false,
        token: {
          decoded: {
            userId: 0,
          },
          encoded: null,
          reference: {},
        },
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
        token: {
          decoded: {
            userId: 0,
          },
          encoded: null,
          reference: {},
        },
        config: {
          iDashUrl: 'about:blank',
          desktopPrimary: 1,
          desktopAlternate: 2,
        },
      };
    case types.LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        errorMessage: action.message,
        token: {
          decoded: {
            userId: 0,
          },
          encoded: null,
          reference: {},
        },
        config: {
          iDashUrl: 'about:blank',
          desktopPrimary: 1,
          desktopAlternate: 2,
        },
      };
    case types.DATA_SOURCE_FETCH_REQUESTED:
    case types.MAX_LOGIN_RETRIES_FETCH_REQUESTED:
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
        },
      };
    case types.USER_LOCKED:
      return {
        ...state,
        isLoading: false,
        loginAttempts: 0,
        userLocked: true,
        errorMessage: `You have exceeded the maximum number of login attempts.
        Please contact your system admin.`,
      };
    case types.MAX_LOGIN_RETRIES_FETCH_SUCCEEDED:
    {
      const app = action.availableProperty && action.availableProperty.length > 0 ?
        action.availableProperty[0] :
        {
          propertyValue: 3,
        };
      const maxRetries = app.propertyValue;
      return {
        ...state,
        maxLoginRetries: maxRetries,
      };
    }
    case types.MAX_LOGIN_RETRIES_FETCH_FAILED:
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export const getToken = state => ({
  jti: state.login.token.decoded.jti,
});
export const getUserId = state => ({
  userId: state.login.userId,
});
export const getLoginCounts = state => ({
  loginAttempts: state.login.loginAttempts,
  maxRetries: state.login.maxLoginRetries,
});

export const getLoggedInStatus = state => ({
  isLoggedIn: state.login.loggedIn,
});
export const getUserProfileSettings = state => ({
  desktopPrimary: state.login.config.desktopPrimary,
  desktopAlternate: state.login.config.desktopAlternate,
});

export const getUserTimeOut = state => ({
  expiryTime: state.login.token.decoded.exp,
  issuedTime: state.login.token.decoded.iat,
});
