export function getRoomTransactiontoUpdate(request) {
  return global.superagent
    .get('/PatientRoomStatus')
    .query({ encounterId: request.encounterId })
    .query({ _pageSize: '999' })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export const updateRoom = (transactionId, request) =>
  global.superagent
    .put(`/PatientRoomStatus/${transactionId}`)
    .send({
      roomId: request.newRoomId,
      encounterId: request.encounterId,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export const saveRoom = ({ roomId, encounterId }) =>
  global.superagent
    .post('/PatientRoomStatus/')
    .send({
      roomId,
      encounterId,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export const getUpdatedTask = encId =>
  global.superagent
    .get('/tasking')
    .query({ encounterId: encId })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

