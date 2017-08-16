
import patientAlertExtension from '../../reducers/patientAlertExtension';
import * as index from '../../reducers/index';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const patientAlertModel = {
  personID: 1830,
  alertID: 1,
  isPrivate: true,
  createdBy: 27,
  createTime: '2016-08-16T17:23:00.24',
  modifiedBy: null,
  modifyTime: null,
  alert: 'alert message',
};

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

describe('patientAlert reducer', () => {
  it('should handle initial state', () => {
    expect(
      patientAlertExtension(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle PATIENTALERT_TEXT_CHANGED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_TEXT_CHANGED,
        alertText: 'Patient Alert',
        isPrivate: true,
      }),
    ).toEqual({
      personId: 1,
      alert: 'Patient Alert',
      isPrivate: true,
      failedMessage: '',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_SAVEUPDATE_SUCCEDED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      isVisible: true,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_SAVEUPDATE_SUCCEDED,
        patientAlert: patientAlertModel,
      }),
    ).toEqual({
      personId: 1830,
      alert: 'alert message',
      isPrivate: true,
      isVisible: false,
      failedMessage: '',
      isAlertExist: true,
    });
  });

  it('should handle PATIENTALERT_READ_SUCCEDED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      isVisible: true,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_READ_SUCCEDED,
        patientAlert: patientAlertModel,
      }),
    ).toEqual({
      personId: 1830,
      alert: 'alert message',
      isPrivate: true,
      isVisible: false,
      failedMessage: '',
      isAlertExist: true,
    });
  });

  it('should handle PATIENTALERT_RESETTODEFAULT', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isVisible: false,
      isReadOnly: true,
      isExpanded: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_RESETTODEFAULT,
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isVisible: false,
      isReadOnly: true,
      isExpanded: false,
    });
  });
  it('should handle PATIENTALERT_READ_FAILED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_READ_FAILED,
        message: 'Not Found',
        personId: 1830,
      }),
    ).toEqual({
      personId: 1830,
      alert: '',
      isPrivate: false,
      failedMessage: 'Not Found',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_SAVEUPDATE_FAILED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_SAVEUPDATE_FAILED,
        message: 'Not Found',
        personId: 1830,
      }),
    ).toEqual({
      personId: 1830,
      alert: '',
      isPrivate: false,
      failedMessage: 'Not Found',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_DELETE_SUCCEDED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_DELETE_SUCCEDED,
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_DELETE_FAILED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_DELETE_FAILED,
        message: 'Bad request',
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: 'Bad request',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_SAVEUPDATE_FAILED', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_SAVEUPDATE_FAILED,
        message: 'Not Found',
        personId: 1830,
      }),
    ).toEqual({
      personId: 1830,
      alert: '',
      isPrivate: false,
      failedMessage: 'Not Found',
      isAlertExist: false,
    });
  });

  it('should handle PATIENTALERT_TOGGLE_VISIBLITY', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isVisible: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_TOGGLE_VISIBLITY,
        isVisible: false,
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isVisible: false,
    });
  });

  it('should handle PATIENTALERT_TOGGLE_EDITMODE', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isReadOnly: true,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_TOGGLE_EDITMODE,
        isReadOnly: false,
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isReadOnly: false,
    });
  });

  it('should handle PATIENTALERT_RESIZEMODAL', () => {
    const state = {
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isExpanded: false,
    };
    deepFreeze(state);

    expect(
      patientAlertExtension(state, {
        type: types.PATIENTALERT_RESIZEMODAL,
      }),
    ).toEqual({
      personId: 1,
      alert: '',
      isPrivate: false,
      failedMessage: '',
      isAlertExist: false,
      isExpanded: !state.isExpanded,
    });
  });
});

describe('patientAlertExtension index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ patientAlertExtension });
  });
});
