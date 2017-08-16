
import {
  call, put, take,
  fork,
  select,
  cancel,
} from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { push } from 'react-router-redux';
import {
  getDataSource,
  getUserProfile,
  getAvailableProperty,
} from '../../api';
import {
  fetchDataSources,
  configureWithUserSettings,
  loginFlow,
  _countdownUserTimeout,
  // navigateToLogin,
  // performLogout,
  navigateToLogin,
  performLogout,
  watchForExpiring,
  watchForUserExpired,
  watchForLogout,
  fetchEnableTaskingStatusSetting,
  navigateToUserPreference,
  // navigateToDesktop,
} from '../../sagas';
import { getPaths } from '../../../location/reducers';
// import { push } from 'react-router-redux';
import {
  broadcastLogout,
  broadcastOidcTokenUpdate,
  broadcastSessionExpiring,
  broadcastSessionContinue,
} from '../../storage';
import * as actions from '../../actions';
// import * as signoutPopupTypes from '../../../timeOutAlert/constants/ActionTypes';
import { displayTimeOutAlert, continueSession } from '../../../timeOutAlert/actions';

import {
  TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
  TIMEOUTALERT_SESSION_CONTINUE,
  TIMEOUTALERT_SESSION_SIGNOUT,
  TIMEOUTALERT_SESSION_EXPIRED,
} from '../../../timeOutAlert/constants/ActionTypes';
import { IDLE_INACTIVE } from '../../../idle/constants/ActionTypes';
import * as types from '../../constants/ActionTypes';
import { OIDC_CALLBACKROUTE } from '../../../../auth/constants';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('login sagas', () => {
  describe('fetchDataSources', () => {
    it(`should call our getDataSource API.
        When successful, it should then call the success action`, () => {
        const generator = fetchDataSources();
        const dataSources = [{ id: 0, name: 'Primary' }];

        // move to the first yield statement
        let next = generator.next();

        // First we should fetch data sources
        expect(next.value).toEqual(call(getDataSource));

        // Mock setting the value to skip the API call
        next = generator.next(dataSources);

        // Second we should be calling getDataSourcesSucceeded
        expect(next.value).toEqual(put(actions.getDataSourcesSucceeded(dataSources)));
      });

    it(`should call our getDataSource API.
        When it fails, it should call the failure action`, () => {
        const generator = fetchDataSources();
        const msg = 'Data Sources Fetch Failed';

        // move to the first yield statement
        let next = generator.next();

        // First, we should fetch the data sources
        expect(next.value).toEqual(call(getDataSource));

        // Mock the failure of our API call
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getDataSourcesFailed(msg)));
      });
  });

  describe('fetchEnableTaskingStatusSetting', () => {
    describe('fetchEnableTaskingStatusSetting success with "Y"', () => {
      const gen = fetchEnableTaskingStatusSetting(27);

      it('should get the available property for tasking from the API', () => {
        expect(gen.next().value).toEqual(call(getAvailableProperty, 27));
      });

      it('should call getEnableTaskingStatusSucceeded', () => {
        expect(gen.next([{ propertyValue: 'Y' }]).value)
          .toEqual(put(actions.getEnableTaskingStatusSucceeded(true)));
      });

      it('should end by returning the isTaskingEnabled', () => {
        const lastIteration = gen.next();
        expect(lastIteration.done).toEqual(true);
        expect(lastIteration.value).toEqual({ isTaskingEnabled: true });
      });
    });

    describe('fetchEnableTaskingStatusSetting success with "N"', () => {
      const gen = fetchEnableTaskingStatusSetting(27);

      it('should get the available property for tasking from the API', () => {
        expect(gen.next().value).toEqual(call(getAvailableProperty, 27));
      });

      it('should call getEnableTaskingStatusSucceeded', () => {
        expect(gen.next([{ propertyValue: 'N' }]).value)
          .toEqual(put(actions.getEnableTaskingStatusSucceeded(false)));
      });

      it('should end by returning the isTaskingEnabled', () => {
        const lastIteration = gen.next();
        expect(lastIteration.done).toEqual(true);
        expect(lastIteration.value).toEqual({ isTaskingEnabled: false });
      });
    });

    describe('fetchEnableTaskingStatusSetting error', () => {
      const gen = fetchEnableTaskingStatusSetting(27);

      it('should get the available property for tasking from the API', () => {
        expect(gen.next().value).toEqual(call(getAvailableProperty, 27));
      });

      it('should throw an error', () => {
        expect(gen.throw(new Error('failed')).value)
          .toEqual(put(actions.getEnableTaskingStatusFailed('failed')));
      });

      it('should end by returning the isTaskingEnabled == "N"', () => {
        const lastIteration = gen.next();
        expect(lastIteration.done).toEqual(true);
        expect(lastIteration.value).toEqual({ isTaskingEnabled: false });
      });
    });
  });

  describe('configureWithUserSettings', () => {
    it(`should call our getUserProfile.
        When successful, it should call the success action`, () => {
        global.config = {
          iDashTemplateId: 'mobile',
        };
        global.location = {
          protocol: 'http:',
        };
        const generator = configureWithUserSettings(27);
        const userProfileSetting = {
          clinicalSummarySource: 'http://summit-dev02/page/general/default.aspx?',
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 1,
          taskingRefreshInterval: 10,
          canCreateTasks: true,
          canDeleteTasks: true,
          canUpdateTasks: true,
        };
        const url2 = 'http://summit-dev02/page/mobile/default.aspx?';
        // move to the first yield statement
        let next = generator.next();

        expect(next.value).toEqual(call(getUserProfile, 27));

        next = generator.next(userProfileSetting);

        expect(next.value).toEqual(put(actions.setUserProfileDefaultSetting({
          url: url2,
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 1,
          taskingRefreshInterval: 10,
          taskingSettings: {
            canCreateTasks: true,
            canDeleteTasks: true,
            canUpdateTasks: true,
          },
        })));

        const lastIteration = generator.next();
        expect(lastIteration.done).toEqual(true);
        expect(lastIteration.value).toEqual({
          iDashUrl: url2,
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

    it(`should call our getUserProfile
        It should upgrade the URL to https if the IDash URL is http and the site is https.`, () => {
        global.config = {
          iDashTemplateId: 'mobile',
        };

        Object.defineProperty(window.location, 'protocol', {
          writable: true,
          value: 'https:',
        });

        const generator = configureWithUserSettings(27);
        const userProfileSetting = {
          clinicalSummarySource: 'http://summit-dev02/page/general/default.aspx?',
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 1,
          taskingRefreshInterval: 10,
          canCreateTasks: true,
          canDeleteTasks: true,
          canUpdateTasks: true,
        };
        const url2 = 'https://summit-dev02/page/mobile/default.aspx?';
        // move to the first yield statement
        let next = generator.next();

        expect(next.value).toEqual(call(getUserProfile, 27));

        next = generator.next(userProfileSetting);

        expect(next.value).toEqual(put(actions.setUserProfileDefaultSetting({
          url: url2,
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 1,
          taskingRefreshInterval: 10,
          taskingSettings: {
            canCreateTasks: true,
            canDeleteTasks: true,
            canUpdateTasks: true,
          },
        })));
      });

    // TODO... shouldn't failure be handled by a fail action???
    it(`should call our getUserProfile
        When it fails, it should call the success action with default values`, () => {
        global.config = {
          iDashTemplateId: 'mobile',
        };
        const generator = configureWithUserSettings(27);
        const url2 = 'about:blank';
        // move to the first yield statement
        let next = generator.next();

        expect(next.value).toEqual(call(getUserProfile, 27));

        next = generator.throw(new Error());

        expect(next.value).toEqual(put(actions.setUserProfileDefaultSetting({
          url: url2,
          desktopPrimary: 1,
          desktopAlternate: 2,
          ptDefaultView: 1,
          taskingRefreshInterval: 0,
          taskingSettings: {
            canCreateTasks: false,
            canDeleteTasks: false,
            canUpdateTasks: false,
          },
        })));
      });
  });

  describe('loginFlow', () => {
    const oidcActions = [
      types.GET_OIDC_USER_SUCCESS, types.GET_OIDC_USER_FAILED,
      types.GET_OIDC_USER_EXPIRED, types.GET_OIDC_FROM_EHR_SUCCESS];

    describe('oidc user not found at all', () => {
      const gen = loginFlow();
      it('should wait for OIDC Token Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next({ type: types.GET_OIDC_USER_FAILED }).value).toEqual(select(getPaths));
      });

      it('should navigate to login when GET_OIDC_USER_FAILED action type', () => {
        expect(gen.next({ currentPath: '/', basename: '' }).value).toEqual(call(navigateToLogin));
      });
    });

    describe('oidc token loaded from EHR', () => {
      const gen = loginFlow();

      const result = {
        type: types.GET_OIDC_FROM_EHR_SUCCESS,
        userId: '27',
        accessToken: 'sd',
      };

      it('should wait for OIDC Token and User  Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next(result).value).toEqual(select(getPaths));
      });

      it('should call configureWithUserSettings', () => {
        expect(gen.next({ currentPath: '/', basename: '' }).value).toEqual(call(configureWithUserSettings, '27'));
      });

      it('should call fetchEnableTaskingStatusSetting', () => {
        expect(gen.next().value).toEqual(call(fetchEnableTaskingStatusSetting, '27'));
      });

      it('should call loginSucceeded', () => {
        expect(gen.next().value).toEqual(put(actions.loginSucceeded()));
      });
    });

    describe('oidc user expired', () => {
      const gen = loginFlow();
      it('should wait for OIDC Token Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next({ type: types.GET_OIDC_USER_EXPIRED }).value).toEqual(select(getPaths));
      });

      it('should broadcast that the logout occurred for the GET_OIDC_USER_EXPIRED action type', () => {
        expect(gen.next({ currentPath: '/', basename: '' }).value).toEqual(call(broadcastLogout));
      });

      it('should logout the current browser for the GET_OIDC_USER_EXPIRED action type', () => {
        expect(gen.next().value).toEqual(call(performLogout));
      });
    });

    describe('oidc user found and not expired', () => {
      const gen = loginFlow();

      const result = {
        type: types.GET_OIDC_USER_SUCCESS,
        user: {
          profile: {
            sub: 27,
          },
        },
      };

      it('should wait for OIDC Token Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next(result).value).toEqual(select(getPaths));
      });

      it('should start watching for user expiring', () => {
        expect(gen.next({ currentPath: '/', basename: '' }).value).toEqual(fork(watchForExpiring));
      });

      it('should start watching for user expired', () => {
        expect(gen.next().value).toEqual(fork(watchForUserExpired));
      });

      it('should start watching for user logged out', () => {
        expect(gen.next().value).toEqual(fork(watchForLogout));
      });

      it('should get IDash settings and Tasking Settings', () => {
        expect(gen.next().value).toEqual([
          call(configureWithUserSettings, 27),
          call(fetchEnableTaskingStatusSetting, 27),
        ]);
      });

      it('should call navigateToUserPreference', () => {
        expect(gen.next([{ ptDefaultView: 1 }, { isTaskingEnabled: true }]).value)
          .toEqual(call(navigateToUserPreference, { ptDefaultView: 1, isTaskingEnabled: true }));
      });

      it('should broadcast that the user has logged in to the other tabs', () => {
        expect(gen.next().value).toEqual(call(broadcastSessionContinue));
      });

      it('should call loginSucceeded', () => {
        expect(gen.next().value).toEqual(put(actions.loginSucceeded()));
      });
    });

    describe('oidc user found and not expired on callback route', () => {
      const gen = loginFlow();

      const result = {
        type: types.GET_OIDC_USER_SUCCESS,
        user: {
          profile: {
            sub: 27,
          },
        },
      };

      it('should wait for OIDC Token Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next(result).value).toEqual(select(getPaths));
      });

      it('should start watching for user expiring', () => {
        expect(gen.next({ currentPath: OIDC_CALLBACKROUTE, basename: '' }).value).toEqual(fork(watchForExpiring));
      });

      it('should start watching for user expired', () => {
        expect(gen.next().value).toEqual(fork(watchForUserExpired));
      });

      it('should start watching for user logged out', () => {
        expect(gen.next().value).toEqual(fork(watchForLogout));
      });

      it('should get IDash settings and Tasking Settings', () => {
        expect(gen.next().value).toEqual([
          call(configureWithUserSettings, 27),
          call(fetchEnableTaskingStatusSetting, 27),
        ]);
      });

      it('should call broadcastOidcTokenUpdate', () => {
        expect(gen.next([{ ptDefaultView: 1 }, { isTaskingEnabled: true }]).value)
          .toEqual(call(broadcastOidcTokenUpdate));
      });

      it('should call navigateToUserPreference', () => {
        expect(gen.next().value)
          .toEqual(call(navigateToUserPreference, { ptDefaultView: 1, isTaskingEnabled: true }));
      });

      it('should broadcast that the user has logged in to the other tabs', () => {
        expect(gen.next().value).toEqual(call(broadcastSessionContinue));
      });

      it('should call loginSucceeded', () => {
        expect(gen.next().value).toEqual(put(actions.loginSucceeded()));
      });
    });

    describe('oidc user found and not expired on browser refresh', () => {
      const gen = loginFlow();

      const result = {
        type: types.GET_OIDC_USER_SUCCESS,
        user: {
          profile: {
            sub: 27,
          },
        },
      };

      it('should wait for OIDC Token Actions', () => {
        expect(gen.next().value).toEqual(take(oidcActions));
      });

      it('should call getPaths to determine route', () => {
        expect(gen.next(result).value).toEqual(select(getPaths));
      });

      it('should start watching for user expiring', () => {
        expect(gen.next({ currentPath: '/tasking', basename: '' }).value).toEqual(fork(watchForExpiring));
      });

      it('should start watching for user expired', () => {
        expect(gen.next().value).toEqual(fork(watchForUserExpired));
      });

      it('should start watching for user logged out', () => {
        expect(gen.next().value).toEqual(fork(watchForLogout));
      });

      it('should get IDash settings and Tasking Settings', () => {
        expect(gen.next().value).toEqual([
          call(configureWithUserSettings, 27),
          call(fetchEnableTaskingStatusSetting, 27),
        ]);
      });

      it('should broadcast that the user has logged in to the other tabs', () => {
        expect(gen.next([{ ptDefaultView: 1 }, { isTaskingEnabled: true }]).value)
          .toEqual(call(broadcastSessionContinue));
      });

      it('should call loginSucceeded', () => {
        expect(gen.next().value).toEqual(put(actions.loginSucceeded()));
      });
    });
  });

  describe('navigateToUserPreference', () => {
    describe('should navigate to the user\'s preferred destination of Tasking.', () => {
      const gen = navigateToUserPreference({ ptDefaultView: 1, isTaskingEnabled: true });

      it('should navigate to the tasking view', () => {
        expect(gen.next().value)
          .toEqual(put(push('/tasking/appointment')));
      });
    });

    describe('should navigate to the user\'s preferred destination of Tracking.', () => {
      const gen = navigateToUserPreference({ ptDefaultView: 2, isTaskingEnabled: true });

      it('should navigate to the tracking view', () => {
        expect(gen.next().value)
          .toEqual(put(push('/desktop/appointment')));
      });
    });

    describe('should navigate to Tracking even if the user prefers Tasking since Tasking is disabled.', () => {
      const gen = navigateToUserPreference({ ptDefaultView: 1, isTaskingEnabled: false });

      it('should navigate to the tracking view', () => {
        expect(gen.next([]).value)
          .toEqual(put(push('/desktop/appointment')));
      });
    });
  });

  describe('watchForExpiring', () => {
    describe('user continues session from timeout warning due to local timeout', () => {
      const gen = watchForExpiring();
      const mockTask = createMockTask();

      it('should wait for USER_EXPIRING action', () => {
        expect(gen.next().value).toEqual(take([
          IDLE_INACTIVE,
          TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
        ]));
      });

      it('should broadcast that a timeout has occurred to the other tabs', () => {
        global.config = {
          timeOutPopUpDisplyBefore: 60,
          userIsIdleTimeout: 5000,
        };
        expect(gen.next({
          type: IDLE_INACTIVE,
          statusChanged: 1497302053411,
          timeSinceLastAction: 5500,
        }).value).toEqual(call(broadcastSessionExpiring, 1497302053411 - 500));
      });

      it('should start the countdown task', () => {
        expect(gen.next().value)
          .toEqual(fork(_countdownUserTimeout, (60000 + 1497302053411) - 500));
      });

      it('should display timeout warning passing the remaining time', () => {
        expect(gen.next(mockTask).value).toEqual(put(displayTimeOutAlert()));
      });

      it('should wait for an appropriate action', () => {
        expect(gen.next().value).toEqual(take([
          types.LOGIN_SESSION_REMOTE_RESTORED, // user continued from another tab
          TIMEOUTALERT_SESSION_CONTINUE, // user clicked continue on this tab
          TIMEOUTALERT_SESSION_SIGNOUT, // user chose to sign out
          TIMEOUTALERT_SESSION_EXPIRED, // alert expired (auto logout)
        ]));
      });

      it('should cancel the countdownTask', () => {
        expect(gen.next({
          type: TIMEOUTALERT_SESSION_CONTINUE,
        }).value).toEqual(cancel(mockTask));
      });

      it('should continue based on user input', () => {
        expect(gen.next().value).toEqual(put(continueSession()));
      });

      it('should broadcast to the other tabs to continue', () => {
        expect(gen.next().value).toEqual(call(broadcastOidcTokenUpdate));
      });
    });

    describe('user continues session from timeout warning due to remote timeout', () => {
      const gen = watchForExpiring();
      const mockTask = createMockTask();

      it('should wait for USER_EXPIRING action', () => {
        expect(gen.next().value).toEqual(take([
          IDLE_INACTIVE,
          TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
        ]));
      });

      it('should start the countdown task', () => {
        global.config = {
          timeOutPopUpDisplyBefore: 60,
        };
        expect(gen.next({
          type: TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
          statusChanged: 1497302053411,
        }).value).toEqual(fork(_countdownUserTimeout, 60000 + 1497302053411));
      });

      it('should display timeout timeout warning passing the remaining time', () => {
        expect(gen.next(mockTask).value).toEqual(put(displayTimeOutAlert()));
      });

      it('should wait for an appropriate action', () => {
        expect(gen.next().value).toEqual(take([
          types.LOGIN_SESSION_REMOTE_RESTORED, // user continued from another tab
          TIMEOUTALERT_SESSION_CONTINUE, // user clicked continue on this tab
          TIMEOUTALERT_SESSION_SIGNOUT, // user chose to sign out
          TIMEOUTALERT_SESSION_EXPIRED, // alert expired (auto logout)
        ]));
      });

      it('should cancel the countdownTask', () => {
        expect(gen.next({
          type: TIMEOUTALERT_SESSION_CONTINUE,
        }).value).toEqual(cancel(mockTask));
      });

      it('should continue based on user input', () => {
        expect(gen.next().value).toEqual(put(continueSession()));
      });

      it('should broadcast to the other tabs to continue', () => {
        expect(gen.next().value).toEqual(call(broadcastOidcTokenUpdate));
      });
    });

    describe('user fails to continue session from timeout warning due to remote timeout', () => {
      const gen = watchForExpiring();
      const mockTask = createMockTask();

      it('should wait for USER_EXPIRING action', () => {
        expect(gen.next().value).toEqual(take([
          IDLE_INACTIVE,
          TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
        ]));
      });

      it('should start the countdown task', () => {
        global.config = {
          timeOutPopUpDisplyBefore: 60,
        };
        expect(gen.next({
          type: TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
          statusChanged: 1497302053411,
        }).value).toEqual(fork(_countdownUserTimeout, 60000 + 1497302053411));
      });

      it('should display timeout timeout warning passing the remaining time', () => {
        global.config = {
          timeOutPopUpDisplyBefore: 60,
        };
        expect(gen.next(mockTask).value).toEqual(put(displayTimeOutAlert()));
      });

      it('should wait for an appropriate action', () => {
        expect(gen.next().value).toEqual(take([
          types.LOGIN_SESSION_REMOTE_RESTORED, // user continued from another tab
          TIMEOUTALERT_SESSION_CONTINUE, // user clicked continue on this tab
          TIMEOUTALERT_SESSION_SIGNOUT, // user chose to sign out
          TIMEOUTALERT_SESSION_EXPIRED, // alert expired (auto logout)
        ]));
      });

      it('should cancel the countdownTask', () => {
        expect(gen.next({
          type: types.TIMEOUTALERT_SESSION_EXPIRED,
        }).value).toEqual(cancel(mockTask));
      });

      it(`should logout on ${TIMEOUTALERT_SESSION_EXPIRED}`, () => {
        expect(gen.next().value).toEqual(put(actions.logout()));
      });
    });

    describe('user continues session from different tab', () => {
      const gen = watchForExpiring();
      const mockTask = createMockTask();
      it('should wait for USER_EXPIRING action', () => {
        expect(gen.next().value).toEqual(take([
          IDLE_INACTIVE,
          TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
        ]));
      });

      it('should start the countdown task', () => {
        global.config = {
          timeOutPopUpDisplyBefore: 60,
        };
        expect(gen.next({
          type: TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
          statusChanged: 1497302053411,
        }).value).toEqual(fork(_countdownUserTimeout, 60000 + 1497302053411));
      });

      it('should display timeout timeout warning passing the remaining time', () => {
        expect(gen.next(mockTask).value).toEqual(put(displayTimeOutAlert()));
      });


      it('should wait for an appropriate action', () => {
        expect(gen.next().value).toEqual(take([
          types.LOGIN_SESSION_REMOTE_RESTORED, // user continued from another tab
          TIMEOUTALERT_SESSION_CONTINUE, // user clicked continue on this tab
          TIMEOUTALERT_SESSION_SIGNOUT, // user chose to sign out
          TIMEOUTALERT_SESSION_EXPIRED, // alert expired (auto logout)
        ]));
      });

      it('should cancel the countdownTask', () => {
        expect(gen.next({
          type: types.LOGIN_SESSION_REMOTE_RESTORED,
        }).value).toEqual(cancel(mockTask));
      });

      it('session should continue', () => {
        expect(gen.next().value).toEqual(put(continueSession()));
      });
    });
  });

  // note: leaving this test here as this saga may come back
  // describe('navigateToDesktop', () => {
  //   const generator = navigateToDesktop();
  //   it('First, we should fetch currentPath', () => {
  //     expect(generator.next().value).toEqual(select(getUserProfileSettings));
  //   });

  //   it('First, we should fetch currentPath', () => {
  //     expect(generator.next({
  //       desktopPrimary: 1,
  //     }).value).toEqual(select(getPaths));
  //   });

  //   it('Second, we should get current loggedin Status', () => {
  //     // Mock setting the select for getPaths.
  //     expect(generator.next({
  //       currentPath: 'login',
  //     }).value).toEqual(select(getLoggedInStatus));
  //   });

  //   it('Last, we should be navigating to the desktop', () => {
  //     // Mock setting the select for getPaths.
  //     expect(generator.next({
  //       isLoggedIn: true,
  //     }).value).toEqual(put(push('desktop')));
  //   });
  // });
});

