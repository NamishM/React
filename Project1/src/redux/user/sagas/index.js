import {
  takeLatest,
  buffers,
  delay,
} from 'redux-saga';
import { push } from 'react-router-redux';
import getTime from 'date-fns/get_time';
import {
  take,
  put,
  call,
  fork,
  select,
  actionChannel,
  race,
  flush,
  cancel,
} from 'redux-saga/effects';
import {
  getDataSource,
  getUserProfile,
  getAvailableProperty,
} from '../api';
import {
  getLoggedInStatus,
  // getUserProfileSettings,
} from '../reducers/login';
import { getPaths } from '../../location/reducers';
import {
  LOGIN_SESSION_REMOTE_RESTORED,
  LOGOUT_SESSION_REMOTE_ENDED,
  LOGOUT_REQUESTED,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
  DATA_SOURCE_FETCH_REQUESTED,
  GET_OIDC_USER_SUCCESS,
  GET_OIDC_USER_FAILED,
  GET_OIDC_USER_EXPIRED,
  GET_OIDC_FROM_EHR_SUCCESS,
} from '../constants/ActionTypes';
import {
  TIMEOUTALERT_REMOTE_SESSION_EXPIRING,
  TIMEOUTALERT_SESSION_CONTINUE,
  TIMEOUTALERT_SESSION_SIGNOUT,
  TIMEOUTALERT_SESSION_EXPIRED,
} from '../../timeOutAlert/constants/ActionTypes';
// import * as locationtypes from '../../location/constants/ActionTypes';
import * as actions from '../actions';
import {
  displayTimeOutAlert,
  continueSession,
  sessionTimedOut,
  updateCountDownTime,
} from '../../timeOutAlert/actions';
import { userManager } from '../../../auth/oidc';
import { OIDC_CALLBACKROUTE } from '../../../auth/constants';
import {
  USER_EXPIRED,
  USER_EXPIRING,
  USER_FOUND,
} from 'redux-oidc';
import {
  broadcastLogout,
  broadcastOidcTokenUpdate,
  broadcastUserActive,
  broadcastSessionExpiring,
  broadcastSessionContinue,
} from '../storage';
import { IDLE_ACTIVE, IDLE_INACTIVE } from '../../idle/constants/ActionTypes';

// worker Saga : will be fired on DATA_SOURCE_FETCH_REQUESTED actions
export function* fetchDataSources() {
  try {
    const dataSources = yield call(getDataSource);
    yield put(actions.getDataSourcesSucceeded(dataSources));
    if (dataSources && dataSources[0]) {
      yield put(actions.setDefaultDataSource(dataSources[0].id));
    }
  } catch (e) {
    yield put(actions.getDataSourcesFailed(e.message));
  }
}

export function* configureWithUserSettings(userId) {
  let clinicalSummarySource;
  let desktopPrimary;
  let desktopAlternate;
  let ptDefaultView;
  let iDashUrl;
  let taskingRefreshInterval;
  let canCreateTasks;
  let canDeleteTasks;
  let canUpdateTasks;

  try {
    ({
      clinicalSummarySource,
      desktopPrimary,
      desktopAlternate,
      ptDefaultView,
      taskingRefreshInterval,
      canCreateTasks,
      canDeleteTasks,
      canUpdateTasks,
    } = yield call(getUserProfile, userId));

    // iDash cannot be configured via context.
    // Replace context dynamically for now.
    iDashUrl = clinicalSummarySource.replace(
      /\/page\/([a-zA-Z0-9]*)\//,
      `/page/${global.config.iDashTemplateId}/`,
    );

    // if we're being served over HTTPS, make sure the IDash is upgraded to HTTPS.
    // http://stackoverflow.com/a/414827/402706
    if (location.protocol === 'https:') {
      iDashUrl = iDashUrl.replace(/^http:\/\//i, 'https://');
    }

    yield put(actions.setUserProfileDefaultSetting({
      url: iDashUrl,
      desktopPrimary,
      desktopAlternate,
      ptDefaultView,
      taskingRefreshInterval,
      taskingSettings: {
        canCreateTasks,
        canDeleteTasks,
        canUpdateTasks,
      },
    }));
  } catch (e) {
    yield put(actions.setUserProfileDefaultSetting({
      url: 'about:blank',
      desktopPrimary: 1,
      desktopAlternate: 2,
      ptDefaultView: 1,
      taskingRefreshInterval: 0,
      taskingSettings: {
        canCreateTasks: false,
        canDeleteTasks: false,
        canUpdateTasks: false,
      },
    }));
  }

  return {
    iDashUrl,
    desktopPrimary,
    desktopAlternate,
    ptDefaultView,
    taskingRefreshInterval,
    taskingSettings: {
      canCreateTasks,
      canDeleteTasks,
      canUpdateTasks,
    },
  };
}

/**
 * Causes redirect to Identity Server login page.
 * If the user is redirected with a valid identity token, they won't need to login
 * and will be brought right back with an updated token
 */
export function navigateToLogin() {
  userManager.signinRedirect();
}

/**
 * Removes the user token from local storage and redirects to idSvr logout endpoint
 */
export function performLogout() {
  global.sessionStorage.removeItem('searchParams');
  global.sessionStorage.removeItem('chartBinFilter');
  userManager.signoutRedirect();
}

/*
  Alternatively you may use takeLatest
  Do not allow concurrent fetches of user, If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run
*/
export function* watchDataSourceRequested() {
  yield* takeLatest(DATA_SOURCE_FETCH_REQUESTED, fetchDataSources);
}

export function* _watchLogout() {
  const payload = yield take([
    LOGOUT_REQUESTED,
    LOGIN_FAILED,
    LOGOUT_SESSION_REMOTE_ENDED,
  ]);
  return payload;
}

export function* watchForUserExpired() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take([
      USER_EXPIRING,
    ]);

    const { userFound } = yield race({
      userFound: take(USER_FOUND), // we got a new token
      userExpired: take(USER_EXPIRED), // the token/session is dead
      timeExpired: call(delay, 2500), // give up if renew takes too long.
    });

    if (!userFound) { // no user, only recourse is to go back to Identity Server.
      yield call(navigateToLogin);
    }
  }
}

export function* _countdownUserTimeout(expirationTime) {
  let remainingSeconds = 0;

  do {
    remainingSeconds = Math.floor((expirationTime - getTime(new Date())) / 1000);
    yield put(updateCountDownTime(remainingSeconds));
    yield call(delay, 1000);
  } while (remainingSeconds > 0);

  yield put(sessionTimedOut());
}

export function* watchForExpiring() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // either:
    const action = yield take([
      IDLE_INACTIVE, // this tab will timeout from inactivity
      TIMEOUTALERT_REMOTE_SESSION_EXPIRING, // or another tab will
    ]);

    const countdownTime = global.config.timeOutPopUpDisplyBefore * 1000; // milliseconds

    // time we've already gone past (this can happen when IOS sleeps and wakes the browser)
    let remainder = 0;
    // Only broadcast if we are the source of the timeout event.
    if (action.type === IDLE_INACTIVE) {
      // timeSinceLastAction is already greater
      // than the countDownTime and the allowable Idle Time.
      if (action.timeSinceLastAction > countdownTime + global.config.userIsIdleTimeout) {
        yield put(actions.logout());
        return;
      }

      // compute the difference between the time since last action and the
      // timeout. Subtract this difference from the popup time
      remainder = action.timeSinceLastAction - global.config.userIsIdleTimeout;
      yield call(broadcastSessionExpiring, action.statusChanged - remainder);
    }

    const countdownTask = yield fork(
      _countdownUserTimeout,
      (action.statusChanged + countdownTime) - remainder,
    );

    // display the timeout dialogue
    yield put(displayTimeOutAlert());

    // Wait for an appropriate response from the user
    const { type } = yield take([
      LOGIN_SESSION_REMOTE_RESTORED, // user continued from another tab
      TIMEOUTALERT_SESSION_CONTINUE, // user clicked continue on this tab
      TIMEOUTALERT_SESSION_SIGNOUT, // user chose to sign out
      TIMEOUTALERT_SESSION_EXPIRED, // alert expired (auto logout)
    ]);

    yield cancel(countdownTask);

    switch (type) {
      case TIMEOUTALERT_SESSION_CONTINUE:
        // continue our session
        yield put(continueSession());
        // tell other tabs to continue
        yield call(broadcastOidcTokenUpdate);
        break;
      case LOGIN_SESSION_REMOTE_RESTORED:
        // continue our session
        yield put(continueSession());
        break;
      default:
        yield put(actions.logout());
        break;
    }
  }
}

/**
 * Handles Logout actions
 * @export
 */
export function* watchForLogout() {
  while (true) { // eslint-disable-line no-constant-condition
    const { type } = yield* _watchLogout();
    if (type === LOGOUT_REQUESTED || type === LOGOUT_SESSION_REMOTE_ENDED) {
      yield put(actions.logoutSucceeded());

      if (type === LOGOUT_REQUESTED) {
        yield call(broadcastLogout);
      }

      yield call(performLogout);
    }
  }
}

/**
 * Fetches 'N' if tasking is disabled for the user and 'Y' if it is enabled.
 *
 * @export
 * @param {any} userId The user security id
 * @returns
 */
export function* fetchEnableTaskingStatusSetting(userId) {
  let isTaskingEnabled = false;
  try {
    [{ propertyValue: isTaskingEnabled }] = yield call(getAvailableProperty, userId);
    isTaskingEnabled = (isTaskingEnabled || '').toLowerCase() === 'y';
    yield put(actions.getEnableTaskingStatusSucceeded(isTaskingEnabled));
  } catch (e) {
    yield put(actions.getEnableTaskingStatusFailed(e.message));
  }
  return { isTaskingEnabled };
}

/**
 * Navigates the user to their preferred default view
 *
 * @export
 * @param {string} sub The user ID
 */
export function* navigateToUserPreference({ ptDefaultView, isTaskingEnabled }) {
  if (ptDefaultView === 1 && isTaskingEnabled) {
    yield put(push('/tasking/appointment'));
  } else {
    yield put(push('/desktop/appointment'));
  }
}

/**
 * The main login workflow
 *
 * @export
 */
export function* loginFlow() {
  // We can't trap redux-oidc/USER_X actions consistently due to saga vs middleware race condition.
  // Therefore we perform a check ourselves to look for active user session on page load
  // and fire the GET_OIDC.. actions
  while (true) { // eslint-disable-line no-constant-condition
    const result = yield take([
      GET_OIDC_USER_SUCCESS,
      GET_OIDC_USER_FAILED,
      GET_OIDC_USER_EXPIRED,
      GET_OIDC_FROM_EHR_SUCCESS,
    ]);

    const { currentPath, basename } = yield select(getPaths);
    let ptDefaultView = null;
    let isTaskingEnabled = null;

    switch (result.type) {
      case GET_OIDC_FROM_EHR_SUCCESS:
        yield call(configureWithUserSettings, result.userId);
        yield call(fetchEnableTaskingStatusSetting, result.userId);
        yield put(actions.loginSucceeded());
        break;
      case GET_OIDC_USER_SUCCESS:
        // separate tasks
        yield fork(watchForExpiring);
        yield fork(watchForUserExpired);
        yield fork(watchForLogout);

        // Get user preferences
        [
          { ptDefaultView },
          { isTaskingEnabled },
        ] = yield [
          call(configureWithUserSettings, result.user.profile.sub),
          call(fetchEnableTaskingStatusSetting, result.user.profile.sub),
        ];

        if (currentPath.toLowerCase() === '/' ||
            currentPath.toLowerCase() === OIDC_CALLBACKROUTE ||
            currentPath.toLowerCase() === basename.toLowerCase()
        ) {
          if (currentPath === OIDC_CALLBACKROUTE) {
            yield call(broadcastOidcTokenUpdate);
          }

          yield call(navigateToUserPreference, { ptDefaultView, isTaskingEnabled });
        }

        // Tell other tabs we're here in case they're showing the logout timer.
        yield call(broadcastSessionContinue);
        // todo: Perhaps decode result.user.identity_token, check identity expiration
        //       If that not set to expire yet than refresh.
        //       Not immediately necessary while we're keeping token timeouts synced

        yield put(actions.loginSucceeded());

        break;
      case GET_OIDC_USER_FAILED:
        yield call(navigateToLogin);
        break;
      case GET_OIDC_USER_EXPIRED:
      default:
        // todo: Do we need this broadcast here?
        yield call(broadcastLogout);
        yield call(performLogout);
        break;
    }
  }
}

export function* synchUserActivity() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take([IDLE_ACTIVE]);
    yield call(broadcastUserActive);
  }
}

// Commenting out WatchRedirect and navigateToDesktop b/c we're redirecting to IdentityServer
// for login so won't have the users desktopPrimary setting available on redirect back.
// TODO: For deep-linking support, perhaps we should support tracking what URL the user visited
// before they were redirected for login; or see if we can pass a redirectUrl to IdSvr that
// will come back
// export function* navigateToDesktop() {
//   const { desktopPrimary } = yield select(getUserProfileSettings);
//   const { currentPath, basename } = yield select(getPaths);
//   const { isLoggedIn } = yield select(getLoggedInStatus);
//   if (
//     isLoggedIn &&
//     (
//       currentPath.toLowerCase() === '/' ||
//       currentPath.toLowerCase() === 'login' ||
//       currentPath.toLowerCase() === basename.toLowerCase()
//     )
//   ) {
//     yield put(desktopPrimary === 2 ? push('chart') : push('desktop'));
//   }
// }
// export function* watchRedirectFromDesktop() {
//   yield* takeLatest(locationtypes.LOCATION_CHANGE, navigateToDesktop);
// }
//-----


/**
 * Private method to pull an item off the channel and pass it to a handler
 *
 * @export
 * @param {any} channel The queue of accumulated redux actions
 * @param {any} handler The handler that should get the action
 */
export function* _watchChannel(channel, handler) {
  const payload = yield take(channel);
  yield call(handler, payload);
}


/**
 * Helper method for collecting redux actions that should only be
 * given to their handler while the user is logged in.
 *
 * @export
 * @param {any} pattern The redux action to watch for
 * @param {any} requestHandler The handler that should receive that action
 */
export function* takeLatestWhileAuthenticated(pattern, requestHandler) {
  // Create a channel (queue) to accumulate redux actions
  // The actionChannel grabs up all matching (by pattern) redux actions until they're pulled
  // off the queue. buffer expanding ensures we never run out of room.
  const requestChan = yield actionChannel(pattern, buffers.expanding());
  try {
    while (true) { // eslint-disable-line no-constant-condition
      // Are we logged in yet?
      const { isLoggedIn } = yield select(getLoggedInStatus);
      // No?
      if (!isLoggedIn) {
        // Wait until we're logged in.
        yield take(LOGIN_SUCCEEDED);
      }
      // Sweet deal! They're finally logged in!
      // Pull an item off the channel/queue. Cancel if we're waiting and a logout
      // request comes in
      yield race({
        watchLogout: call(_watchLogout),
        watchChannel: call(_watchChannel, requestChan, requestHandler),
      });
    }
  } finally {
    // Died so empty the channel of all contents
    yield flush(requestChan);
  }
}
