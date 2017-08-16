
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('timeOutAlert action', () => {
  it('displayTimeOutAlert should create DISPLAY_TIMEOUTALERT action', () => {
    expect(actions.displayTimeOutAlert(60)).toEqual({
      type: types.DISPLAY_TIMEOUTALERT,
    });
  });

  it('updateCountDownTime should create TIMEOUTALERT_UPDATE_COUNTDOWN_TIME action', () => {
    expect(actions.updateCountDownTime(60)).toEqual({
      type: types.TIMEOUTALERT_UPDATE_COUNTDOWN_TIME,
      countDownTime: 60,
    });
  });

  it('signOutFromSession should create TIMEOUTALERT_SESSION_SIGNOUT action', () => {
    expect(actions.signOutFromSession()).toEqual({
      type: types.TIMEOUTALERT_SESSION_SIGNOUT,
    });
  });

  it('continueSession should create TIMEOUTALERT_SESSION_CONTINUE action', () => {
    expect(actions.continueSession()).toEqual({
      type: types.TIMEOUTALERT_SESSION_CONTINUE,
    });
  });

  it('sessionTimeOutMessage should create TIMEOUTALERT_SESSION_EXPIRED action', () => {
    expect(actions.sessionTimeOutMessage('Time Out')).toEqual({
      type: types.SET_ERROR_MESSAGE,
      message: 'Time Out',
    });
  });

  it('sessionTimedOut should create TIMEOUTALERT_SESSION_EXPIRED action', () => {
    expect(actions.sessionTimedOut()).toEqual({
      type: types.TIMEOUTALERT_SESSION_EXPIRED,
    });
  });

  it('sessionRemoteExpiring should create TIMEOUTALERT_REMOTE_SESSION_EXPIRING action', () => {
    expect(actions.sessionRemoteExpiring()).toEqual({
      type: types.TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
    });
  });
});
