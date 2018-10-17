import superagent from 'superagent';
import { loginData } from '../../data/login';

/*
export function getLoginDetails() { // commented out because we cannot host and call API w/o expressJs
  return superagent
    .get('/graphql')
    .query({ query: '{login {name password} }' })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).data.login);
} */

// get data from login json maintained locally
export function getLoginDetails() {
  return JSON.parse(loginData).data.login;
}

export function getItems() {
  return superagent
    .get('https://swapi.co/api/people/')
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function getPlanetsItem(url: any) {
  return superagent
    .get(url)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}
