import { normalize, schema } from 'normalizr';

const noTaskGridInfo = new schema.Entity('patientTrackingInfos', {}, { idAttribute: 'appointmentId' });

// Reminder: exported functions must be named
export function getNoTaskGridInfo(
  pageNumber,
  startDate,
  endDate,
  multipleProviderId,
  multipleLocationId,
  multipleRoomId,
  mulitplePatientStatusTypeId,
  patientStatusTypeQueryString,
  roomIdQueryString,
) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/patientTracking');

  if (startDate && endDate) {
    request = request
      .query({ PersonDeskDate: `>=${startDate}` })
      .query({ PersonDeskDate: `<${endDate}` });
  } else if (startDate) {
    request = request.query({ PersonDeskDate: startDate });
  }
  if (multipleProviderId && multipleProviderId !== '') {
    request = request.query({ PersonDeskId: multipleProviderId });
  }
  if (multipleLocationId && multipleLocationId !== '') {
    request = request.query({ 'LocationId-LocationId:missing': multipleLocationId });
    if (multipleRoomId && multipleRoomId !== '') {
      request = request.query(`${roomIdQueryString}=${multipleRoomId}`);
    }
  }
  if (patientStatusTypeQueryString && mulitplePatientStatusTypeId && mulitplePatientStatusTypeId !== '') {
    request = request.query('ActualStatus:exact=Checked In');
  }

  return request
    .query({ _include: 'PatientDemographics' })
    .query({ IsDeleted: false })
    .query({ _page: pageNumber })
    .query({ _pageSize: '30' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ patientTrackingInfos: data.results }, {
        patientTrackingInfos: new schema.Array(noTaskGridInfo),
      });

      normalized.stats = {
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        startIndex: data.startIndex,
        endIndex: data.endIndex,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      };

      return normalized;
    });
}
export const noTaskGridPatientCheckOut = request =>
  global.superagent
    .put(`/patientTracking/${request.id}`)
    .send({
      id: request.id,
      checkOutTime: new Date(),
      currentRoomId: request.currentRoomId,
      locationId: request.locationId,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
