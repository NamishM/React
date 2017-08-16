import format from 'date-fns/format';
// Reminder: exported functions must be named
import { normalize, schema } from 'normalizr';

const demographic = new schema.Entity('demographics', {}, { idAttribute: 'personId' });
const ethnicity = new schema.Entity('ethnicities', {}, { idAttribute: 'ethnicityId' });
const primaryInsurance = new schema.Entity('primaryInsurances', {}, { idAttribute: 'companyId' });
const secondaryInsurance = new schema.Entity('secondaryInsurances', {}, { idAttribute: 'companyId' });
const provider = new schema.Entity('providers', {}, { idAttribute: 'personId' });
const race = new schema.Entity('races', {}, { idAttribute: 'raceId' });
const sourceOfPaymentCode = new schema.Entity('sopCodes', {}, { idAttribute: 'sopid' });

demographic.define({
  ethnicityInfo: ethnicity,
  primaryInsurance,
  secondaryInsurance,
  practiceProvider: provider,
  primaryCarePhysician: provider,
  referringPhysician: provider,
  sourceOfPaymentCodesInfo: new schema.Array(sourceOfPaymentCode),
  races: new schema.Array(race),
});

// As results from Demographic api is coming like
// { results: { patient: { firstname: 'deepak'...} } { patient: { firstname: 'brandon'...} } }
// but to get attributes at the level schema of demographic
// we need it like {results: { firstname: 'deepak'...} { firstname: 'brandon'...} }
// So i've removed one layer (patient) from the result from the API.
export const flatten = (obj) => {
  const value = [];
  for (const key of Object.keys(obj)) {
    value.push(obj[key].patient);
  }
  return value;
};

export function getPatientInfo(searchCriteria, pageNumber = 1, orderByColumns = []) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/demographic');
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
  let queryString = '';
  if (!(searchCriteria.firstName.trim() === undefined || searchCriteria.firstName.trim() === '')) {
    queryString = `${queryString}FirstName:startsWith=${searchCriteria.firstName.trim()}&`;
  }
  if (!(searchCriteria.lastName.trim() === undefined || searchCriteria.lastName.trim() === '')) {
    queryString = `${queryString}LastName:startsWith=${searchCriteria.lastName.trim()}&`;
  }
  if (!(searchCriteria.dob === undefined || searchCriteria.dob === '')) {
    queryString = `${queryString}BirthDate=${searchCriteria.dob}&`;
  }
  if (!(searchCriteria.sharedId === undefined || searchCriteria.sharedId === '')) {
    queryString = `${queryString}SharedId:startsWith=${searchCriteria.sharedId}&`;
  }
  if (!(searchCriteria.phone === undefined || searchCriteria.phone === '')) {
    queryString = `${queryString}Phone:startsWith=${searchCriteria.phone.replace(/\D+/g, '')}&`;
  }
  if (!(searchCriteria.ssn === undefined || searchCriteria.ssn === '')) {
    queryString = `${queryString}SSNO:startsWith=${searchCriteria.ssn.replace(/\D+/g, '')}&`;
  }
  queryString = `${queryString}_pageSize=10`;
  return request
    .query(queryString)
    .query({ _page: pageNumber })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);
      let normalized = null;
      if (data.results) {
        normalized = normalize({ demographics: flatten(data.results) }, {
          demographics: new schema.Array(demographic),
        });

        normalized.stats = {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          startIndex: data.startIndex,
          endIndex: data.endIndex,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        };
      }
      return normalized;
    });
}

// http://localhost/SRSAPI/Generic/Patient


export function getLatestEncounterDate(personId) {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  return global.superagent
    .get('/appointment?_sort:desc=PERSONDESKDATE')
    .query({ personId })
    .query({ PersonDeskDate: `<= ${format(nextDate, 'MM/DD/YYYY')}` })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}


// http://localhost/SRSAPI/Generic/appointment
