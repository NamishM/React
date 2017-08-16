import configureStoreBase from './index';
import { createReducer, rootSaga } from 'srs/redux/login.redux';

export default function configureStore() {
  return configureStoreBase(createReducer, rootSaga);
}
