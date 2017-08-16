import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { patientAlertReadById, patientAlertSaveUpdate, patientAlertDelete } from '../api';
import * as types from '../../patientAlert/constants/ActionTypes';
import { SELECTED_CHART_SET_CHART } from '../../selectedChart/constants/ActionTypes';

export function* getPatientAlertDetails({ chart: { personId } }) {
  try {
    const patientAlert = yield call(patientAlertReadById, personId);
    yield put(actions.patientAlertReadSucceded(patientAlert));
  } catch (e) {
    yield put(actions.patientAlertReadFailed(e.message, personId));
  }
}

export function* watchForPatientSelect() {
  yield* takeLatest(SELECTED_CHART_SET_CHART,
    getPatientAlertDetails);
}

export function* saveUpdatePatientAlert(request) {
  try {
    const patientAlert = yield call(patientAlertSaveUpdate, request);
    yield put(actions.patientAlertSaveUpdateSucceded(patientAlert));
  } catch (e) {
    yield put(actions.patientAlertSaveUpdateFailed(e.message));
  }
}

export function* watchForSaveUpdateAlert() {
  yield* takeLatest(types.PATIENTALERT_SAVEUPDATE, saveUpdatePatientAlert);
}

export function* deletePatientAlert(request) {
  try {
    yield call(patientAlertDelete, request.personId);
    yield put(actions.patientAlertDeleteSucceded());
  } catch (e) {
    yield put(actions.patientAlertDeleteFailed(e.message));
  }
}

export function* watchForDeleteAlert() {
  yield* takeLatest(types.PATIENTALERT_DELETE, deletePatientAlert);
}
