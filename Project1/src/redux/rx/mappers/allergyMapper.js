import objectMapper from 'object-mapper';
import * as integrationEntity from 'srs/redux/rx/constants/IntegrationEntities';

//  add,modify
const allergyAddMapper = {
  eventName: 'event',
  'payload.change': 'change', //  created,modified,deleted
  'payload.allergy.status': 'actionType', //  active, inactive
  'payload.allergy.allergyId.rcopiaId': 'allergy.AllergyExternalId',
  'payload.allergy.allergen.drugAllergen.groups[].name': 'allergy.AllergyGroup[].AllergyGroupName',
  'payload.allergy.allergen.drugAllergen.groups[].type': 'allergy.AllergyGroup[].AllergyGroupType',
  'payload.allergy.allergen.drugAllergen.groups[].groupAllergen.groupId.rcopiaId': 'allergy.AllergyGroup[].AllergyGroupExternalId',
  'payload.allergy.allergen.name': 'allergy.name',
  'payload.allergy.allergen.drugAllergen.drugId.rcopiaId': 'allergy.DrugExternalId',
  'payload.allergy.reaction': 'allergy.Severity.Reaction',
  'payload.allergy.onsetDate.date': 'allergy.OnSetDate',
  'payload.allergy.onsetDate.precision': 'allergy.Precision',
};

export const allergyMapper = (payload, patientId, encounterId) => {
  const result = objectMapper(payload, allergyAddMapper);

  result.integration = {};// eslint-disable-line no-param-reassign
  result.integration.sourceId = integrationEntity.SOURCE_ID;
  result.integration.groupId = integrationEntity.ALLERGY_INTEGRATION_GROUP_ID;
  result.integration.entityId = integrationEntity.ALLERGY_INTEGRATION_ENTITY_ID;

  switch (result.change) {
    case 'created':
      result.allergy.PatientId = patientId; // eslint-disable-line no-param-reassign
      if (encounterId !== '') {
        result.allergy.encounterId = encounterId;
      }
      result.operation = 'created';
      break;
    case 'modified':
      if (result.actionType === 'active') {
        result.allergy.IsActive = 1;
      } else {
        result.allergy.IsActive = 0;
      }
      result.allergy.ExternalId = result.allergy.AllergyExternalId;
      result.allergy.AllergyExternalId = null;
      result.operation = 'updated';
      break;
    case 'deleted':
      result.operation = 'deleted';
      result.allergy.ExternalId = payload.payload.deletedAllergyId.rcopiaId;
      return result;
    default:
      //  result.operation = 'invalid';
      return null;
  }

  //  group handle
  if (result.allergy.AllergyGroup.length > 0 &&
    result.allergy.AllergyGroup[0].AllergyGroupName === undefined) {
    result.allergy.AllergyGroup = [];  // eslint-disable-line
  }
  return result;
};
