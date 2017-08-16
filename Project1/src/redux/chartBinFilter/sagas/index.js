import { put, call, select } from 'redux-saga/effects';
import * as actions from '../actions';
import {
  getProviders,
  getLocations,
  getRooms,
  getAppointmentFilterInfo,
  getPatientStatusTypes,
} from '../api';
import { getUserId } from '../../user/reducers/login';

export function* bindProviders() {
  try {
    const providers = yield call(
      getProviders,
    );
    yield put(actions.getProvidersSucceeded(providers));
  } catch (e) {
    yield put(actions.getProvidersFailed(e.message));
  }
}

export function* bindLocations() {
  try {
    const locations = yield call(
      getLocations,
    );
    yield put(actions.getLocationsSucceeded(locations));
  } catch (e) {
    yield put(actions.getLocationsFailed(e.message));
  }
}

export function* bindRooms() {
  try {
    let rooms = yield call(
      getRooms,
    );
    // To get encounters with no room, we've added one value to dropdown i.e. No Room
    rooms = [
      {
        description: 'No Room',
        id: -1,
        locationID: -1,
      },
      ...rooms,
    ];
    yield put(actions.getRoomsSucceeded(rooms));
  } catch (e) {
    yield put(actions.getRoomsFailed(e.message));
  }
}

export function* bindPatientStatusTypes() {
  try {
    let patientStatusTypes = yield call(
      getPatientStatusTypes,
    );
    // To get encounters with status = Null, we've added one value to dropdown i.e. No Status
    patientStatusTypes = [
      {
        description: 'No Status',
        patientTrackingStatusId: -1,
        subTypeId: -1,
        color: 'no color',
      },
      ...patientStatusTypes,
    ];
    yield put(actions.getPatientStatusTypesSucceeded(patientStatusTypes));
  } catch (e) {
    yield put(actions.getPatientStatusTypesFailed(e.message));
  }
}

export function* bindInitialDataRequired({
  providerId,
  locationId,
} = {}) {
  const isDefaultLoaded = yield select(
    state => state.chartBinFilter.isDefaultLoaded,
  );
  if (!isDefaultLoaded) {
    const { userId } = yield select(getUserId);

    const [{ defaults: {
      doctors: defaultProviders,
      locations: defaultLocations,
    } }] = yield call(
      getAppointmentFilterInfo,
      userId,
    );

    yield [
      call(bindProviders),
      call(bindLocations),
      call(bindRooms),
      call(bindPatientStatusTypes),
    ];
    if (!(providerId || locationId)) {
      yield put(actions.defaultChartBinSelection(
        defaultProviders,
        defaultLocations,
      ));
    }
  }
}
