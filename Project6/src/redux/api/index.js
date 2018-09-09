import superagent from 'superagent';

export function getLoginDetails() {
  return superagent
    .get('/graphql')
    .query({ query: '{login {name password} }' })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).data.login);
}

export function getItems() {
  return superagent
    .get('https://swapi.co/api/people/')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function getPlanetsItem(url) {
  return superagent
    .get(url)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}
