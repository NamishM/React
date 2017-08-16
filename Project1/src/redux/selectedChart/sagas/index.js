import { takeLatestWhileAuthenticated } from '../../user/sagas';
import {
  SELECTED_CHART_CLEAR,
  SELECTED_CHART_SELECTED,
  SELECTED_CHART_ENCOUNTER_SELECTED,
} from '../constants/ActionTypes';
import { DOCUMENTCONTENT_FETCH_REQUESTED } from '../../documentList/constants/ActionTypes';
import { LOCATION_CHANGE } from '../../location/constants/ActionTypes';
import {
  smallViewLeft,
  smallViewRight,
} from '../../../redux/browser/actions';
import {
  setPreviousRoute,
  setChart,
  setEncounter,
} from '../actions';
import { backToTabs } from '../../../redux/documentTabs/actions';
import {
  put,
  call,
  select,
} from 'redux-saga/effects';
import {
  getLatestEncounter,
  getPatientInfo,
} from '../api';

export function* getChart({ personId }) {
  // eslint-disable-next-line
  let { chart, currentPersonId } = yield select(({
    entities,
    patientSearchData,
    selectedChart,
  }) => ({
    chart:
      entities.demographics[personId] ||
      patientSearchData.entities.demographics[personId],
    currentPersonId: selectedChart.chart ? selectedChart.chart.personId : null,
  }));

  // EDL REASON: Type coercion is understood and expected
  // eslint-disable-next-line eqeqeq
  if (personId == currentPersonId) {
    return;
  }

  if (chart) {
    yield put(setChart(chart.patient || chart));
  } else {
    chart = yield call(getPatientInfo, personId);
    if (chart) {
      yield put(setChart(chart.patient || chart));
    } else {
      yield put(setChart(null));
    }
  }
}

export function* getEncounter({ personId, encounterId }) {
  let { encounter } = yield select(state => ({
    encounter:
      state.entities.appointments[encounterId] ||
      state.entities.appointments[encounterId],
  }));

  if (encounter) {
    yield put(setEncounter(encounter));
  } else {
    encounter = yield call(getLatestEncounter, personId, encounterId);
    yield put(setEncounter(encounter));
  }
}


export function* testAndSetPreviousRoute() {
  const {
    pathname,
    search,
  } = yield select(state => ({
    pathname: state.routing.locationBeforeTransitions.pathname,
    search: state.routing.locationBeforeTransitions.search,
  }));

  if (!(/patientEncounter/i.test(pathname)
      || /document/i.test(pathname)
  )) {
    yield (put(setPreviousRoute(pathname, search)));
  }
}

export function* togglePanelForSmallDevice() {
  const {
    screenLayout,
    currentPath,
    selectedDocumentId,
  } = yield select(state => ({
    screenLayout: state.browser.screenLayout,
    currentPath: state.routing.currentPath,
    selectedDocumentId: state.documentList.selectedDocumentId,
  }));
  if (screenLayout === 'device') {
    if (currentPath === 'document' && selectedDocumentId === null) {
      yield put(backToTabs());
      yield put(smallViewLeft());
    } else {
      yield put(smallViewRight());
    }
  }
}

export function* onChartClosed() {
  const { screenLayout, deviceVisiblePanel } = yield select(state => ({
    screenLayout: state.browser.screenLayout,
    deviceVisiblePanel: state.wireframe.deviceVisiblePanel,
  }));

  if (screenLayout === 'device') {
    switch (deviceVisiblePanel) {
      case 'right':
        // keep user on right panel
        yield put(smallViewRight());
        break;
      case 'left':
        // keep user on left panel
        yield put(smallViewLeft());
        break;
      default:
        // fallback or default left loaded
        yield put(smallViewLeft());
        break;
    }
  }
}

export function* watchLocationChanged() {
  yield* takeLatestWhileAuthenticated([
    LOCATION_CHANGE,
  ], testAndSetPreviousRoute);
}

export function* watchChartSelection() {
  yield* takeLatestWhileAuthenticated([
    SELECTED_CHART_SELECTED,
    SELECTED_CHART_ENCOUNTER_SELECTED,
    DOCUMENTCONTENT_FETCH_REQUESTED,
  ], togglePanelForSmallDevice);
}

export function* watchChartClose() {
  yield* takeLatestWhileAuthenticated([
    SELECTED_CHART_CLEAR,
  ], onChartClosed);
}
