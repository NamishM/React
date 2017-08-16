import format from 'date-fns/format';

export function getPatientInfo(personId) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  const request = global.superagent.get(`/demographic/${personId}`);
  return request
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}

export function getLatestEncounter(personId, encounterId) {
  if (encounterId) {
    return global.superagent
      .get(`/appointment/${encounterId}`)
      .then(resp => JSON.parse(resp.text));
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  return global.superagent
    .get('/appointment?_sort:desc=PERSONDESKDATE&_pageSize=1')
    .query({ personId })
    .query({ PersonDeskDate: `<= ${format(nextDate, 'MM/DD/YYYY')}` })
    .set('Accept', 'application/json')
    .then((resp) => {
      const results = JSON.parse(resp.text).results;
      return results.length > 0 ? results[0] : null;
    });
}
