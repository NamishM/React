// This file named 'default.js' because weird stuff happens if it's named 'index.js'
import combineReducers from 'redux/lib/combineReducers';
import browser from './browser';
import user from './user';
import timeOutAlert from './timeOutAlert';
import idle from './idle';
import settings from './settings';
// import reduceReducers from 'reduce-reducers';

export const createReducer = () =>
  combineReducers({
    ...browser.Reducers,
    ...user.Reducers,
    ...timeOutAlert.Reducers,
    ...idle.Reducers,
    ...settings.Reducers,
  });

export function* rootSaga() {
  yield [
    user.Sagas.watchDataSourceRequested(),
  ];
}
