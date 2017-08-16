import * as types from '../constants/ActionTypes';

export const changeAlertDetails = (alertText, isPrivate) => ({
  type: types.PATIENTALERT_TEXT_CHANGED,
  alertText,
  isPrivate,
});

export const patientAlertReadSucceded = patientAlert => ({
  type: types.PATIENTALERT_READ_SUCCEDED,
  patientAlert,
});

export const patientAlertReadFailed = (message, personId) => ({
  type: types.PATIENTALERT_READ_FAILED,
  message,
  personId,
});

export const patientAlertSaveUpdate = (alertText, isPrivate, personId) => ({
  type: types.PATIENTALERT_SAVEUPDATE,
  alertText,
  isPrivate,
  personId,
});

export const patientAlertSaveUpdateSucceded = patientAlert => ({
  type: types.PATIENTALERT_SAVEUPDATE_SUCCEDED,
  patientAlert,
});

export const patientAlertSaveUpdateFailed = message => ({
  type: types.PATIENTALERT_SAVEUPDATE_FAILED,
  message,
});

export const patientAlertDelete = personId => ({
  type: types.PATIENTALERT_DELETE,
  personId,
});

export const patientAlertDeleteSucceded = () => ({
  type: types.PATIENTALERT_DELETE_SUCCEDED,
});

export const patientAlertDeleteFailed = message => ({
  type: types.PATIENTALERT_DELETE_FAILED,
  message,
});

export const toggleVisiblity = isVisible => ({
  type: types.PATIENTALERT_TOGGLE_VISIBLITY,
  isVisible,
});

export const toggleEditMode = isReadOnly => ({
  type: types.PATIENTALERT_TOGGLE_EDITMODE,
  isReadOnly,
});

export const resetToDefault = () => ({
  type: types.PATIENTALERT_RESETTODEFAULT,
});

export const resizeModal = () => ({
  type: types.PATIENTALERT_RESIZEMODAL,
});
