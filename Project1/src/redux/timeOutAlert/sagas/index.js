// import { takeLatest, delay } from 'redux-saga';
// import * as types from '../constants/ActionTypes';
// import {
//   put,
//   call,
//   take,
// } from 'redux-saga/effects';
// import { getLoginSessionEnded } from '../../user/actions';
// import * as actions from '../actions';
// import { refresh } from '../../user/sagas';

// export function* trackUserTimeOutAlertInput() {
//   const result = yield take([types.TIMEOUTALERT_SESSION_SIGNOUT,
//     types.TIMEOUTALERT_SESSION_CONTINUE,
//     types.TIMEOUTALERT_SESSION_EXPIRED]);
//   const { type } = result;
//   if (type === types.TIMEOUTALERT_SESSION_SIGNOUT) {
//     yield put(getLoginSessionEnded());
//   } else if (type === types.TIMEOUTALERT_SESSION_CONTINUE) {
//     const { refreshAfterTime } = result;
//     yield call(delay, refreshAfterTime * 1000);
//     yield call(refresh, false, true);
//   } else {
//     yield put(actions.sessionTimeOutMessage('Your session has timed out. Please sign in again'));
//     yield put(getLoginSessionEnded());
//   }
// }

// export function* watchforTimeOutAlertPopup() {
//   yield* takeLatest(types.DISPLAY_TIMEOUTALERT, trackUserTimeOutAlertInput);
// }
