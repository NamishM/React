import objectMapper from 'object-mapper';

import * as integrationEntity from 'srs/redux/rx/constants/IntegrationEntities';
import * as types from 'srs/redux/rx/constants/ActionTypes';

const prescriptionMapper = {
  eventName: 'event',
  'payload.prescription.prescriptionId.rcopiaId': 'Result.ExternalId',
  'payload.prescription.status.completionState': 'Result.completionState',
  'payload.prescription.status.transmissionState': 'Result.transmissionState',
  'payload.prescription.status.actionCodes[]': 'Result.actionCodes',
  'payload.prescription.pharmacy.pharmacyId.rcopiaId': 'Result.PharmacyExternalId',
  'payload.action': 'Result.action',
};

const fullPrescriptionAddMapper = {
  eventName: 'event',
  'payload.medication.creatingPrescriptionId.rcopiaId': 'RxPrescriptionV2.ExternalId',
  'payload.medication.pharmacy.pharmacyId.rcopiaId': 'RxPrescriptionV2.PharmacyExternalId',

  'payload.medication.medicationId.rcopiaId': 'RxPrescriptionV2.Medication.MedicationExternalId',
  'payload.medication.drug.drugId.rcopiaId': 'RxPrescriptionV2.Medication.Drug.ExternalId',
  'payload.medication.refills': 'RxPrescriptionV2.Medication.Sig.Refills',
  'payload.medication.quantityUnit': 'RxPrescriptionV2.Medication.Sig.QuantityUnit',
  'payload.medication.quantity': 'RxPrescriptionV2.Medication.Sig.Quantity',
  'payload.medication.officeNotes': 'RxPrescriptionV2.Medication.Note',

  'payload.medication.sig.dose': 'RxPrescriptionV2.Medication.Sig.Dose',
  'payload.medication.sig.doseAction': 'RxPrescriptionV2.Medication.Sig.Action',
  'payload.medication.sig.doseFrequency': 'RxPrescriptionV2.Medication.Sig.DoseTiming',
  'payload.medication.sig.doseOther': 'RxPrescriptionV2.Medication.Sig.DoseOther',
  'payload.medication.sig.doseUnit': 'RxPrescriptionV2.Medication.Sig.DoseUnit',
  'payload.medication.sig.route': 'RxPrescriptionV2.Medication.Sig.Route',
  'payload.medication.sig.substitutionPermitted': 'RxPrescriptionV2.Medication.Sig.SubstitutionPermitted',
  'payload.medication.sig.freeTextDirections': 'RxPrescriptionV2.Medication.Sig.Instructions',
  'payload.medication.sig.notesToPharmacist': 'RxPrescriptionV2.Medication.Sig.OtherNotes',
  'payload.medication.sig.duration': 'RxPrescriptionV2.Medication.Sig.Duration',

  'payload.medication.startDate.date': 'RxPrescriptionV2.Medication.StartDate',
  'payload.medication.lastRefillDate.date': 'RxPrescriptionV2.Medication.LastRefillDate',
  'payload.medication.stopDate.date': 'RxPrescriptionV2.Medication.StopDate',

  'payload.medication.drug.brandName': 'RxPrescriptionV2.Medication.Drug.BrandName',
  'payload.medication.drug.description': 'RxPrescriptionV2.Medication.Drug.DrugDescription',
  'payload.medication.drug.drugSchedule': 'RxPrescriptionV2.Medication.Drug.Schedule',
  'payload.medication.drug.route': 'RxPrescriptionV2.Medication.Drug.RouteCode',
  'payload.medication.drug.strength': 'RxPrescriptionV2.Medication.Drug.Strength',
  'payload.medication.drug.form': 'RxPrescriptionV2.Medication.Drug.Form',
  'payload.medication.drug.codingLevel': 'RxPrescriptionV2.Medication.Drug.CodingLevel',

  'payload.medication.drug.isSupply': 'RxPrescriptionV2.Medication.Drug.IsSupply',
  'payload.medication.drug.isCompound': 'RxPrescriptionV2.Medication.Drug.IsCompound',
  'payload.action': 'actionType',
  'payload.medication.drug.name': 'DrugName',
};

const mapStatus = (completionState, transmissionState, actionCodes, action) => {
  if (completionState === 'complete') {
    if (transmissionState === 'sent') {
      if (actionCodes.indexOf('printed as original') > -1) {
        return types.PRESCRIPTION_SEND_PRINT;
      }
      return types.PRESCRIPTION_SEND;
    }
    if (actionCodes.indexOf('printed as original') > -1) {
      return types.PRESCRIPTION_PRINT_NOT_SEND;
    }
    return types.PRESCRIPTION_SIGN_NOT_SEND;
  } else if (completionState === 'voided' && action === 'cancelled') {
    return types.PRESCRIPTION_CANCELLED;
  }
  return types.PRESCRIPTION_PENDING;
};
//  Use to create partial payload for prescription.
export const initialPrescriptionMapper = (payload) => {
  const result = objectMapper(payload, prescriptionMapper);

  result.Result.PrescriptionStatus = mapStatus(result.Result.completionState,
    result.Result.transmissionState, result.Result.actionCodes, result.Result.action);

  return {
    data: {
      ExternalId: result.Result.ExternalId,
      PrescriptionStatus: result.Result.PrescriptionStatus,
      PharmacyExternalId: (result.Result.PrescriptionStatus !== types.PRESCRIPTION_CANCELLED) ?
        result.Result.PharmacyExternalId : null,
    },
    operation: result.Result.PrescriptionStatus !== types.PRESCRIPTION_CANCELLED ? 'created' : 'updated',
    integration: {
      sourceId: integrationEntity.SOURCE_ID,
      groupId: integrationEntity.RX_INTEGRATION_GROUP_ID,
      entityId: integrationEntity.PRESCRIPTION_INTEGRATION_ENTITY_ID,
    },
  };
};
//  Use to create full prescription payload.
export const createFullPrescriptionMapper = (payload, personId) => {
  const result = objectMapper(payload, fullPrescriptionAddMapper);

  result.RxPrescriptionV2.Medication.patientId =
  personId; // eslint-disable-line no-param-reassign

  if (result.RxPrescriptionV2.Medication.Drug &&
    result.RxPrescriptionV2.Medication.Drug.BrandName === undefined) {
    if (result.DrugName !== undefined) {
      result.RxPrescriptionV2.Medication.Drug.BrandName = // eslint-disable-line no-param-reassign
    result.DrugName;
    }
  }
  result.operation = 'created';
  result.integration = {};// eslint-disable-line no-param-reassign
  result.integration.sourceId = integrationEntity.SOURCE_ID;
  result.integration.groupId = integrationEntity.RX_INTEGRATION_GROUP_ID;
  result.integration.entityId = integrationEntity.PRESCRIPTION_INTEGRATION_ENTITY_ID;
  return result;
};

export const isMedication = (data) => {
  if (data.payload.medication !== undefined &&
    data.payload.medication.creatingPrescriptionId !== undefined) {
    let stopDate = data.payload.medication.stopDate.date;
    if (stopDate !== undefined) {
      stopDate = new Date(stopDate.split('T')[0]); //  As we have to compare date only.
      const newdate = new Date(stopDate.getFullYear(), stopDate.getMonth(), stopDate.getDate());
      const now = new Date();
      if (newdate <= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        //  Stopped medication
        return true;
      }
    }
    return false;
  }
  return true;
};

export const checkForSignOnly = (data) => {
  const pData = initialPrescriptionMapper(data);
  if (pData.data.PrescriptionStatus === types.PRESCRIPTION_SIGN_NOT_SEND) {
    return pData.data;
  }
  return null;
};
