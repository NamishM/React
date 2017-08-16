
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const patientAlertModel = [{
  personID: 1830,
  alertID: 1,
  isPrivate: true,
  createdBy: 27,
  createTime: '2016-08-16T17:23:00.24',
  modifiedBy: null,
  modifyTime: null,
  alert: 'alert message',
}];

describe('patientAlert action', () => {
  it('changeAlertDetails should create PATIENTALERT_TEXT_CHANGED action', () => {
    expect(actions.changeAlertDetails('Patient Alert', true)).toEqual({
      type: types.PATIENTALERT_TEXT_CHANGED,
      alertText: 'Patient Alert',
      isPrivate: true,
    });
  });

  it('patientAlertReadSucceded should create PATIENTALERT_READ_SUCCEDED action', () => {
    expect(actions.patientAlertReadSucceded(patientAlertModel)).toEqual({
      type: types.PATIENTALERT_READ_SUCCEDED,
      patientAlert: patientAlertModel,
    });
  });

  it('patientAlertReadFailed should create PATIENTALERT_READ_FAILED action', () => {
    expect(actions.patientAlertReadFailed('Not Found', 1830)).toEqual({
      type: types.PATIENTALERT_READ_FAILED,
      message: 'Not Found',
      personId: 1830,
    });
  });

  it('patientAlertSaveUpdate should create PATIENTALERT_SAVEUPDATE action', () => {
    expect(actions.patientAlertSaveUpdate('Alert for you', false, 1830)).toEqual({
      type: types.PATIENTALERT_SAVEUPDATE,
      alertText: 'Alert for you',
      isPrivate: false,
      personId: 1830,
    });
  });

  it('patientAlertSaveUpdateSucceded should create PATIENTALERT_SAVEUPDATE_SUCCEDED action', () => {
    expect(actions.patientAlertSaveUpdateSucceded(patientAlertModel)).toEqual({
      type: types.PATIENTALERT_SAVEUPDATE_SUCCEDED,
      patientAlert: patientAlertModel,
    });
  });

  it('patientAlertSaveUpdateFailed should create PATIENTALERT_SAVEUPDATE_FAILED action', () => {
    expect(actions.patientAlertSaveUpdateFailed('Bad request')).toEqual({
      type: types.PATIENTALERT_SAVEUPDATE_FAILED,
      message: 'Bad request',
    });
  });

  it('patientAlertDelete should create PATIENTALERT_DELETE action', () => {
    expect(actions.patientAlertDelete(1830)).toEqual({
      type: types.PATIENTALERT_DELETE,
      personId: 1830,
    });
  });

  it('patientAlertDeleteSucceded should create PATIENTALERT_DELETE_SUCCEDED action', () => {
    expect(actions.patientAlertDeleteSucceded()).toEqual({
      type: types.PATIENTALERT_DELETE_SUCCEDED,
    });
  });

  it('patientAlertDeleteFailed should create PATIENTALERT_DELETE_FAILED action', () => {
    expect(actions.patientAlertDeleteFailed('Bad request')).toEqual({
      type: types.PATIENTALERT_DELETE_FAILED,
      message: 'Bad request',
    });
  });

  it('toggleVisiblity should create PATIENTALERT_TOGGLE_VISIBLITY action', () => {
    expect(actions.toggleVisiblity(false)).toEqual({
      type: types.PATIENTALERT_TOGGLE_VISIBLITY,
      isVisible: false,
    });
  });

  it('toggleEditMode should create PATIENTALERT_TOGGLE_EDITMODE action', () => {
    expect(actions.toggleEditMode(false)).toEqual({
      type: types.PATIENTALERT_TOGGLE_EDITMODE,
      isReadOnly: false,
    });
  });

  it('resetToDefault should create PATIENTALERT_RESETTODEFAULT action', () => {
    expect(actions.resetToDefault()).toEqual({
      type: types.PATIENTALERT_RESETTODEFAULT,
    });
  });

  it('resizeModal should create PATIENTALERT_RESIZEMODAL action', () => {
    expect(actions.resizeModal()).toEqual({
      type: types.PATIENTALERT_RESIZEMODAL,
    });
  });
});
