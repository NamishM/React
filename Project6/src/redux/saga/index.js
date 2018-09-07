import { getItems, getLoginDetails } from '../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as actions from '../actions/ItemsAction';
import * as types from '../constants/ActionTypes';

export function* getCartItems() {
  try {
    const options = yield call(getItems);
    yield put(actions.itemsLoadSuccess(options));
  } catch (e) {
    yield put(actions.itemsLoadFailed(e.message));
  }
}

export function* bindLoginDetails(request) {
  try {
    const options = yield call(getLoginDetails);
    const bool = options.some(
      obj => obj.name.toLowerCase() === request.username.toLowerCase()
        && obj.password === request.password);
    if (bool) {
      yield put(actions.LoginSuccess(options));
      const pathname = '/main';
      yield put(push({
        pathname,
      }));
    } else {
      yield put(actions.LoginFaied('credentials missmatch'));
    }
  } catch (e) {
    yield put(actions.LoginFaied(e.message));
  }
}

export function* watchForLoginRequest() {
  yield takeEvery(types.GET_USER_API, bindLoginDetails);
}

export function* rootSaga() {
  yield [
    watchForLoginRequest(),
    getCartItems(),
  ];
}
