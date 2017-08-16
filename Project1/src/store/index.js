import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { responsiveStoreEnhancer } from 'redux-responsive';
import browserHistory from '../router/browserHistory';
import createOidcMiddleware from 'redux-oidc';
import { userManager } from 'srs/auth/oidc';
import { OIDC_CALLBACKROUTE } from 'srs/auth/constants';

const oidcMiddleware = createOidcMiddleware(userManager, () => true, false, `/${OIDC_CALLBACKROUTE}`);

const sagaMiddleWare = createSagaMiddleware();

// function getDebugSessionKey() {
//   if (window !== 'object') {
//     return null;
//   }
//   // You can write custom logic here!
//   // By default we try to read the key from ?debug_session=<key> in the address bar
//   const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
//   return (matches && matches.length > 0) ? matches[1] : null;
// }

export default function configureStoreBase(createReducer, rootSaga) {
  // A bit esoteric... need to unpack this with comments.
  // http://redux.js.org/docs/api/createStore.html
  const store = createStore(
    createReducer(),
    compose(
      responsiveStoreEnhancer,
      applyMiddleware(
        sagaMiddleWare, // sagas handle async store manipulations
        oidcMiddleware,
        routerMiddleware(browserHistory), // router synchronizes the browser history with store
      ),
      (
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ?
        // ednl: looks like a bug with the parser
        // eslint-disable-next-line
        window.devToolsExtension() : f => f // enable dev tools
      ),
      // persistState(getDebugSessionKey()), // enable saved sessions via http://[url]?debug_session=[key]
    ),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
}
