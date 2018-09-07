import superagent from 'superagent';

export function getItems() {
  return superagent
    .get('/items')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).catalog);
}


export function getLoginDetails() {
  return superagent
    .get('/login')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).login);
}
