
import timeOutAlertExtension from '../../reducers/timeOutAlertExtension';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import * as index from '../../reducers/index';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  isDisplayTimeOutAlert: false,
  countDownTime: 0,
};

describe('timeOutAlert reducer', () => {
  it('should handle initial state', () => {
    expect(
      timeOutAlertExtension(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle DISPLAY_TIMEOUTALERT', () => {
    const state = {
      isDisplayTimeOutAlert: false,
      countDownTime: 60,
    };
    deepFreeze(state);

    expect(
      timeOutAlertExtension(state, {
        type: types.DISPLAY_TIMEOUTALERT,
        countDownTime: 60,
      }),
    ).toEqual({
      isDisplayTimeOutAlert: true,
      countDownTime: 60,
    });
  });

  it('should handle TIMEOUTALERT_UPDATE_COUNTDOWN_TIME', () => {
    expect(
      timeOutAlertExtension(initialState, {
        type: types.TIMEOUTALERT_UPDATE_COUNTDOWN_TIME,
        countDownTime: 60,
      }),
    ).toEqual({
      isDisplayTimeOutAlert: false,
      countDownTime: 60,
    });
  });

  it('should handle TIMEOUTALERT_SESSION_CONTINUE', () => {
    const state = {};
    deepFreeze(state);

    expect(
      timeOutAlertExtension(state, {
        type: types.TIMEOUTALERT_SESSION_CONTINUE,
      }),
    ).toEqual({
      isDisplayTimeOutAlert: false,
    });
  });

  it('should handle TIMEOUTALERT_SESSION_SIGNOUT', () => {
    const state = {
      isDisplayTimeOutAlert: false,
    };
    deepFreeze(state);

    expect(
      timeOutAlertExtension(state, {
        type: types.TIMEOUTALERT_SESSION_SIGNOUT,
      }),
    ).toEqual({
      isDisplayTimeOutAlert: false,
    });
  });

  it('should handle TIMEOUTALERT_SESSION_EXPIRED', () => {
    const state = {
      isDisplayTimeOutAlert: false,
    };
    deepFreeze(state);

    expect(
      timeOutAlertExtension(state, {
        type: types.TIMEOUTALERT_SESSION_EXPIRED,
      }),
    ).toEqual({
      isDisplayTimeOutAlert: false,
    });
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      timeOutAlertExtension(state, {
        type: 'LOGOUT_SESSION_REMOTE_ENDED',
      }),
    ).toEqual({
      ...initialState,
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(
      timeOutAlertExtension(initialState, {
        type: 'LOGOUT_REQUESTED',
      }),
    ).toEqual({
      ...initialState,
    });
  });
});

describe('timeOutAlertExtension index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ timeOutAlertExtension });
  });
});
