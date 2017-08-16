import objectMapper from 'object-mapper';

//  add,modify
const patientConsentAddMapper = {
  eventName: 'event',
  'payload.consented': 'PatientConsent.IsConsent',
  'payload.consentEntity': 'PatientConsent.ConsentType',
};

export const patientConsentMapper = (payload, personId) => {
  let result = '';
  result = objectMapper(payload, patientConsentAddMapper);
  result.PatientConsent.PatientId = personId; // eslint-disable-line no-param-reassign
  if (result.PatientConsent.ConsentType === 'medicationHistory') {
    result.PatientConsent.ConsentType = 'MEDICATIONHIST';
  }
  result.operation = 'created';
  return result;
};
