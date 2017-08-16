/* eslint-disable react/jsx-filename-extension */
// REASON: Need to determine if index.jsx will be recodnized by import syntax.

import React from 'react';
import { Provider } from 'react-redux';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from './browserHistory';
// import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { getLoginSessionEnded } from 'srs/redux/user/actions';
import configureStore from 'srs/store/login.store';
import AppContainer from '../modules/wireframe/containers/AppContainer';
import wireframeLoader from 'srs/modules/wireframe/loader';
import sessionStorageSynch from '../utilities/sessionStorageSynch';
import Logout from 'srs/modules/logout/components/LogoutUI';
import IdentityServerError from 'srs/modules/error/containers/IdentityServerError';
import {
  oidcSessionKey,
} from 'srs/auth/oidc';

const store = configureStore();
const dynamicLoad = wireframeLoader(store);
const history = syncHistoryWithStore(browserHistory, store);

// Adds the authroization header to every API request
// TODO: Reorganize?
// let token = null;
// store.subscribe(() => {
//   const state = store.getState();
//   token = state.login.token.encoded;
// });

// global.superagent.use((request) => {
//   request.header.Authorization = token; // eslint-disable-line no-param-reassign
// });

const authIntercept = require('superagent-intercept')((err, res) => {
  if (!res || res.status === 401) {
    // call log out
    store.dispatch(getLoginSessionEnded());
  }
});

global.superagent.use(authIntercept);

sessionStorageSynch.on('setItem', (data) => {
  const state = store.getState();
  const redirectUri = state.login.identityServerModel.redirectUri === null ?
    null : state.login.identityServerModel.redirectUri;
  if (data.message.name === oidcSessionKey && redirectUri) {
    window.open(redirectUri, '_self');
  } else {
    window.history.back();
  }
});

sessionStorageSynch.on('removeItem', (data) => {
  if (data.message.name === 'handleLogout') {
    store.dispatch(getLoginSessionEnded());
  }
});

export default function () {
  return (
    <Provider store={store}>
      <Router history={history} >
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/login" />
          <Route
            path="/login"
            getComponents={(nextState, cb) => require.ensure(
              [
                '../modules/login',
              ],
              require => dynamicLoad({ nextState, cb, main: () => require('../modules/login') }),
              'login',
            )}
          />
        </Route>
        <Route path="/logout" component={Logout} />
        <Route path="/error" component={IdentityServerError} />
      </Router>
    </Provider>
  );
}
