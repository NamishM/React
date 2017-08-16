import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createReducer, rootSaga } from 'srs/redux/rx.redux';
// import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { responsiveStoreEnhancer } from 'redux-responsive';
import browserHistory from '../router/browserHistory';
// import { initialLoad } from '../modules/wireframe/actions';

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

export default function configureStore() {
  // A bit esoteric... need to unpack this with comments.
  // http://redux.js.org/docs/api/createStore.html

  const store = createStore(
    createReducer(),
    compose(
      responsiveStoreEnhancer,
      applyMiddleware(
        sagaMiddleWare, // sagas handle async store manipulations
        routerMiddleware(browserHistory), // router synchronizes the browser history with store
      ),
      (
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ?
        // eslint-disable-next-line
        window.devToolsExtension() : f => f // enable dev tools
      ),
      // persistState(getDebugSessionKey()), // enable saved sessions via http://[url]?debug_session=[key]
    ),
  );

  store.asyncSagas = {};
  store.asyncReducers = {};
  sagaMiddleWare.run(rootSaga);
  // state.browser is set by redux-responsive (responsiveStoreEnhancer)
  // after store is created we can use browser's state to setup the wireframe state
  // const browserState = store.getState().browser;
  // store.dispatch(initialLoad(browserState.mediaType));

  return store;
}

export function injectAsyncReducer(store, asyncReducers, newAsyncSagas) {
  const localStore = store; // avoid reassigning arguments[]

  localStore.asyncReducers = {
    ...localStore.asyncReducers,
    ...asyncReducers,
  };

  if (newAsyncSagas) {
    // sagas can only run one time.
    Object.keys(newAsyncSagas).forEach((prop) => {
      if ({}.hasOwnProperty.call(newAsyncSagas, prop)) {
        if (!localStore.asyncSagas[prop]) {
          sagaMiddleWare.run(newAsyncSagas[prop]);
          localStore.asyncSagas[prop] = true;
        }
      }
    });
  }

  localStore.replaceReducer(createReducer(localStore.asyncReducers));
}
