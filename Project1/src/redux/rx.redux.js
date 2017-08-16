// This file named 'default.js' because weird stuff happens if it's named 'index.js'
import combineReducers from 'redux/lib/combineReducers';
import browser from './browser';
import chartBinFilter from './chartBinFilter';
import patients from './patients';
import selectedChart from './selectedChart';
import user from './userRx';
import appointments from './appointmentList';
import patientTracking from './patientTracking';
import encounters from './encounters';
import rx from './rx';
import documentTabs from './documentTabs';
import documentTabsFilter from './documentTabsFilter';
import documentList from './documentList';
import documentFilter from './documentFilter';
import patientAlert from './patientAlert';
import timeOutAlert from './timeOutAlert';
import appRegistration from './appRegistration';
// import reduceReducers from 'reduce-reducers';
import idle from './idle';

export const createReducer = asyncReducers =>
  combineReducers({
    ...browser.Reducers,
    ...rx.Reducers,
    ...patients.Reducers,
    ...user.Reducers,
    ...chartBinFilter.Reducers,
    ...appointments.Reducers,
    ...encounters.Reducers,
    ...patientTracking.Reducers,
    ...patientAlert.Reducers,
    ...timeOutAlert.Reducers,
    ...selectedChart.Reducers,
    ...appRegistration.Reducers,
    ...documentTabs.Reducers,
    ...documentTabsFilter.Reducers,
    ...documentList.Reducers,
    ...documentFilter.Reducers,
    ...asyncReducers,
    ...idle.Reducers,
  });

export function* rootSaga() {
  yield [
    user.Sagas.loginFlow(),
    user.Sagas.watchDataSourceRequested(),
    user.Sagas.maxLoginRetries(),
    user.Sagas.watchforLoginSuccess(),
    user.Sagas.watchRedirectFromDesktop(),
    appointments.Sagas.watchAppointmentsRequested(),
    appointments.Sagas.nextPageFlow(),
    encounters.Sagas.watchAppointmentsRequested(),
    encounters.Sagas.nextPageFlow(),
    patientTracking.Sagas.watchPatientTrackingRequested(),
    patientTracking.Sagas.patientTrackingNextPageFlow(),
    patients.Sagas.watchPatientRequested(),
    patients.Sagas.watchPatientSelection(),
    patients.Sagas.getNextPageFlow(),
    patients.Sagas.sortFlow(),
    selectedChart.Sagas.watchChartSelection(),
    selectedChart.Sagas.watchChartClose(),
    selectedChart.Sagas.watchLocationChanged(),
    patientAlert.Sagas.watchForPatientSelect(),
    patientAlert.Sagas.watchForSaveUpdateAlert(),
    patientAlert.Sagas.watchForDeleteAlert(),
    documentTabs.Sagas.watchDocumentTabsListRequested(),
    documentTabs.Sagas.documentTabsListNextPageFlow(),
    documentTabsFilter.Sagas.watchResetRequested(),
    documentList.Sagas.watchDocumentListRequested(),
    documentList.Sagas.documentListNextPageFlow(),
    documentList.Sagas.watchDocumentContentRequested(),
    documentList.Sagas.watchDocumentNotesRequested(),
    rx.Sagas.watchDownloadPayload(),
    rx.Sagas.watchUpdatePharmacyMapping(),
    rx.Sagas.watchGetRxDetails(),
    rx.Sagas.watchGetSettings(),
  ];
}
