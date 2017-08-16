import configureStoreBase from './index';
import { createReducer, rootSaga } from 'srs/redux/main.redux';

export default function configureStore() {
  const store = configureStoreBase(createReducer, rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('srs/redux/main.redux', () => {
      const replacement = require('srs/redux/main.redux');

      store.replaceReducer(replacement.createReducer());
    });
  }

  return store;
}
