import { put, call, take, select } from 'redux-saga/effects';
import { generateActionTypes } from '../constants/ActionTypes';
import { getAppointmentInfo } from '../api';
import { generateActions } from '../actions';
import { getFilterCriteria } from '../../chartBinFilter/reducers/chartBinFilter';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import { reduceObjectsToString } from '../../../utilities';

export const generateSagas = (prefix) => {
  const actions = generateActions(prefix);
  const types = generateActionTypes(prefix);

  // worker Saga : will be fired on APPOINTMENT_FETCH_REQUESTED actions
  // TODO: ALMOST Identical to:
  //  C:\SRSUI\TASKING\UI\Mobile\src\redux\patientTracking\sagas\index.js
  //  C:\SRSUI\TASKING\UI\Mobile\src\redux\noTaskGrid\sagas\index.js
  //  C:\SRSUI\TASKING\UI\Mobile\src\redux\appointments\sagas\index.js
  //  consolidate!
  function* bindAppointmentList(request) {
    try {
      const orderByColumns = request.sortColumnPrecedence ?
        request.sortColumnPrecedence.map(key => request.sortColumns[key])
        : [];

      let multipleProviderId = '';
      let multipleLocationId = '';
      let multipleRoomId = '';
      let multiplePatientStatusTypeId = '';
      let patientStatusTypeQueryString = 'CurrentPatientStatusTypeID';
      let roomIdQueryString = 'RoomId';


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
            roomIdQueryString = 'RoomId-RoomId:missing';
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

      const appointments = yield call(
        getAppointmentInfo,
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
        request.personId,
        prefix,
      );
      yield put(
        actions.getAppointmentSucceeded(
          appointments.result,
          appointments.entities,
          appointments.stats,
        ),
      );
    } catch (e) {
      yield put(actions.getAppointmentFailed(e.message));
    }
  }

  function* watchAppointmentsRequested() {
    yield* takeLatestWhileAuthenticated(types.APPOINTMENT_FETCH_REQUESTED, bindAppointmentList);
  }

  // worker saga: will trap APPOINTMENT_NEXT_PAGE and fire APPOINTMENT_FETCH_REQUESTED
  function* nextPageFlow() {
    // To avoid duplication of data
    // As appointment api gives result same for page = 0 and page = 1,
    // paging starts from page == 1,
    let oldPage = 1;
    let skipNextPageFlow = false;
    while (true) { // eslint-disable-line no-constant-condition
      yield take([
        types.APPOINTMENT_NEXT_PAGE,
        types.APPOINTMENT_SORT_COLUMN,
        CHARTBINFILTER_APPOINTMENT_FILTER,
        CHARTBINFILTER_RESET_GRID,
      ]);

      const criteria = yield select(
        state => ({
          filters: state[prefix.toLowerCase()].filters,
          sort: state[prefix.toLowerCase()].sort,
          stats: state[prefix.toLowerCase()].stats,
          personId: state.selectedChart.personId,
        }),
      );
      if (criteria.stats.totalPages <= 1) {
        if (criteria.filters.page === 0 || criteria.stats.totalPages === 1) {
          skipNextPageFlow = true;
        } else {
          skipNextPageFlow = false;
        }
      }
      // This flow is also for Encounters . So we have to check personId.
      if (prefix.toLowerCase() === 'encounters' && !criteria.personId) {
        skipNextPageFlow = true;
      }
      if (criteria.stats.totalResults === 1) {
        skipNextPageFlow = false;
      }
      // restrict paging
      if (!skipNextPageFlow && (oldPage !== criteria.filters.page || oldPage === 1)) {
        yield put(
          actions.getAppointmentsData(
            criteria.filters.page === 0 ? 1 : criteria.filters.page,
            criteria.sort.columns,
            criteria.sort.precedence,
            criteria.filters.startDate,
            criteria.filters.endDate,
            criteria.personId ? criteria.personId : criteria.filters.personId,
          ),
        );
        oldPage = criteria.filters.page === 0 ? 1 : criteria.filters.page;
      } else {
        skipNextPageFlow = false;
        yield put(actions.skipAppointmentNextDataFlow());
      }
    }
  }

  return {
    bindAppointmentList,
    watchAppointmentsRequested,
    nextPageFlow,
  };
};
