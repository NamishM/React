import objectMapper from 'object-mapper';
import * as integrationEntity from 'srs/redux/rx/constants/IntegrationEntities';

const medicationAddMapper = {
  eventName: 'event',
  'payload.medication.medicationId.rcopiaId': 'RxMedicationV2.MedicationExternalId',
  'payload.medication.startDate.date': 'RxMedicationV2.StartDate',
  'payload.medication.stopDate.date': 'RxMedicationV2.StopDate',
  'payload.medication.lastRefillDate.date': 'RxMedicationV2.LastRefillDate',

  'payload.medication.sig.dose': 'RxMedicationV2.Sig.Dose',
  'payload.medication.sig.doseAction': 'RxMedicationV2.Sig.Action',
  'payload.medication.sig.doseFrequency': 'RxMedicationV2.Sig.DoseTiming',
  'payload.medication.sig.doseOther': 'RxMedicationV2.Sig.DoseOther',
  'payload.medication.sig.doseUnit': 'RxMedicationV2.Sig.DoseUnit',
  'payload.medication.sig.route': 'RxMedicationV2.Sig.Route',
  'payload.medication.sig.substitutionPermitted': 'RxMedicationV2.Sig.SubstitutionPermitted',
  'payload.medication.sig.freeTextDirections': 'RxMedicationV2.Sig.Instructions',
  'payload.medication.sig.notesToPharmacist': 'RxMedicationV2.Sig.OtherNotes',
  'payload.medication.sig.duration': 'RxMedicationV2.Sig.Duration',

  'payload.medication.quantity': 'RxMedicationV2.Sig.Quantity',
  'payload.medication.quantityUnit': 'RxMedicationV2.Sig.QuantityUnit',
  'payload.medication.refills': 'RxMedicationV2.Sig.Refills',
  'payload.medication.officeNotes': 'RxMedicationV2.Note',

  'payload.medication.drug.drugId.rcopiaId': 'RxMedicationV2.Drug.ExternalId',
  'payload.medication.drug.drugId.ndcId': 'RxMedicationV2.Drug.NDCId',
  'payload.medication.drug.drugId.fdbMedId': 'RxMedicationV2.Drug.FirstDataBankMedId',
  'payload.medication.drug.drugId.rxNorm.rxNormCui': 'RxMedicationV2.Drug.RxNormCode',
  'payload.medication.drug.drugId.rxNorm.rxNormType': 'RxMedicationV2.Drug.RxnormIdType',

  'payload.medication.drug.brandName': 'RxMedicationV2.Drug.BrandName',
  'payload.medication.drug.drugSchedule': 'RxMedicationV2.Drug.Schedule',
  'payload.medication.drug.form': 'RxMedicationV2.Drug.Form',
  'payload.medication.drug.route': 'RxMedicationV2.Drug.RouteCode',
  'payload.medication.drug.strength': 'RxMedicationV2.Drug.Strength',
  'payload.medication.drug.codingLevel': 'RxMedicationV2.Drug.CodingLevel',
  'payload.medication.drug.description': 'RxMedicationV2.Drug.DrugDescription',

  'payload.medication.drug.isSupply': 'RxMedicationV2.Drug.IsSupply',
  'payload.medication.drug.isCompound': 'RxMedicationV2.Drug.IsCompound',
  'payload.medication.drug.name': 'DrugName',
  'payload.medication.status': 'actionType',
  'payload.change': 'change',
};

export const medicationMapper = (payload, personId, encounterId) => {
  const result = objectMapper(payload, medicationAddMapper);

  result.integration = {};// eslint-disable-line no-param-reassign
  result.integration.sourceId = integrationEntity.SOURCE_ID;
  result.integration.groupId = integrationEntity.RX_INTEGRATION_GROUP_ID;
  result.integration.entityId = integrationEntity.MEDICATION_INTEGRATION_ENTITY_ID;

  if (result.RxMedicationV2.Drug && result.RxMedicationV2.Drug.BrandName === undefined) {
    if (result.DrugName !== undefined) {
      result.RxMedicationV2.Drug.BrandName = // eslint-disable-line no-param-reassign
    result.DrugName;
    }
  }
  switch (result.change) {
    case 'created':
      result.RxMedicationV2.PatientId = personId; // eslint-disable-line no-param-reassign
      if (encounterId !== undefined) {
        result.RxMedicationV2.encounterId = encounterId;
      }
      result.operation = 'created';
      break;
    case 'modified':
      result.RxMedicationV2.ExternalId = result.RxMedicationV2.MedicationExternalId;
      result.RxMedicationV2.MedicationExternalId = null;
      result.operation = 'updated';
      break;
    case 'deleted':
      result.operation = 'deleted';
      result.RxMedicationV2.ExternalId = payload.payload.deletedMedicationId.rcopiaId;
      return result;
    default:
      //  result.operation = 'invalid';
      return null;
  }

  return result;
};
