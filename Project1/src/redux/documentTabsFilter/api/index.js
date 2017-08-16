// Reminder: exported functions must be named

export const getDrawers = () =>
  global.superagent
    .get('/Drawer?_pageSize=9999')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
