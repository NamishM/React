import { put, call, take, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { getNoTaskGridInfo, noTaskGridPatientCheckOut } from '../api';
import * as actions from '../actions';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
import { getFilterCriteria } from '../../chartBinFilter/reducers/chartBinFilter';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import { reduceObjectsToString } from '../../../utilities';

// worker Saga : will be fired on SEARCH_INIT actions\
// TODO: ALMOST Identical to:
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\patientTracking\sagas\index.js
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\noTaskGrid\sagas\index.js
//  C:\SRSUI\TASKING\UI\Mobile\src\redux\appointments\sagas\index.js
//  consolidate!
export function* bindnoTaskgridList(request) {
  try {
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

    const noTaskGridInfo = yield call(
      getNoTaskGridInfo,
      request.page,
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
      actions.getNoTaskGridSucceeded(
        noTaskGridInfo.result,
        noTaskGridInfo.entities,
        noTaskGridInfo.stats,
      ),
    );
  } catch (e) {
    yield put(actions.getNoTaskGridFailed(e.message));
  }
}

export function* watchNoTaskGridRequested() {
  yield* takeLatestWhileAuthenticated(
    types.NO_TASKGRID_FETCH_REQUESTED,
    bindnoTaskgridList,
  );
}
export function* noTaskGridCheckout(request) {
  try {
    const checkoutDetails = yield call(
      noTaskGridPatientCheckOut,
      request,
    );
    if (checkoutDetails) {
      yield put(actions.checkOutPatientSucceded(checkoutDetails));
    } else {
      yield put(actions.checkOutPatientFailed('no record found'));
    }
  } catch (e) {
    yield put(actions.checkOutPatientFailed(e.message));
  }
}

export function* watchForCheckOutActions() {
  yield* takeLatestWhileAuthenticated([
    types.CHECKOUT_ON_NO_TASKGRID_DATA_REQUESTED,
  ], noTaskGridCheckout);
}
// worker saga: will trap NO_TASKGRID_NEXT_PAGE and fire NO_TASKGRID_FETCH_REQUESTED
export function* noTaskGridNextPageFlow() {
  // To avoid duplication of data
  // As NO_TASKGRID api gives result same for page = 0 and page = 1,
  // paging starts from page == 1,
  let oldPage = 1;
  let skipNextPageFlow = false;
  while (true) { // eslint-disable-line no-constant-condition
    yield take([
      types.NO_TASKGRID_NEXT_PAGE,
      CHARTBINFILTER_APPOINTMENT_FILTER,
      CHARTBINFILTER_RESET_GRID,
    ]);

    const criteria = yield select(state => ({
      stats: state.noTaskGrid.stats,
      filters: state.noTaskGrid.filters,
    }));

    if (criteria.stats.totalPages <= 1) {
      if (criteria.filters.page === 0 || criteria.stats.totalPages === 1) {
        skipNextPageFlow = true;
      } else {
        skipNextPageFlow = false;
      }
    }
    // restrict paging
    if (!skipNextPageFlow && (oldPage !== criteria.filters.page || oldPage === 1)) {
      yield put(
        actions.getNoTaskGridData(
          criteria.filters.page === 0 ? 1 : criteria.filters.page,
        ),
      );
      oldPage = criteria.filters.page === 0 ? 1 : criteria.filters.page;
    } else {
      skipNextPageFlow = false;
      yield put(actions.skipNoTaskGridNextDataFlow());
    }
  }
}
