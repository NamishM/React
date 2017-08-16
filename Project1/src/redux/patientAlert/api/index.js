// Reminder: exported functions must be named

export const patientAlertReadById = personId =>
  global.superagent
    .get(`/PatientAlert/${personId}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export const patientAlertSaveUpdate = request =>
  global.superagent
    .post('/PatientAlert?')
    .send({
      personID: request.personId,
      alert: request.alertText,
      isPrivate: true,
      alertID: 1,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export const patientAlertDelete = personId =>
  global.superagent
    .del(`/PatientAlert/${personId}`)
    .set('Accept', 'application/json');

