
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('userRx action', () => {
  it('getDataSources should create DATA_SOURCE_FETCH_REQUESTED action', () => {
    expect(actions.getDataSources()).toEqual({
      type: types.DATA_SOURCE_FETCH_REQUESTED,
    });
  });

  it('getLoginSessionRestored should create LOGIN_SESSION_REMOTE_RESTORED action', () => {
    expect(actions.getLoginSessionRestored()).toEqual({
      type: types.LOGIN_SESSION_REMOTE_RESTORED,
    });
  });

  it('getLoginSessionEnded should create LOGOUT_SESSION_REMOTE_ENDED action', () => {
    expect(actions.getLoginSessionEnded()).toEqual({
      type: types.LOGOUT_SESSION_REMOTE_ENDED,
    });
  });

  it('logoutSucceeded should create LOGOUT_SUCCEEDED action', () => {
    expect(actions.logoutSucceeded()).toEqual({
      type: types.LOGOUT_SUCCEEDED,
    });
  });

  it('loginRefreshRequest should create LOGIN_REFRESH_REQUESTED action', () => {
    expect(actions.loginRefreshRequest()).toEqual({
      type: types.LOGIN_REFRESH_REQUESTED,
    });
  });

  it('userLocked should create USER_LOCKED action', () => {
    expect(actions.userLocked()).toEqual({
      type: types.USER_LOCKED,
    });
  });

  it('getMaxLoginRetries should create MAX_LOGIN_RETRIES_FETCH_REQUESTED action', () => {
    expect(actions.getMaxLoginRetries()).toEqual({
      type: types.MAX_LOGIN_RETRIES_FETCH_REQUESTED,
    });
  });

  it('getMaxLoginRetriesFailed should create MAX_LOGIN_RETRIES_FETCH_FAILED action', () => {
    expect(actions.getMaxLoginRetriesFailed('Error in API response')).toEqual({
      type: types.MAX_LOGIN_RETRIES_FETCH_FAILED,
      message: 'Error in API response',
    });
  });

  it('loginFailed should create LOGIN_FAILED action', () => {
    expect(actions.loginFailed('', 0)).toEqual({
      type: types.LOGIN_FAILED,
      message: '',
      loginAttempts: 0,
    });
  });

  it('getDataSourcesFailed should create DATA_SOURCE_FETCH_FAILED action', () => {
    expect(actions.getDataSourcesFailed('')).toEqual({
      type: types.DATA_SOURCE_FETCH_FAILED,
      message: '',
    });
  });

  it('getDataSourcesSucceeded should create DATA_SOURCE_FETCH_SUCCEEDED action', () => {
    expect(actions.getDataSourcesSucceeded(0)).toEqual({
      type: types.DATA_SOURCE_FETCH_SUCCEEDED,
      dataSources: 0,
    });
  });

  it('setDefaultDataSource should create rrf/change action', () => {
    expect(actions.setDefaultDataSource(1)).toEqual({
      type: 'rrf/change',
      model: 'user.dataSourceId',
      value: 1,
      silent: false,
      multi: false,
    });
  });

  it('setUserProfileDefaultSetting should create LOGIN_SET_DEFAULT_USER_PROFILE action', () => {
    expect(actions.setUserProfileDefaultSetting('', 1, true)).toEqual({
      type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
      url: '',
      desktopPrimary: 1,
      desktopAlternate: true,
    });
  });

  it('login should create LOGIN_REQUESTED action', () => {
    expect(actions.login('fast', 'srs', 1)).toEqual({
      type: types.LOGIN_REQUESTED,
      userName: 'fast',
      password: 'srs',
      dataSourceId: 1,
    });
  });

  it('loginSucceeded should create LOGIN_SUCCEEDED action', () => {
    expect(actions.loginSucceeded('12345')).toEqual({
      type: types.LOGIN_SUCCEEDED,
      token: '12345',
    });
  });

  it('logout should create LOGIN_SUCCEEDED action', () => {
    expect(actions.logout('12345')).toEqual({
      type: types.LOGOUT_REQUESTED,
      token: '12345',
    });
  });

  it('getMaxLoginRetriesSucceeded should create MAX_LOGIN_RETRIES_FETCH_SUCCEEDED action', () => {
    expect(actions.getMaxLoginRetriesSucceeded(true)).toEqual({
      type: types.MAX_LOGIN_RETRIES_FETCH_SUCCEEDED,
      availableProperty: true,
    });
  });

  it('logoutFailed should create LOGOUT_FAILED action', () => {
    expect(actions.logoutFailed('')).toEqual({
      type: types.LOGOUT_FAILED,
      message: '',
    });
  });
});
