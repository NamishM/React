import * as types from '../constants/ActionTypes';

const initialState = {
  personId: 1,
  alert: '',
  isPrivate: false,
  failedMessage: '',
  isAlertExist: false,
  isVisible: false,
  isReadOnly: true,
  isExpanded: false,
};

const patientAlertExtension = (state = initialState, action) => {
  switch (action.type) {
    case types.PATIENTALERT_TEXT_CHANGED:
    {
      return Object.assign({}, state, {
        alert: action.alertText,
        isPrivate: action.isPrivate,
      });
    }
    case types.PATIENTALERT_READ_SUCCEDED:
    case types.PATIENTALERT_SAVEUPDATE_SUCCEDED:
    {
      return Object.assign({}, state, {
        personId: action.patientAlert.personID,
        alert: action.patientAlert.alert,
        isPrivate: action.patientAlert.isPrivate,
        isVisible: !action.patientAlert.isPrivate,
        failedMessage: '',
        isAlertExist: true,
      });
    }
    case types.PATIENTALERT_READ_FAILED:
    case types.PATIENTALERT_SAVEUPDATE_FAILED:
    {
      return Object.assign({}, state, {
        personId: action.personId,
        alert: '',
        isPrivate: false,
        failedMessage: action.message,
        isAlertExist: false,
      });
    }
    case types.PATIENTALERT_DELETE_SUCCEDED:
    {
      return Object.assign({}, state, {
        personId: 1,
        alert: '',
        isPrivate: false,
        failedMessage: '',
        isAlertExist: false,
      });
    }
    case types.PATIENTALERT_DELETE_FAILED:
    {
      return Object.assign({}, state, {
        personId: 1,
        alert: '',
        isPrivate: false,
        failedMessage: action.message,
        isAlertExist: false,
      });
    }
    case types.PATIENTALERT_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isVisible: action.isVisible,
      });
    }
    case types.PATIENTALERT_TOGGLE_EDITMODE:
    {
      return Object.assign({}, state, {
        isReadOnly: action.isReadOnly,
      });
    }
    case types.PATIENTALERT_RESETTODEFAULT:
    {
      return Object.assign({}, state, {
        isVisible: false,
        isReadOnly: true,
        isExpanded: false,
      });
    }
    case types.PATIENTALERT_RESIZEMODAL:
    {
      return Object.assign({}, state, {
        isExpanded: !state.isExpanded,
      });
    }
    default:
      return state;
  }
};

export default patientAlertExtension;

