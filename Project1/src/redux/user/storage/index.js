import sessionStorageSynch from '../../../utilities/sessionStorageSynch';
import { oidcSessionKey } from '../../../auth/oidc';


export function broadcastLogout() {
  // this sessionKey doesn't exist but removeItem will broadcast the event
  // and other tabs can listen for it.
  sessionStorageSynch.removeItem('handleLogout');
}

export function broadcastOidcTokenUpdate() {
  const oidcToken = sessionStorage.getItem(oidcSessionKey);
  sessionStorageSynch.setItem(oidcSessionKey, oidcToken);
}

export function receiveOidcTokenUpdate(oidcToken) {
  global.sessionStorage.setItem(oidcSessionKey, JSON.stringify(oidcToken));
}

export function broadcastUserActive() {
  sessionStorageSynch.broadcast('userIsActive');
}

export function broadcastSessionExpiring(message) {
  sessionStorageSynch.broadcast('sessionExpiring', message);
}

export function broadcastSessionContinue() {
  sessionStorageSynch.broadcast('sessionContinue');
}
