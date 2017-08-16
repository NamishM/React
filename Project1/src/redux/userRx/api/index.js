// Reminder: exported functions must be named
export const getDataSource = () =>
  global.superagent
    .get('/DataSource')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

export const refresh = token =>
  global.superagent
    .post('/Token/Refresh')
    .set('Authorization', token)
    .then(resp => resp.text);

export const login = (userName, password, dataSourceId) =>
  global.superagent
    .post('/Token')
    .send({ userName, password, dataSourceId })
    .set('Accept', 'application/json')
    .then(resp => resp.text);

export const logout = jti =>
  global.superagent
    .del(`/Token/${jti}`)
    .set('Accept', 'application/json');

export const getIDashUrl = userId =>
  global.superagent
    .get(`/UserProfile/${userId}?_include=clinicalSummarySource,desktopPrimary,desktopAlternate`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export const getAvailableProperty = () =>
  global.superagent
    .get('/AvailableProperty?PropertyName=maxretries')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);

// export default getDataSource

// http://localhost/SRSAPI/Generic/DataSource
