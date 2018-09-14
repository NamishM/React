import { getEmpDetails, createEmpDetails } from '../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/EmpAction';
import * as types from '../constants/ActionTypes';

export const delay = ms => new Promise(res => setTimeout(res, ms));

export function* bindEmployeeDetails() {
  try {
    const options = yield call(getEmpDetails);
    yield put(actions.EmployeeSuccess(options));
  } catch (e) {
    yield put(actions.EmployeeFailed(e.message));
  }
}

export function* employeeCreation(request) {
  try {
    const options = yield call(createEmpDetails, request);
    yield put(actions.EmployeeSuccess(options));
  } catch (e) {
    yield put(actions.EmployeeFailed(e.message));
  }
}

export function* watchForEmployeeCreation() {
  yield takeEvery(types.ON_EMP_CREATION, employeeCreation);
}

/*
export function* deleteEmployee(request) {
  try {
    // const options = yield call(getPlanetsItem, request.url);
    // yield put(actions.planetsLoadSuccess(options));
  } catch (e) {
    // yield put(actions.planetsLoadFailed(e.message));
  }
}

export function* watchForEmployeeDeletion() {
  yield takeEvery(types.ON_EMP_DELETION, deleteEmployee);
} */

export function* rootSaga() {
  yield [
    bindEmployeeDetails(),
    watchForEmployeeCreation(),
    // watchForEmployeeDeletion(),
  ];
}
