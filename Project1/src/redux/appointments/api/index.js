import { normalize, schema } from 'normalizr';

const appointment = new schema.Entity('appointments', {}, { idAttribute: 'encounterId' });
const demographic = new schema.Entity('demographics', {}, { idAttribute: 'personId' });
const ethnicity = new schema.Entity('ethnicities', {}, { idAttribute: 'ethnicityId' });
const primaryInsurance = new schema.Entity('primaryInsurances', {}, { idAttribute: 'companyId' });
const secondaryInsurance = new schema.Entity('secondaryInsurances', {}, { idAttribute: 'companyId' });
const provider = new schema.Entity('providers', {}, { idAttribute: 'personId' });
const race = new schema.Entity('races', {}, { idAttribute: 'raceId' });

appointment.define({
  patientDemographics: demographic,
});

demographic.define({
  ethnicityInfo: ethnicity,
  primaryInsurance,
  secondaryInsurance,
  practiceProvider: provider,
  primaryCarePhysician: provider,
  referringPhysician: provider,
  races: new schema.Array(race),
});

// Reminder: exported functions must be named
export function getAppointmentInfo(
  pageNumber,
  orderByColumns = [],
  startDate,
  endDate,
  multipleProviderId,
  multipleLocationId,
  multipleRoomId,
  multiplePatientStatusTypeId,
  patientStatusTypeQueryString,
  roomIdQueryString,
  personId,
  prefix,
) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/appointment');

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

  if (prefix.toLowerCase() === 'appointments') {
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
    if (multiplePatientStatusTypeId && multiplePatientStatusTypeId !== '') {
      request =
       request.query(`${patientStatusTypeQueryString}=${multiplePatientStatusTypeId}`);
    }
  }

  return request
    .query({ _include: 'PatientDemographics' })
    .query({ IsDeleted: false })
    .query({ _page: pageNumber })
    .query({ _pageSize: '30' })
    .query({ personId })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ appointments: data.results }, {
        appointments: new schema.Array(appointment),
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

// http://localhost/SRSAPI/Generic/appointment
