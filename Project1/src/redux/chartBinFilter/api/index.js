// Reminder: exported functions must be named

export const getProviders = () =>
  global.superagent
    .get('/Provider?_pageSize=9999&_sort:asc=doctorName&entityTypeName:missing=true')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export const getLocations = () =>
  global.superagent
    .get('/Location?_pageSize=9999&_sort:asc=friendlyName')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export const getRooms = () =>
  global.superagent
    .get('/Room?_pageSize=9999&_sort:asc=Description')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export const getPatientStatusTypes = () =>
  global.superagent
    .get('/PatientTrackingStatus?isActive=true&_pageSize=9999&_sort:asc=description')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export function getAppointmentFilterInfo(userId) {
  return global.superagent
    .get('/UserDefaults')
    .query({ UserSecurityId: userId })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}
