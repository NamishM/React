import { put, call, take, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { getPatientInfo, getLatestEncounterDate } from '../api';
import * as actions from '../actions';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
// import {
//   push,
// } from 'react-router-redux';

// worker Saga : will be fired on SEARCH_INIT actions

export function* bindPatientList(request) {
  try {
    // Update the URL
    // yield put(push({
    //   pathname: 'chart',
    //   query: {
    //     fname: request.fname.trim(),
    //     lname: request.lname.trim(),
    //     dob: request.dob,
    //     page: request.page,
    //   },
    // }));
    let orderByColumns = [];
    if (request.sortColumnPrecedence === undefined || request.sortColumns === undefined) {
      const criteria = yield select(
        state => ({
          sortColumnPrecedence: state.patientSearchData.sort.precedence,
          sortColumns: state.patientSearchData.sort.columns,
        }),
      );
      orderByColumns = criteria.sortColumnPrecedence ?
        criteria.sortColumnPrecedence.map(key => criteria.sortColumns[key])
        : [];
    } else {
      orderByColumns = request.sortColumnPrecedence ?
        request.sortColumnPrecedence.map(key => request.sortColumns[key])
        : [];
    }
    const patients = yield call(
      getPatientInfo,
      request.searchCriteria,
      request.page,
      orderByColumns,
    );
    // As TotalResults is removed from Demographic API
    // So to check whether we have reached at last page or to check result count is zero
    // then there should not be any next page flow.
    if (patients &&
        patients.result &&
        patients.result.demographics &&
        patients.result.demographics.length > 0) {
      yield put(
        actions.onSearchSucceeded(
          patients.result,
          patients.entities,
          patients.stats,
        ),
      );
    } else {
      yield put(actions.lastPageArrived());
    }
  } catch (e) {
    yield put(actions.onSearchFailed(e.message));
  }
}

export function* latestEncounter(request) {
  try {
    const encounters = yield call(getLatestEncounterDate, request.id);
    yield put(actions.getLatestEncounterSucceeded(encounters.length > 0 ?
      encounters[0] : {}));
  } catch (e) {
    yield put(actions.getLatestEncounterFailed(e.message));
  }
}

export function* watchPatientRequested() {
  yield* takeLatestWhileAuthenticated(types.SEARCH_INIT, bindPatientList);
}

export function* watchPatientSelection() {
  yield* takeLatestWhileAuthenticated(types.PATIENT_SELECTION, latestEncounter);
}

// worker saga: will trap GET_NEXT_PATIENT_DATA and fire bindPatientList
export function* getNextPageFlow() {
  // As next page flow in the Patient search grid will be called after Search Init call.
  // And in the Search init we are fetching page = 1.
  // So this next page flow should start from page = 2.

  while (true) { // eslint-disable-line no-constant-condition
    yield take([types.GET_NEXT_PATIENT_DATA]);

    const criteria = yield select(
      state => ({
        page: state.patientSearchData.filters.page,
        searchCriteria: state.searchCriteria,
        sortColumnPrecedence: state.patientSearchData.sort.precedence,
        sortColumns: state.patientSearchData.sort.columns,
      }),
    );
    // from page = 2
    if (criteria.page > 1) {
      yield call(
        bindPatientList,
        criteria,
      );
    } else {
      yield put(actions.skipPatientNextDataFlow());
    }
  }
}

// worker saga: will trap SORT_COLUMN and fire bindPatientList
export function* sortFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take([types.SORT_COLUMN]);

    const criteria = yield select(
      state => ({
        page: 1,
        searchCriteria: state.searchCriteria,
        sortColumnPrecedence: state.patientSearchData.sort.precedence,
        sortColumns: state.patientSearchData.sort.columns,
      }),
    );
    yield call(
      bindPatientList,
      criteria,
    );
  }
}
