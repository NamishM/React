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
  getLoginSessionRestored,
  getLoginSessionEnded,
} from 'srs/redux/user/actions';
import configureStore from 'srs/store/rx.store';
import AppContainer from '../modules/wireframe/containers/AppContainer';
import wireframeLoader from 'srs/modules/wireframe/loader';
import sessionStorageSynch from '../utilities/sessionStorageSynch';
import { storeToken } from 'srs/redux/userRx/storage';
import { select } from 'react-cookie';
import NotFound from 'srs/modules/notFound/components/NotFound';
import {
  rxRoute,
} from './routes';

// TODO: All this token stuff should be re-organized

sessionStorageSynch.synchronizeThisTab();

// The token was passed to us via a cookie
const results = select(/^token$/i);

// Ensure case does not matter
const tokenTmp = results[Object.keys(results)[0]];

// Must be called before the store is configured since
// the store is not aware that a token can come in this way.
// TODO: Refactor into the store.
if (tokenTmp) {
  storeToken({ value: tokenTmp });
}

const store = configureStore();
const dynamicLoad = wireframeLoader(store);
const history = syncHistoryWithStore(browserHistory, store);

// Adds the authroization header to every API request
// TODO: Reorganize?
let token = null;
store.subscribe(() => {
  const state = store.getState();
  token = state.login.token.encoded;
});

global.superagent.use((request) => {
  request.header.Authorization = token; // eslint-disable-line no-param-reassign
});

const authIntercept = require('superagent-intercept')((err, res) => {
  if (
    (!res || res.status === 401) &&
      !(/Token/g.test(res.req.url))) {
    // call log out
    store.dispatch(getLoginSessionEnded());
  }
});

global.superagent.use(authIntercept);

sessionStorageSynch.on('setItem', (data) => {
  if (data.message.name === 'token') {
    store.dispatch(getLoginSessionRestored());
  }
});

sessionStorageSynch.on('removeItem', (data) => {
  if (data.message.name === 'token') {
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
                '../modules/loginRx',
              ],
              require => dynamicLoad({ nextState, cb, main: () => require('../modules/loginRx') }),
              'login',
            )}
          />
          {rxRoute('/rx', dynamicLoad)}
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    </Provider>
  );
}
