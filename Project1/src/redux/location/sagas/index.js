import { takeLatestWhileAuthenticated } from '../../user/sagas';
import {
  LOCATION_CHANGE,
  LOCATION_CHANGE_FULLSCREEN,
} from '../constants/ActionTypes';
import {
  select,
  call,
  put,
} from 'redux-saga/effects';
import {
  clearSelectedChart,
} from '../../../redux/selectedChart/actions';
import {
  getChartBinFilterUrl,
  getFilters,
} from '../../../redux/chartBinFilter/reducers/chartBinFilter';
import {
  filterAppointments,
} from '../../../redux/chartBinFilter/actions';
import {
  getSelectedChartInfo,
} from '../../../redux/selectedChart/reducers/selectedChart';
import {
  bindInitialDataRequired,
} from '../../../redux/chartBinFilter/sagas';
import {
  findObjectsInIdString,
} from '../../../utilities';
import format from 'date-fns/format';
import {
  setFullScreenMode,
} from '../actions';
import {
  viewPatientTracking,
  viewTasking,
} from '../../../redux/user/actions';
import {
  getDocumentSelection,
} from '../../../redux/documentTabs/reducers/documentTabs';
import {
  onSelection,
} from '../../../redux/documentTabs/actions';
import {
  bindDrawers,
} from '../../../redux/documentTabsFilter/sagas';
import {
  onSelection as onDocumentSelection,
} from '../../../redux/documentList/actions';
import { push } from 'react-router-redux';
import {
  getCurrentLocation,
} from '../reducers';
import {
  getChart,
  getEncounter,
} from '../../../redux/selectedChart/sagas';
import {
  startPollingForTasks,
  stopPollingForTasks,
} from '../../../redux/tasking/actions/taskingActions';

export function* _handleSelectedPatientAndEncounter({
  query,
}) {
  const {
    personId: newPersonId,
    encounterId: newEncounterId,
  } = query;

  const {
    currentPersonId,
    currentEncounterId,
  } = yield select(getSelectedChartInfo);

  // EDL REASON: Type coercion here is understood and expected.
  if (newPersonId && newEncounterId && (
    // eslint-disable-next-line eqeqeq
    currentPersonId != newPersonId || currentEncounterId != newEncounterId)
  ) {
    yield [
      call(getChart, { personId: newPersonId }),
      call(getEncounter, { personId: newPersonId, encounterId: newEncounterId }),
    ];
  // eslint-disable-next-line eqeqeq
  } else if (newPersonId && currentPersonId != newPersonId) {
    yield [
      call(getChart, { personId: newPersonId }),
      call(getEncounter, { personId: newPersonId }),
    ];
  }
}

export function* _handleSelectedDocument({
  query,
}) {
  const {
    documentGroupId: newDocumentGroupId,
    documentId: newDocumentId,
  } = query;

  const {
    selectedTabId: currentDocumentGroupId,
    selectedDocumentId: currentDocumentId,
    drawers,
  } = yield select(getDocumentSelection);

  if (drawers.length === 0) {
    yield call(bindDrawers);
  }

  // TODO: What happens if the document requested is not in this tab?

  // EDL REASON: Type coercion here is understood and expected.
  // eslint-disable-next-line eqeqeq
  if (newDocumentGroupId && currentDocumentGroupId != newDocumentGroupId) {
    yield put(
      onSelection(
        parseInt(newDocumentGroupId, 10),
      ),
    );
  }

  // eslint-disable-next-line eqeqeq
  if (newDocumentId && currentDocumentId != newDocumentId) {
    yield put(
      onDocumentSelection(
        parseInt(newDocumentId, 10),
      ),
    );
  }
}


/**
 * Handles loading the initial set of data.
 *
 * @export
 * @param {any} { query }
 * @returns {bool} true if redirected, false if not.
 */
export function* _handleInitialData({ queryFromSession }) {
  const {
    locationId: newLocationIds,
    providerId: newProviderIds,
  } = queryFromSession;
  // This also handles defaults
  yield call(bindInitialDataRequired, {
    providerId: newProviderIds,
    locationId: newLocationIds,
  });
}

export function* _handleSelectedFilters({ queryFromSession }) {
  const {
    roomId: newRoomIds,
    locationId: newLocationIds,
    providerId: newProviderIds,
    statusId: newStatusIds,
    encounterDate: newEncounterDate = new Date(),
  } = queryFromSession;
  // TODO: Filters need to persist when defaults change.

  // no params passed on the query string.
  // redirect with the user's defaults if there are any.
  if (newProviderIds === undefined || newLocationIds === undefined) {
    const pathname = yield select(getCurrentLocation);
    const search = yield select(getChartBinFilterUrl);
    yield put(push({
      pathname,
      search,
    }));
    return false;
  }

  const {
    providers,
    locations,
    rooms,
    patientStatusTypes,
    selectedDate,
  } = yield select(getFilters);

  const selectedProviders = findObjectsInIdString({
    idString: newProviderIds,
    items: providers,
    property: 'value',
    onFind: item => ({ ...item, selected: true }),
  });

  const selectedLocations = findObjectsInIdString({
    idString: newLocationIds,
    items: locations,
    property: 'value',
    onFind: item => ({ ...item, selected: true }),
  });

  const selectedRooms = findObjectsInIdString({
    idString: newRoomIds,
    items: rooms,
    property: 'value',
    onFind: item =>
      ({ ...item, selected: true, visible: true, selectionSaved: true }),
  });

  const selectedPatientStatusTypes = findObjectsInIdString({
    idString: newStatusIds,
    items: patientStatusTypes,
    property: 'value',
    onFind: item => ({ ...item, selected: true }),
  });

  yield put(filterAppointments(
    selectedProviders,
    selectedLocations,
    selectedRooms,
    selectedPatientStatusTypes,
    newEncounterDate ? format(newEncounterDate, 'YYYY-MM-DD') : selectedDate,
  ));

  return true;
}

function _handlePersistenceofFiltersForEHR(query) {
  const searchParams = global.sessionStorage.getItem('searchParams');
  let queryFromSession = Object.assign({}, query);

  if (query.fullscreen === 'true' && searchParams === null && Object.keys(query).length > 0) {
    global.sessionStorage.setItem('searchParams', JSON.stringify(query));
  }
  if ((query.fullscreen === 'true' && 'access_token' in query && Object.keys(query).length > 3) ||
      (!global.sessionStorage.getItem('chartBinFilter'))) {
    global.sessionStorage.setItem('chartBinFilter',
      JSON.stringify(
        { providerId: query.providerId, locationId: query.locationId }));
  }
  if (query.fullscreen === 'true' && 'access_token' in query && searchParams !== null) {
    queryFromSession = JSON.parse(searchParams);
    // for reset functionality EHR's Chartbin Filter selection (providers and locations only)
    if (Object.keys(query).length === 2) {
      const chartBinFilter = JSON.parse(global.sessionStorage.getItem('chartBinFilter'));
      queryFromSession = {
        ...query,
        providerId: chartBinFilter ? chartBinFilter.providerId :
          (queryFromSession.providerId || query.providerId),
        locationId: query.locationId || queryFromSession.locationId,
        roomId: '',
        statusId: '',
      };
      global.sessionStorage.setItem('searchParams', JSON.stringify(queryFromSession));
    } else {
      // only for EHR's Chartbin Filter selection
      // (providers and locations from EHR + rooms and statuses from sessionStorage)
      queryFromSession = {
        ...queryFromSession,
        providerId: queryFromSession.providerId || query.providerId,
        locationId: query.locationId || queryFromSession.locationId,
        fullscreen: query.fullscreen || queryFromSession.fullscreen,
      };
    }
  }
  return queryFromSession;
}

export function* _navigateToContext({ payload: { pathname, query } }) {
  let queryFromSession = Object.assign({}, query);
  if (query.fullscreen === 'true') {
    queryFromSession = _handlePersistenceofFiltersForEHR(query);
  }
  yield put(setFullScreenMode({ isFullScreenMode: queryFromSession.fullscreen }));
  yield call(_handleInitialData, { queryFromSession });
  yield put(stopPollingForTasks());
  switch (true) {
    case /document/i.test(pathname):
      yield call(_handleSelectedPatientAndEncounter, { query });
      yield call(_handleSelectedDocument, { query });
      break;
    case /patientEncounter/i.test(pathname):
      yield call(_handleSelectedPatientAndEncounter, { query });
      break;
    case /taskEditor/i.test(pathname):
      yield put(clearSelectedChart());
      yield call(_handleSelectedPatientAndEncounter, { query });
      yield call(_handleSelectedFilters, { queryFromSession });
      break;
    case /tasking/i.test(pathname):
      yield put(clearSelectedChart());
      if (yield call(_handleSelectedFilters, { queryFromSession })) {
        yield put(viewTasking());
        yield put(startPollingForTasks());
      }
      break;
    case /desktop/i.test(pathname):
    default:
      yield put(clearSelectedChart());
      if (yield call(_handleSelectedFilters, { queryFromSession })) {
        yield put(viewPatientTracking());
      }
      break;
  }
}

export function* watchLocationChange() {
  yield* takeLatestWhileAuthenticated(
    [
      LOCATION_CHANGE,
      LOCATION_CHANGE_FULLSCREEN,
    ],
    _navigateToContext,
  );
}
