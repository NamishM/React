import * as types from '../constants/ActionTypes';

export const setInitialData = (userName, password, practiceId, systemName) => ({
  type: types.SET_INITIAL_DATA,
  userName,
  password,
  practiceId,
  systemName,
});

export const unBlockUI = isRendered => ({
  type: types.SHOW_WIDGET,
  isRendered,
});

export const initRx = (patientId, encounterId) => ({
  type: types.ON_INIT,
  patientId,
  encounterId,
});

export const authenticationSuccess = authResult => ({
  type: types.AUTHENTICATION_SUCCESS,
  authResult,
});

export const authenticationFailed = msg => ({
  type: types.AUTHENTICATION_FAILURE,
  msg,
});

export const scriptLoaderFailed = (widgetName, id) => ({
  type: types.SCRIPT_LOAD_FAILED,
  widgetName,
  id,
});

export const initiatAuthentication = () => ({
  type: types.AUTHENTICATION_INITIATED,
});

export const setPatientContext = () => ({
  type: types.SET_PATIENT_CONTEXT,
});

export const widgetOpened = widgetName => ({
  type: types.WIDGET_OPENED,
  widgetName,
});

export const widgetDataUpdate = (eventName, data, widgetName,
  apiName, operation, integrationInfo, type) => ({
  type: type === undefined ? types.WIDGET_DATA_ADDED : type,
  data,
  widgetName,
  apiName,
  operation,
  integrationInfo,
}
);
//  below action is not in use.
export const widgetDataAdded = (data, widgetName, apiMethod) => ({
  type: types.WIDGET_DATA_ADDED,
  data,
  widgetName,
  apiMethod,
});

export const widgetDataAddedSucceeded = (data, widgetName, operation) => ({
  type: types.WIDGET_DATA_ADDED_SUCCESSFULLY,
  data,
  widgetName,
  operation,
});

export const widgetDataAddedFailed = (data, widgetName, msg) => ({
  type: types.WIDGET_DATA_ADDED_FAILED,
  msg,
  data,
  widgetName,
});

export const pharmacyWidgetDataUpdate = (data, widgetName, apiName, operation,
  integrationInfo) => ({
  type: types.PHARMACY_WIDGET_DATA_UPDATED,
  data,
  widgetName,
  apiName,
  operation,
  integrationInfo,
});

export const getRxDetails = personId => ({
  type: types.RX_WIDGETS_DETAILS_GET,
  personId,
});

export const setRxDetails = (consentStatus, hasPharmacy, defaultPharmacy, hasAllergy,
  allergyList) => ({
  type: types.RX_WIDGETS_DETAILS_GET_SUCCESSFULLY,
  consentStatus,
  hasPharmacy,
  defaultPharmacy,
  hasAllergy,
  allergyList,
});

export const rxWidgetGetSettings = () => ({
  type: types.RX_WIDGETS_GET_SETTINGS,
});

export const rxWidgetGetSettingsSucceeded = (systemName, interfaceUsername, interfacePassword,
  practiceId, userName) => ({
  type: types.RX_WIDGETS_GET_SETTINGS_SUCCESSFULLY,
  systemName,
  interfaceUsername,
  interfacePassword,
  practiceId,
  userName,
});

export const rxWidgetGetSettingsFailed = () => ({
  type: types.RX_WIDGETS_GET_SETTINGS_FAILED,
});

// export const addPrescriptionData = data => ({
//  type: types.ADD_PRESCRIPTION_DATA,
//  data,
// });

export const addCompletePrescriptionData = (data, status) => ({
  type: types.MAP_COMPLETE_PRESCRIPTION_DATA,
  data,
  status,
});
export const prescriptionAction = (type, data, status) => ({
  type,
  data,
  status,
});

export const updatePrescriptionCompleteStatus = (status, prescription) => ({
  type: types.UPDATE_PRESCRIPTION_COMPLETE_STATUS,
  status,
  prescription, //  we can use it.
});


export const prescriptionFailed = prescription => ({
  type: types.UPDATE_PRESCRIPTION_FAILED,
  prescription,
});

export const loadScriptStack = script => ({
  type: types.LOAD_SCRIPTS,
  script,
});
