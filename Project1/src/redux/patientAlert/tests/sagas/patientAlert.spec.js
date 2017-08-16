
import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';
import { call, put } from 'redux-saga/effects';
import {
  patientAlertReadById,
  patientAlertSaveUpdate,
  patientAlertDelete,
} from '../../api';
import {
  getPatientAlertDetails,
  saveUpdatePatientAlert,
  deletePatientAlert,
} from '../../sagas';

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
  alert: 'Alert for you',
}];

describe('patientAlert sagas', () => {
  describe('getPatientAlertDetails', () => {
    it(`should call our patientAlertReadById API.
      When successful, it should then call the success action`, () => {
        const action = { type: 'SELECTED_CHART_SET_CHART', chart: { personId: 1830 } };
        const generator = getPatientAlertDetails(action);
        const personId = action.chart.personId;

        // move to the first yield statement
        let next = generator.next();

        // First we should read patient alert by Id
        expect(next.value).toEqual(call(patientAlertReadById, personId));

        // Mock setting the value to skip the API call
        next = generator.next(patientAlertModel);

        // Second we should be calling patientAlertReadSucceded
        expect(next.value).toEqual(put(actions.patientAlertReadSucceded(patientAlertModel)));
      });

    it(`should call our patientAlertReadById API.
      When it fails, it should call the failure action`, () => {
        const action = { type: 'SELECTED_CHART_SET_CHART', chart: { personId: undefined } };
        const generator = getPatientAlertDetails(action);
        const personId = action.chart.personId;
        const msg = 'Not Found';

        // move to the first yield statement
        let next = generator.next();

        // First we should read patient alert by Id
        expect(next.value).toEqual(call(patientAlertReadById, personId));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.patientAlertReadFailed(msg)));
      });
  });

  describe('saveUpdatePatientAlert', () => {
    it(`should call our patientAlertSaveUpdate API.
      When successful, it should then call the success action`, () => {
        const request = [{
          type: types.PATIENTALERT_SAVEUPDATE,
          alertText: 'Alert for you',
          isPrivate: true,
          personId: 1830,
        }];
        const generator = saveUpdatePatientAlert(request);

        // move to the first yield statement
        let next = generator.next();

        // First we should patientAlertSaveUpdate
        expect(next.value).toEqual(call(patientAlertSaveUpdate, request));

        // Mock setting the value to skip the API call
        next = generator.next(patientAlertModel);

        // Second we should be calling patientAlertSaveUpdateSucceded
        expect(next.value).toEqual(put(actions.patientAlertSaveUpdateSucceded(patientAlertModel)));
      });

    it(`should call our patientAlertSaveUpdate API.
      When it fails, it should call the failure action`, () => {
        const request = [{
          type: types.PATIENTALERT_SAVEUPDATE,
          alertText: 'Alert for you',
          isPrivate: true,
          personId: 1830,
        }];
        const msg = 'Bad request';

        const generator = saveUpdatePatientAlert(request);

        // move to the first yield statement
        let next = generator.next();

        // First we should read patientAlertSaveUpdate
        expect(next.value).toEqual(call(patientAlertSaveUpdate, request));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.patientAlertSaveUpdateFailed(msg)));
      });
  });

  describe('deletePatientAlert', () => {
    it(`should call our patientAlertDelete API.
      When successful, it should then call the success action`, () => {
        const request = [{
          type: types.PATIENTALERT_DELETE,
          personId: 1830,
        }];
        const generator = deletePatientAlert(request);

        // move to the first yield statement
        let next = generator.next();

        // First we should patientAlertDelete
        expect(next.value).toEqual(call(patientAlertDelete, request.personId));

        // Mock setting the value to skip the API call
        next = generator.next();

        // Second we should be calling patientAlertDeleteSucceded
        expect(next.value).toEqual(put(actions.patientAlertDeleteSucceded()));
      });

    it(`should call our patientAlertDelete API.
      When it fails, it should call the failure action`, () => {
        const request = [{
          type: types.PATIENTALERT_DELETE,
          personId: 1830,
        }];
        const msg = 'Bad request';

        const generator = deletePatientAlert(request);

        // move to the first yield statement
        let next = generator.next();

        // First we should read patientAlertDelete
        expect(next.value).toEqual(call(patientAlertDelete, request.personId));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.patientAlertDeleteFailed(msg)));
      });
  });
});

