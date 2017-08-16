import * as actiontypes from '../constants/ActionTypes';
import * as eventType from '../constants/EventType';
import { allergyMapper } from '../mappers/allergyMapper';
import { pharmacyMapper } from '../mappers/pharmacyMapper';
import { medicationMapper } from '../mappers/medicationMapper';
import { patientConsentMapper } from '../mappers/patientConsentMapper';
import { initialPrescriptionMapper, createFullPrescriptionMapper, isMedication,
  checkForSignOnly } from '../mappers/prescriptionMapper';

export const callMapper = (eventData, data, patientId, encounterId) => {
  let result = null;
  let filteredData = '';
  let isMedicationData = true;
  switch (eventData.eventName) {
    case eventType.PATIENTPHARMACY_CHANGE:
      filteredData = pharmacyMapper(data, patientId, false);
      result = {
        data: filteredData.operation === 'created' ?
          filteredData.RxPharmacyV2 : filteredData.PatientPharmacy,
        operation: filteredData.operation,
        integration: filteredData.integration,
        apiName: filteredData.operation === 'created' ? eventData.apiName : 'RxPatientPharmacy',
        type: filteredData.operation === 'created' ? actiontypes.WIDGET_DATA_ADDED : actiontypes.PHARMACY_WIDGET_DATA_UPDATED,
      };
      break;
    case eventType.ALLERGY_CHANGE:
      filteredData = allergyMapper(data, patientId, encounterId);
      result = {
        data: filteredData.allergy,
        operation: filteredData.operation,
        integration: filteredData.integration,
        apiName: eventData.apiName,
        type: actiontypes.WIDGET_DATA_ADDED,
      };
      break;
    case eventType.PATIENTCONSENT_CHANGE:
      filteredData = patientConsentMapper(data, patientId, encounterId);
      result = {
        data: filteredData.PatientConsent,
        operation: filteredData.operation,
        apiName: eventData.apiName,
        type: actiontypes.WIDGET_DATA_ADDED,
      };
      break;
    case eventType.PATIENTPHARMACY_SETDEFAULT:
      filteredData = pharmacyMapper(data, patientId, true);
      result = {
        data: filteredData.PatientPharmacy,
        operation: filteredData.operation,
        integration: filteredData.integration,
        apiName: eventData.apiName,
        type: actiontypes.PHARMACY_WIDGET_DATA_UPDATED,
      };
      break;
    case eventType.MEDICATION_CHANGE:
      isMedicationData = isMedication(data);
      filteredData = isMedicationData ? medicationMapper(data, patientId, encounterId) :
        createFullPrescriptionMapper(data, patientId);
      if (isMedicationData) {
        result = {
          data: filteredData.RxMedicationV2,
          operation: filteredData.operation,
          integration: filteredData.integration,
          apiName: eventData.apiName,
          type: actiontypes.WIDGET_DATA_ADDED,
        };
      } else {
        result = {
          data: filteredData,
          type: actiontypes.MAP_COMPLETE_PRESCRIPTION_DATA,
        };
      }
      break;
    case eventType.PRESCRIPTION_CHANGE:
      filteredData = checkForSignOnly(data);
      if (filteredData) {
        result = {
          data: filteredData,
          type: actiontypes.ADD_PRESCRIPTION_DATA,
        };
      }
      break;
    case eventType.PRESCRIPTION_ACTION:
      filteredData = initialPrescriptionMapper(data);
      if (filteredData) {
        result = (filteredData.operation === 'updated') ?
          {
            data: filteredData.data,
            operation: filteredData.operation,
            integration: filteredData.integration,
            apiName: eventData.apiName,
            type: actiontypes.WIDGET_DATA_ADDED,
          } :
          {
            data: filteredData.data,
            type: actiontypes.ADD_PRESCRIPTION_DATA,
          };
      }
      break;
    default:
      //  result.operation = 'invalid';
      return null;
  }
  return result;
};
