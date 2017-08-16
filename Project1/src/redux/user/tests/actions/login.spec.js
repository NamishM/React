
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('login action', () => {
  it('getDataSources should create DATA_SOURCE_FETCH_REQUESTED action', () => {
    expect(actions.getDataSources()).toEqual({
      type: types.DATA_SOURCE_FETCH_REQUESTED,
    });
  });

  it('getDataSourcesSucceeded should create DATA_SOURCE_FETCH_SUCCEEDED action', () => {
    expect(actions.getDataSourcesSucceeded([{ id: 0, name: 'Primary' }])).toEqual({
      type: types.DATA_SOURCE_FETCH_SUCCEEDED,
      dataSources: [{ id: 0, name: 'Primary' }],
    });
  });

  it('setDefaultDataSource should create rrf/change action', () => {
    expect(actions.setDefaultDataSource(0)).toEqual({
      type: 'rrf/change',
      model: 'user.dataSourceId',
      value: 0,
      silent: false,
      multi: false,
    });
  });

  it('getLoginSessionRestored should create LOGIN_SESSION_REMOTE_RESTORED action', () => {
    expect(actions.getLoginSessionRestored()).toEqual({
      type: types.LOGIN_SESSION_REMOTE_RESTORED,
    });
  });

  it('getDataSourcesFailed should create DATA_SOURCE_FETCH_FAILED action', () => {
    expect(actions.getDataSourcesFailed('error')).toEqual({
      type: types.DATA_SOURCE_FETCH_FAILED,
      message: 'error',
    });
  });

  it('getDataSourcesFailed (no message) should create DATA_SOURCE_FETCH_FAILED action', () => {
    expect(actions.getDataSourcesFailed()).toEqual({
      type: types.DATA_SOURCE_FETCH_FAILED,
      message: '',
    });
  });

  it('login should create LOGIN_REQUESTED action', () => {
    expect(actions.login('super', 'srs', 0)).toEqual({
      type: types.LOGIN_REQUESTED,
      userName: 'super',
      password: 'srs',
      dataSourceId: 0,
    });
  });

  it('loginSucceeded should create LOGIN_SUCCEEDED action', () => {
    expect(actions.loginSucceeded()).toEqual({
      type: types.LOGIN_SUCCEEDED,
    });
  });

  it('loginFailed should create LOGIN_FAILED action', () => {
    expect(actions.loginFailed('error', 1)).toEqual({
      type: types.LOGIN_FAILED,
      message: 'error',
      loginAttempts: 1,
    });
  });

  it('loginFailed (no message) should create LOGIN_FAILED action', () => {
    expect(actions.loginFailed()).toEqual({
      type: types.LOGIN_FAILED,
      message: '',
      loginAttempts: 0,
    });
  });

  it('logout should create LOGOUT_REQUESTED action', () => {
    expect(actions.logout()).toEqual({
      type: types.LOGOUT_REQUESTED,
    });
  });

  it('logoutSucceeded should create LOGOUT_SUCCEEDED action', () => {
    expect(actions.logoutSucceeded()).toEqual({
      type: types.LOGOUT_SUCCEEDED,
    });
  });

  it('logoutFailed should create LOGOUT_FAILED action', () => {
    expect(actions.logoutFailed('error')).toEqual({
      type: types.LOGOUT_FAILED,
      message: 'error',
    });
  });

  it('logoutFailed (no message) should create LOGOUT_FAILED action', () => {
    expect(actions.logoutFailed()).toEqual({
      type: types.LOGOUT_FAILED,
      message: '',
    });
  });

  it('getOidcUserSuccess should create GET_OIDC_USER_SUCCESS action', (user = null) => {
    expect(actions.getOidcUserSuccess(user)).toEqual({
      type: types.GET_OIDC_USER_SUCCESS,
      user,
    });
  });

  it('getOidcUserFailed should create GET_OIDC_USER_FAILED action', (message = '') => {
    expect(actions.getOidcUserFailed(message)).toEqual({
      type: types.GET_OIDC_USER_FAILED,
      message,
    });
  });

  it('getOidcUserExpired should create GET_OIDC_USER_EXPIRED action', (user = null) => {
    expect(actions.getOidcUserExpired(user)).toEqual({
      type: types.GET_OIDC_USER_EXPIRED,
      user,
    });
  });

  it('getOidcUserFromEhrSuccess should create GET_OIDC_FROM_EHR_SUCCESS action', (userId = '', accessToken = '') => {
    expect(actions.getOidcUserFromEhrSuccess(userId, accessToken)).toEqual({
      type: types.GET_OIDC_FROM_EHR_SUCCESS,
      userId,
      accessToken,
    });
  });

  it('getOidcUserFromRefreshSuccess should create GET_OIDC_FROM_EHR_REFRESH_SUCCESS action', (accessToken = '') => {
    expect(actions.getOidcUserFromRefreshSuccess(accessToken)).toEqual({
      type: types.GET_OIDC_FROM_EHR_REFRESH_SUCCESS,
      accessToken,
    });
  });

  it('setClinicalSummaryUrl should create LOGIN_SET_IDASH_URL action', () => {
    expect(actions.setUserProfileDefaultSetting({
      url: 'test',
      desktopPrimary: 1,
      desktopAlternate: 2,
      ptDefaultView: 1,
      taskingRefreshInterval: 10,
      taskingSettings: {
        canCreateTasks: true,
        canDeleteTasks: true,
        canUpdateTasks: true,
      },
    })).toEqual({
      type: types.LOGIN_SET_DEFAULT_USER_PROFILE,
      url: 'test',
      desktopPrimary: 1,
      desktopAlternate: 2,
      ptDefaultView: 1,
      taskingRefreshInterval: 10,
      taskingSettings: {
        canCreateTasks: true,
        canDeleteTasks: true,
        canUpdateTasks: true,
      },
    });
  });
  it('viewTasking should create VIEW_TASKING action', () => {
    expect(actions.viewTasking()).toEqual({
      type: types.VIEW_TASKING,
      ptDefaultView: 1,
    });
  });
  it('viewPatientTracking should create VIEW_PATIENT_TRACKING action', () => {
    expect(actions.viewPatientTracking()).toEqual({
      type: types.VIEW_PATIENT_TRACKING,
      ptDefaultView: 2,
    });
  });
  it('getEnableTaskingStatusSucceeded should create GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED action', () => {
    expect(actions.getEnableTaskingStatusSucceeded(true)).toEqual({
      type: types.GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED,
      isTaskingEnabled: true,
    });
  });
  it('getEnableTaskingStatusFailed should create GET_ENABLE_TASKING_FETCH_STATUS_FAILED action', (message = 'error in API Response') => {
    expect(actions.getEnableTaskingStatusFailed('error in API Response')).toEqual({
      type: types.GET_ENABLE_TASKING_FETCH_STATUS_FAILED,
      message,
      isTaskingEnabled: false,
    });
  });
});
