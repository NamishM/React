import { normalize, schema } from 'normalizr';

const patientTrackingInfo = new schema.Entity('patientTrackingInfos', {}, { idAttribute: 'appointmentId' });

// Reminder: exported functions must be named
export function getPatientTrackingInfo(
  pageNumber,
  orderByColumns = [],
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

  request = orderByColumns.reduce(
    (prev, next) => {
      if (next.state === 'none') {
        return prev;
      }
      const param = {};
      const key = `_sort:${next.state}`;
      param[key] = next.name;
      return prev.query(param);
    },
    request,
  );
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
  if (mulitplePatientStatusTypeId && mulitplePatientStatusTypeId !== '') {
    request =
     request.query(`${patientStatusTypeQueryString}=${mulitplePatientStatusTypeId}`);
  }

  return request
    .query({ IsDeleted: false })
    .query({ _page: pageNumber })
    .query({ _pageSize: '30' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ patientTrackingInfos: data.results }, {
        patientTrackingInfos: new schema.Array(patientTrackingInfo),
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

// http://localhost/SRSAPI/Generic/patientTracking
