import { takeLatest, buffers, delay } from 'redux-saga';
import {
  push,
  goBack,
} from 'react-router-redux';
import {
  take,
  put,
  call,
  fork,
  cancel,
  cancelled,
  select,
  actionChannel,
  race,
  flush,
} from 'redux-saga/effects';
import {
  getDataSource,
  login,
  refresh as apiRefresh,
  logout as apiLogout,
  getIDashUrl,
  getAvailableProperty,
} from '../api';
import {
  getToken,
  getLoginCounts,
  getLoggedInStatus,
  getUserProfileSettings,
  getUserTimeOut,
} from '../reducers/login';
import { getPaths } from '../../location/reducers';
import * as types from '../constants/ActionTypes';
import * as locationtypes from '../../location/constants/ActionTypes';
import * as actions from '../actions';
import { storeToken, removeToken, retrieveToken } from '../storage';
import jwtDecode from 'jwt-decode';
import { actions as modelAction } from 'react-redux-form';
import { displayTimeOutAlert } from '../../timeOutAlert/actions';

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

export function* configureIDash(userId) {
  try {
    const userProfileSetting = yield call(getIDashUrl, userId);
    let iDashUrl = userProfileSetting[0].clinicalSummarySource;
    const desktopPrimary = userProfileSetting[0].desktopPrimary;
    const desktopAlternate = userProfileSetting[0].desktopAlternate;
    // iDash cannot be configured via context.
    // Replace context dynamically for now.
    iDashUrl = iDashUrl.replace(
      /\/page\/([a-zA-Z0-9]*)\//,
      `/page/${global.config.iDashTemplateId}/`,
    );

    yield put(actions.setUserProfileDefaultSetting(iDashUrl, desktopPrimary, desktopAlternate));
  } catch (e) {
    yield put(actions.setUserProfileDefaultSetting('about:blank', 1, 2));
  }
}

export function* navigateToPrevious() {
  const { desktopPrimary } = yield select(getUserProfileSettings);
  const { currentPath, previousPath, basename } = yield select(getPaths);

  if (
    previousPath &&
    previousPath !== '/' &&
    previousPath.toLowerCase() !== basename.toLowerCase() &&
    currentPath.toLowerCase() !== previousPath.toLowerCase()
  ) {
    yield put(goBack());
  } else {
    yield put(desktopPrimary === '2' ? push('chart') : push('desktop'));
  }
}

export function* navigateToLogin() {
  const { currentPath } = yield select(getPaths);
  if (currentPath !== 'login') {
    yield put(push('login'));
  }
}

export function* loginUser(userName, password, dataSourceId) {
  let encoded = null;
  try {
    encoded = yield call(login, userName, password, dataSourceId);
  } catch (e) {
    const { loginAttempts, maxRetries } = yield select(getLoginCounts);
    if (loginAttempts + 1 >= maxRetries) {
      yield put(actions.userLocked());
    } else {
      yield put(actions.loginFailed(e.message, loginAttempts + 1));
    }
    yield call(navigateToLogin);
  }
  return encoded;
}

export function* authorize(userName, password, dataSourceId) {
  try {
    const encoded = yield call(loginUser, userName, password, dataSourceId);
    if (encoded) {
      const decoded = jwtDecode(encoded);

      const reference = yield call(storeToken, { value: encoded });

      yield put(actions.loginSucceeded({ decoded, encoded, reference }));

      yield call(configureIDash, decoded.userId);

      yield call(navigateToPrevious);
    }
  } catch (e) {
    // Don't show error as a result of a task cancelation.
    yield put(actions.loginFailed(e.message));
    yield call(navigateToLogin);
  } finally {
    if (yield cancelled()) {
      // Handle cancellation
      yield call(navigateToLogin);
    }
    // Reset after successful logged In after Loin Requested.
    yield put(modelAction.change('user.password', ''));
  }
}

/**
 * Retrieves the token from storage and optionally refreshes it on the server
 * and optionally checks it for expiration.
 * @param {boolean} [localLogin=false] - indicates if the token on the server should be refreshed
 * @param {boolean} [skipExpCheck=false] - indicates if the token should be checked for expiration
 * @return {boolean} - true or false for successful and unsuccessful tokens respectively
 */
export function* refresh(localLogin = false, skipExpCheck = false) {
  try {
    let { value: encoded } = yield call(retrieveToken);
    if (encoded) {
      const decoded = jwtDecode(encoded);

      // FROM: https://github.com/auth0/node-jsonwebtoken/blob/31625b5c01f1ac5d63580543867bd75dd3671704/index.js#L147
      // `clockTolerance`: number of second to tolerate when checking
      // the `nbf` and `exp` claims, to deal with small clock differences among different servers
      const clockTolerance = 0;
      if (!skipExpCheck && Math.floor(Date.now() / 1000) >= decoded.exp + (clockTolerance || 0)) {
        return false;
      }

      if (!localLogin) {
        encoded = yield call(apiRefresh, encoded);
      }

      if (encoded) {
        if (!localLogin) {
          yield call(storeToken, { value: encoded });
        }
        yield put(actions.loginSucceeded({ decoded, encoded }));
        yield call(configureIDash, decoded.userId);
        return true;
      }
      // Should this silently fail too?
      // Reasons to stay:
      // 1. If an active user is logged out by an admin on the server then they should be notified.
      // Reasonse to remove:
      // 1. If an active user refreshes the page or opens a new tab, he could simply
      // be presented with the login page. He may still want to know why.
      yield put(actions.loginFailed('Your session is no longer valid'));
    }
  } catch (e) {
    // silently fail for now.
  }
  return false;
}

export function* logout(localLogout = false) {
  try {
    yield call(removeToken);

    const { jti } = yield select(getToken);

    if (jti && !localLogout) {
      yield call(apiLogout, jti);
    }

    yield put(actions.logoutSucceeded());
  } catch (e) {
    yield put(actions.logoutFailed(e.message));
  }
}

/*
  Alternatively you may use takeLatest

  Do not allow concurrent fetches of user, If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run
*/
export function* watchDataSourceRequested() {
  yield* takeLatest(types.DATA_SOURCE_FETCH_REQUESTED, fetchDataSources);
}

export function* _watchLogout() {
  const payload = yield take([
    types.LOGOUT_REQUESTED,
    types.LOGIN_FAILED,
    types.LOGOUT_SESSION_REMOTE_ENDED,
  ]);
  return payload;
}

/**
 * Main login routine for controlling the flow of login.
 * Controls when the user can login, logout, or when a login comes from state restoration
 * @export
 */
export function* loginFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    try {
      // Attempt to refresh the token
      const success = yield call(refresh);

      let authTask = null;
      let isTokenDead = false;
      if (!success) {
        // If unsuccessful wait for a login
        yield call(navigateToLogin);
        const result = yield take([types.LOGIN_REQUESTED, types.LOGIN_SESSION_REMOTE_RESTORED]);
        const { type } = result;
        if (type === types.LOGIN_REQUESTED) {
          const { userName, password, dataSourceId } = result;
          authTask = yield fork(authorize, userName, password, dataSourceId);
        } else if (yield call(refresh, true)) { // TODO: Trap an expired token.
          yield call(navigateToPrevious);
        } else {
          yield put(actions.loginFailed(''));
          isTokenDead = true;
        }
      }
      if (!isTokenDead) {
        // Wait for a login / logout
        const { type } = yield* _watchLogout();

        // if login is inprogress
        if (authTask) {
          // cancel it
          yield cancel(authTask);
        }

        // invoke logout routine
        if (type === types.LOGOUT_REQUESTED) {
          yield call(logout);
        } else if (type === types.LOGOUT_SESSION_REMOTE_ENDED) {
          yield call(logout, true);
        }
      }
    } catch (e) {
      yield put(actions.loginFailed('An error occurred, please try again'));
      yield call(navigateToLogin);
    }
  }
}

export function* fetchmaxLoginRetries() {
  try {
    const availableProperty = yield call(getAvailableProperty);
    yield put(actions.getMaxLoginRetriesSucceeded(availableProperty));
  } catch (e) {
    yield put(actions.getMaxLoginRetriesFailed(e.message));
  }
}

export function* maxLoginRetries() {
  // yield* takeLatest(types.MAX_LOGIN_RETRIES_FETCH_REQUESTED, fetchmaxLoginRetries);
}

export function* navigateToDesktop() {
  const { desktopPrimary } = yield select(getUserProfileSettings);
  const { currentPath, basename } = yield select(getPaths);
  const { isLoggedIn } = yield select(getLoggedInStatus);
  if (
    isLoggedIn &&
    (
      currentPath.toLowerCase() === '/' ||
      currentPath.toLowerCase() === 'login' ||
      currentPath.toLowerCase() === basename.toLowerCase()
    )
  ) {
    yield put(desktopPrimary === '2' ? push('chart') : push('desktop'));
  }
}

export function* watchRedirectFromDesktop() {
  yield* takeLatest(locationtypes.LOCATION_CHANGE, navigateToDesktop);
}

export function* _watchChannel(channel, handler) {
  const payload = yield take(channel);
  yield call(handler, payload);
}

export function* startCountDownForTimeOutAlert() {
  const { expiryTime, issuedTime } = yield select(getUserTimeOut);
  const delayTime = expiryTime - issuedTime;
  // expected delaytime should not less than 60 second.
  let popupTimeinSeconds = global.config.timeOutPopUpDisplyBefore;
  if (popupTimeinSeconds >= delayTime) {
    popupTimeinSeconds = 30;
  }
  const popupDisplayAfter = delayTime - popupTimeinSeconds;
  yield call(delay, popupDisplayAfter * 1000);

  yield put(displayTimeOutAlert(popupTimeinSeconds));
}

export function* watchforLoginSuccess() {
  yield* takeLatest(types.LOGIN_SUCCEEDED, startCountDownForTimeOutAlert);
}

export function* takeLatestWhileAuthenticated(pattern, requestHandler) {
  // 1- Create a channel for to queue request actions
  const requestChan = yield actionChannel(pattern, buffers.expanding());
  try {
    while (true) { // eslint-disable-line no-constant-condition
      const { isLoggedIn } = yield select(getLoggedInStatus);

      if (!isLoggedIn) {
        yield take(types.LOGIN_SUCCEEDED);
      }
      // Pull an item off the channel. Cancel if we're waiting and a logout
      // request comes in
      yield race({
        watchLogout: call(_watchLogout),
        watchChannel: call(_watchChannel, requestChan, requestHandler),
      });
    }
  } finally {
    // Died so empty the channel
    yield flush(requestChan);
  }
}
