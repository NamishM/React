/* eslint-disable react/jsx-filename-extension */
// REASON: Need to determine if index.jsx will be recodnized by import syntax.

import React from 'react';
import { Provider } from 'react-redux';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from './browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  onActiveSilent,
  onActive,
} from 'srs/redux/idle/actions';
import {
  getLoginSessionRestored,
  getLoginSessionEnded,
  getOidcUserSuccess,
  getOidcUserFailed,
  getOidcUserExpired,
  getOidcUserFromEhrSuccess,
  getOidcUserFromRefreshSuccess,
} from 'srs/redux/user/actions';
import configureStore from 'srs/store/main.store';
import AppContainer from '../modules/wireframe/containers/AppContainer';
import wireframeLoader from 'srs/modules/wireframe/loader';
import sessionStorageSynch from '../utilities/sessionStorageSynch';
import { receiveOidcTokenUpdate } from 'srs/redux/user/storage';
import NotFound from 'srs/modules/notFound/components/NotFound';
import Error from 'srs/modules/error/components/ErrorUI';
import {
  patientEncounterRoute,
  desktopRoute,
  taskingRoute,
  documentRoute,
  rxRoute,
  taskEditorRoute,
} from './routes';
import OidcCallback from 'srs/auth/components/OidcCallback';
import { OidcProvider, userFound } from 'redux-oidc';
import {
  userManager,
  oidcSessionKey,
  isLoadedWithAccessToken,
  ehrParams,
} from 'srs/auth/oidc';
import { OIDC_CALLBACKROUTE } from 'srs/auth/constants';
import { sessionRemoteExpiring, continueSession } from 'srs/redux/timeOutAlert/actions';
import { getAccessTokenMobileOrEhr } from 'srs/redux/user/reducers/login';

const isTokenCallbackRoute = window.location.pathname.indexOf(`/${OIDC_CALLBACKROUTE}`) >= 0;
const tabsCount = sessionStorageSynch.getTabsCount();

// If new tab is opened, we want sessionStorage to get sync'ed so it gets the token from other tab.
// If the page is loaded as result authenticating and redirecting back from IdentityServer, then
// synchronize sessionStorage but ignore the oidcSessionKey from other tab; we'll get that from url.
if (isTokenCallbackRoute) {
  sessionStorageSynch.synchronizeThisTab([oidcSessionKey]);
} else if (tabsCount > 1) {
  sessionStorageSynch.synchronizeThisTab();
}

const store = configureStore();
const dynamicLoad = wireframeLoader(store);
const history = syncHistoryWithStore(browserHistory, store);

// Adds the authorization header to every API request
let token = null;
store.subscribe(() => {
  const state = store.getState();
  token = getAccessTokenMobileOrEhr(state);
});

global.superagent.use((request) => {
  request.header.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
});

const authIntercept = require('superagent-intercept')((err, res) => {
  if (!res || res.status === 401) {
    store.dispatch(getLoginSessionEnded());
  }
});

global.superagent.use(authIntercept);

// The user is active
store.dispatch(onActive());

sessionStorageSynch.on('userIsActive', () => store.dispatch(onActiveSilent()));

sessionStorageSynch.on('sessionExpiring', ({ message }) => store.dispatch(sessionRemoteExpiring(message)));

sessionStorageSynch.on('sessionContinue', () => store.dispatch(continueSession()));

sessionStorageSynch.on('setItem', (data) => {
  // Handle remote tab oidcToken refresh
  if (data.message.name === oidcSessionKey) {
    const newToken = JSON.parse(data.message.value);
    receiveOidcTokenUpdate(newToken);
    store.dispatch(userFound(newToken));
    store.dispatch(getLoginSessionRestored());
  }
});

sessionStorageSynch.on('removeItem', (data) => {
  if (data.message.name === 'handleLogout') {
    store.dispatch(getLoginSessionEnded());
  }
});

/* The tab can receive tokens in one of 5 ways:
 * 1. From Url when redirected back from IdentityServer.
 *    Either during login or navigating to IdentityServer with active login session cookie.
 * 2. From another tab through, sync'd through localStorage on page load.
 * 3. From sessionStorage (last tab closed and then re-opened without closing browser).
 * 4. From EHR thick client in queryString.
 * 5. RefreshToken from EHR thick client in javascript executed in browser control.
 *
 * - For #1, when at the callback route (/login),
 *   the app will look for token passed in url after hashmark
 * - For #2, when app loads, it will wait for sessionStorage to get synchronized from another
 *   already open tab.  We'll wait a short period and if session wasn't synchronized, the app will
 *   call oidc library's getUser() which will try to get token from sessionStorage.
 * - For #3, if no other tabs, just call getUser to try and load user from sessionStorage.
 * - For #4, if token in qString (not hashmark),
 *   dispatch user found action and disable inactivity checks since we're running in EHR.
 * - For #5, with OidcUpdate object will be attached to global window so winform can call into it
 *   Winform will create a script tag with the new token, then call OIDCUpdate to let the page know
 */

if (isLoadedWithAccessToken) {
  // todo: can we validate the token by calling identity server's checkSession
  // endpoint with the access token?
  store.dispatch(
    getOidcUserFromEhrSuccess(ehrParams.userId, ehrParams.access_token),
  );

  // if loading from EHR, we need to setup a handler for it to call into with a refresh token
  window.oidcUpdate = (newToken) => {
    store.dispatch(
      getOidcUserFromRefreshSuccess(newToken),
    );

    // The ehr will insert a script that will fire window.oidcUpdate so it can dispatch
    // the new the token. After dispatch, remove the element
    const tokenScriptEle = document.getElementById('oidcUpdate');
    if (tokenScriptEle) {
      tokenScriptEle.parentNode.removeChild(tokenScriptEle);
    }
  };
} else {
  // 'shouldDispatchUserFound' param is used to dispatch redux-oidc USER_FOUND.
  // This is necessary if the oidc token is being set after redux-oidc middleware
  // fails to find it (i.e. on token restoring from other tabs session).
  // Similar to this issue https://github.com/maxmantz/redux-oidc/issues/6
  const oidcUserLoad = (shouldDispatchUserFound) => {
    userManager.getUser().then((user) => {
      if (user != null) {
        if (user.expired) {
          store.dispatch(getOidcUserExpired(user));
        } else {
          if (shouldDispatchUserFound) {
            store.dispatch(userFound(user));
          }
          store.dispatch(getOidcUserSuccess(user));
        }
      } else {
        store.dispatch(getOidcUserFailed('No user found.'));
      }
    }).catch((e) => {
      store.dispatch(getOidcUserFailed(e.message));
    });
  };

  // for all routes other than token callback route, dispatch the OIDC events
  if (!isTokenCallbackRoute) {
    if (tabsCount > 1) {
      // setup a promise to give sessionSynch a chance to run
      const sessionRestorePromise = new Promise((resolve) => {
        sessionStorageSynch.once('sessionRestored', (data) => {
          resolve({ mode: 'sessionRestored', data });
        });
        setTimeout(() => {
          resolve({ mode: 'sessionRestoredFailed' });
        }, 1500);
      });

      sessionRestorePromise.then((data) => {
        if (data.mode === 'sessionRestored') {
          oidcUserLoad(true);
        } else {
          oidcUserLoad();
        }
      });
    } else {
      oidcUserLoad();
    }
  }
}

export default function () {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <Router history={history} >
          <Route path={`/${OIDC_CALLBACKROUTE}`} component={OidcCallback} />
          <Route path="/" component={AppContainer}>
            { /* <IndexRedirect to="/login" /> */ }
            {desktopRoute('/desktop/appointment', dynamicLoad)}
            {desktopRoute('/desktop/chart', dynamicLoad)}
            {taskingRoute('/tasking/appointment', dynamicLoad)}
            {taskingRoute('/tasking/chart', dynamicLoad)}
            {patientEncounterRoute('/patientEncounter', dynamicLoad)}
            {documentRoute('/document', dynamicLoad)}
            {rxRoute('/rx', dynamicLoad)}
            {taskEditorRoute('/taskEditor', dynamicLoad)}
            <Route
              path="/appRegistration"
              getComponents={(nextState, cb) => require.ensure(
                [
                  '../modules/appRegistration',
                ],
                require => dynamicLoad({ nextState, cb, main: () => require('../modules/appRegistration') }),
                'appRegistration',
              )}
            />
          </Route>
          <Route path="/SRSUI/Mobile" component={AppContainer}>
            <IndexRedirect to="/desktop/appointment" />
          </Route>
          <Route path="/error" component={Error} />
          <Route path="*" component={NotFound} />
        </Router>
      </OidcProvider>
    </Provider>
  );
}
