import sessionStorageSynch from '../../../utilities/sessionStorageSynch';

export function removeToken() {
  sessionStorageSynch.removeItem('token');
}

export function retrieveToken() {
  return JSON.parse(sessionStorageSynch.getItem('token'));
}

export function storeToken(encodedToken) {
  sessionStorageSynch.setItem('token', JSON.stringify(encodedToken));
}

