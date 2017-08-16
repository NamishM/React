import { take, put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { getDrawers } from '../api';
import * as types from '../constants/ActionTypes';

export function* bindDrawers() {
  try {
    const drawers = yield call(
      getDrawers,
    );
    yield put(actions.getDrawersSucceeded(drawers));
  } catch (e) {
    yield put(actions.getDrawersFailed(e.message));
  }
}

export function* watchResetRequested() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take([types.DOCUMENTTABS_FILTER_RESET_DEFAULT]);
    yield call(bindDrawers);
    yield put(actions.resetGridsData());
  }
}
