import objectMapper from 'object-mapper';
import * as integrationEntity from 'srs/redux/rx/constants/IntegrationEntities';

const addPharmacyMapper = {
  eventName: 'event',
  'payload.action': 'actionType',
  'payload.pharmacy.pharmacyId.rcopiaId': 'RxPharmacyV2.ExternalId',
  'payload.pharmacy.ncpdpId.ncpdpId': 'RxPharmacyV2.NcpdpId',
  'payload.pharmacy.name': 'RxPharmacyV2.PharmacyName',
  'payload.pharmacy.address.address1': 'RxPharmacyV2.Address1',
  'payload.pharmacy.address.city': 'RxPharmacyV2.City',
  'payload.pharmacy.address.crossStreet': 'RxPharmacyV2.CrossStreet',
  'payload.pharmacy.address.stateOrProvince': 'RxPharmacyV2.State',
  'payload.pharmacy.address.postalCode': 'RxPharmacyV2.Zip',
  'payload.pharmacy.address.address2': 'RxPharmacyV2.Address2',
  'payload.pharmacy.is24Hour': 'RxPharmacyV2.Is24Hour',
  'payload.pharmacy.isElectronic': 'RxPharmacyV2.IsElectronic',
  'payload.pharmacy.isFax': 'RxPharmacyV2.IsFax',
  'payload.pharmacy.controlledSubstancesAllowed': 'RxPharmacyV2.IsControlledSubstancesAllowed',
  'payload.pharmacy.pharmacyTypes': 'RxPharmacyV2.PharmacyTypes',
  'payload.pharmacy.phones.fax': 'RxPharmacyV2.Fax',
  'payload.pharmacy.phones.work': 'RxPharmacyV2.Phone',
  'payload.pharmacy.displayName': 'RxPharmacyV2.DisplayName',
  'payload.pharmacy.emailAddress': 'RxPharmacyV2.EmailAddress',
};
const updatePharmacyMapper = {
  eventName: 'event',
  'payload.pharmacy.pharmacyId.rcopiaId': 'PatientPharmacy.ExternalId',
  1: 'PatientPharmacy.IsDefault',
};

const deletePharmacyMapper = {
  eventName: 'event',
  'payload.pharmacy.pharmacyId.rcopiaId': 'PatientPharmacy.ExternalId',
};

export const pharmacyMapper = (payload, personId, isUpdate) => {
  let result = '';

  if (!isUpdate) {
    switch (payload.payload.action) {
      case 'added':
        result = objectMapper(payload, addPharmacyMapper);
        result.RxPharmacyV2.PharmacyTypes = result.RxPharmacyV2.PharmacyTypes.join(',');
        result.RxPharmacyV2.PatientPharmacy = [];
        result.RxPharmacyV2.PatientPharmacy.push({ PersonId: personId, IsDefault: 1 });
        result.operation = 'created';
        break;
      case 'removed':
        result = objectMapper(payload, deletePharmacyMapper);
        result.PatientPharmacy.PersonId = personId;
        result.operation = 'deleted';
        break;
      default:
        //  result.operation = 'invalid';
        return null;
    }
  } else {
    if (Object.keys(payload.payload).length === 0) {
      return null;
    }
    result = objectMapper(payload, updatePharmacyMapper);
    result.PatientPharmacy.PersonId = personId;
    result.PatientPharmacy.IsDefault = 1;
    result.operation = 'updated';
  }
  result.integration = {};// eslint-disable-line no-param-reassign
  result.integration.sourceId = integrationEntity.SOURCE_ID;
  result.integration.groupId = integrationEntity.RX_INTEGRATION_GROUP_ID;
  result.integration.entityId = integrationEntity.PHARMACY_INTEGRATION_ENTITY_ID;

  return result;
};
