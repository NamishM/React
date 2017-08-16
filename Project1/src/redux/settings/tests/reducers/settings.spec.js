import { LOGIN_SET_DEFAULT_USER_PROFILE,
  GET_ENABLE_TASKING_FETCH_STATUS_FAILED,
  GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED } from '../../../user/constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import { settings } from '../../reducers';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  users: {
    tasking: {
      canCreateTasks: false,
      canDeleteTasks: false,
      canUpdateTasks: false,
    },
  },
  system: {},
};

describe('settings reducer', () => {
  it('should handle initial state', () => {
    expect(
      settings(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle LOGIN_SET_DEFAULT_USER_PROFILE', () => {
    deepFreeze(initialState);

    expect(settings(initialState, {
      type: LOGIN_SET_DEFAULT_USER_PROFILE,
      url: 'https://mobile.srssoft.com/srsopenpath/pageprocessor/page/mobile/default.aspx?',
      desktopPrimary: 1,
      desktopAlternate: 3,
      ptDefaultView: 2,
      taskingRefreshInterval: 10,
      taskingSettings: {
        canCreateTasks: false,
        canDeleteTasks: false,
        canUpdateTasks: false,
      },
    })).toEqual({
      ...initialState,
      users: {
        tasking: {
          canCreateTasks: false,
          canDeleteTasks: false,
          canUpdateTasks: false,
        },
      },
    });
  });

  it('should handle GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED', () => {
    deepFreeze(initialState);

    expect(
      settings(initialState, {
        type: GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED,
        isTaskingEnabled: true,
      }),
    ).toEqual({
      ...initialState,
      users: {
        tasking: {
          canCreateTasks: false,
          canDeleteTasks: false,
          canUpdateTasks: false,
        },
      },
    });
  });

  it('should handle GET_ENABLE_TASKING_FETCH_STATUS_FAILED', () => {
    deepFreeze(initialState);

    expect(
      settings(initialState, {
        type: GET_ENABLE_TASKING_FETCH_STATUS_FAILED,
        isTaskingEnabled: false,
        errorMessage: 'Error in API response',
      }),
    ).toEqual({ ...initialState,
      users: {
        tasking: {
          canCreateTasks: false,
          canDeleteTasks: false,
          canUpdateTasks: false,
        },
      },
    });
  });
});
