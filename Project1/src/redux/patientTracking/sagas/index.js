import { put, call, take, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { getPatientTrackingInfo } from '../api';
import * as actions from '../actions';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
import { getFilterCriteria } from '../../chartBinFilter/reducers/chartBinFilter';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import { reduceObjectsToString } from '../../../utilities';

// worker Saga : will be fired on SEARCH_INIT actions
// TODO: ALMOST Identical to:
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\patientTracking\sagas\index.js
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\noTaskGrid\sagas\index.js
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\appointments\sagas\index.js
//  consolidate!
export function* bindPatientTrackingList(request) {
  try {
    const orderByColumns = request.sortColumnPrecedence ?
      request.sortColumnPrecedence.map(key => request.sortColumns[key])
      : [];

    let multipleProviderId = '';
    let multipleLocationId = '';
    let multipleRoomId = '';
    let multiplePatientStatusTypeId = '';
    let patientStatusTypeQueryString = 'CurrentPatientStatusTypeID';
    let roomIdQueryString = 'CurrentRoomId';

    // get selected providers, location and date from chartBin Filter.
    const {
      selectedProviders,
      selectedLocations,
      selectedRooms,
      selectedPatientStatusTypes,
      startDate,
      endDate,
    } = yield select(getFilterCriteria);

    multipleProviderId = reduceObjectsToString(selectedProviders, 'value');

    if (selectedLocations && selectedLocations.length > 0) {
      multipleLocationId = `$true,${reduceObjectsToString(selectedLocations, 'value')}`;

      multipleRoomId = reduceObjectsToString(selectedRooms, (obj) => {
        if (obj.value === -1) {
          roomIdQueryString = 'CurrentRoomId-CurrentRoomId:missing';
          return '$true';
        }
        return `${obj.value}`;
      });
    }

    multiplePatientStatusTypeId = reduceObjectsToString(selectedPatientStatusTypes, (obj) => {
      if (obj.value === -1) {
        patientStatusTypeQueryString = 'CurrentPatientStatusTypeID-CurrentPatientStatusTypeID:missing';
        return '$true';
      }
      return `${obj.value}`;
    });

    const patientTrackingInfo = yield call(
      getPatientTrackingInfo,
      request.page,
      orderByColumns,
      startDate,
      endDate,
      multipleProviderId,
      multipleLocationId,
      multipleRoomId,
      multiplePatientStatusTypeId,
      patientStatusTypeQueryString,
      roomIdQueryString,
    );

    yield put(
      actions.getPatientTrackingSucceeded(
        patientTrackingInfo.result,
        patientTrackingInfo.entities,
        patientTrackingInfo.stats,
      ),
    );
  } catch (e) {
    yield put(actions.getPatientTrackingFailed(e.message));
  }
}

export function* watchPatientTrackingRequested() {
  yield* takeLatestWhileAuthenticated(
    types.PATIENT_TRACKING_FETCH_REQUESTED,
    bindPatientTrackingList,
  );
}
// worker saga: will trap PATIENT_TRACKING_NEXT_PAGE and fire PATIENT_TRACKING_FETCH_REQUESTED
export function* patientTrackingNextPageFlow() {
  // To avoid duplication of data
  // As PATIENT_TRACKING api gives result same for page = 0 and page = 1,
  // paging starts from page == 1,
  let oldPage = 1;
  let skipNextPageFlow = false;
  while (true) { // eslint-disable-line no-constant-condition
    yield take([
      types.PATIENT_TRACKING_NEXT_PAGE,
      CHARTBINFILTER_APPOINTMENT_FILTER,
      CHARTBINFILTER_RESET_GRID,
    ]);

    const {
      stats: { totalPages },
      filters: { page },
      sort: {
        columns,
        precedence,
      },
    } = yield select(
      state => ({
        filters: state.patientTracking.filters,
        sort: state.patientTracking.sort,
        stats: state.patientTracking.stats,
      }),
    );

    if (totalPages <= 1) {
      if (page === 0 || totalPages === 1) {
        skipNextPageFlow = true;
      } else {
        skipNextPageFlow = false;
      }
    }

    // restrict paging
    if (!skipNextPageFlow && (oldPage !== page || oldPage === 1)) {
      yield put(
        actions.getPatientTrackingsData(
          page === 0 ? 1 : page,
          columns,
          precedence,
        ),
      );
      oldPage = page === 0 ? 1 : page;
    } else {
      skipNextPageFlow = false;
      yield put(actions.skipPatientTrackingNextDataFlow());
    }
  }
}
