import { getItems, getLoginDetails, getPlanetsItem } from '../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/ItemsAction';
import * as types from '../constants/ActionTypes';
import browserHistory from 'src/router/browserHistory';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* bindLoginDetails(request: any) {
  try {
    const options = yield call(getLoginDetails);
    const bool = options.some(
      (obj: any) => obj.name.toLowerCase() === request.username.toLowerCase()
        && obj.password === request.password);
    if (bool) {
      yield put(actions.LoginSuccess());
      yield call(delay, 500);
      browserHistory.push('/main');
    } else {
      yield put(actions.LoginFaied());
    }
  } catch (e) {
    yield put(actions.LoginFaied());
  }
}

export function* watchForLoginSuccess() {
  yield takeEvery(types.GET_USER_API, bindLoginDetails);
}

export function* bindGetItems() {
  try {
    const options = yield call(getItems);
    yield put(actions.itemsLoadSuccess(options));
  } catch (e) {
    yield put(actions.itemsLoadFailed(e.message));
  }
}

export function* watchForLoginRequest() {
  yield takeEvery(types.LOGIN_SUCCESS, bindGetItems);
}

export function* bindPlanetsItems(request: any) {
  try {
    const options = yield call(getPlanetsItem, request.url);
    yield put(actions.planetsLoadSuccess(options));
  } catch (e) {
    yield put(actions.planetsLoadFailed(e.message));
  }
}

export function* watchForPlanetRequest() {
  yield takeEvery(types.GET_PLANETS, bindPlanetsItems);
}

export function* rootSaga() {
  yield [
    watchForLoginRequest(),
    watchForLoginSuccess(),
    watchForPlanetRequest(),
  ];
}
