import { createUserManager } from 'redux-oidc';
import { OIDC_CALLBACKROUTE } from './constants';
import { basePath, queryString } from '../common/utilities';

let appUrl = `${window.location.protocol}//${window.location.hostname}`;
if (window.location.port) {
  appUrl += `:${window.location.port}`;
}
appUrl += basePath;

// code here will disable silent renew if access_token is passed in
export const ehrParams = queryString.parse(window.location.search);
// todo: add check here to ensure we also have userId and dataSource from thick client
export const isLoadedWithAccessToken = (ehrParams.access_token !== undefined);

const config = {
  client_id: global.config.idSvr.clientId,
  authority: global.config.idSvr.authority,
  redirect_uri: `${appUrl}${OIDC_CALLBACKROUTE}`,
  post_logout_redirect_uri: appUrl,
  response_type: 'id_token token',
  scope: `openid ${global.config.idSvr.scopes}`,
  // silent renew will get a new access_token via an iframe
  // just prior to the old access_token expiring (60 seconds prior)
  silent_redirect_uri: `${appUrl}silent_renew`,
  automaticSilentRenew: !isLoadedWithAccessToken,
  // this will allow all the OIDC protocol claims to be visible in the window.
  // normally a client app wouldn't care about them or want them taking up space
  filterProtocolClaims: true,
  // this will use the user info endpoint if it's an OIDC request and there's an access_token
  loadUserInfo: true,
  // note: if loaded via EHR, do we care about the expiration notification?
  // maybe we should set the value high since EHR should handle this
  accessTokenExpiringNotificationTime: global.config.timeOutPopUpDisplyBefore,
};

const createMock = () => (
  {
    signinRedirect: () => {},
    signoutRedirect: () => {},
  }
);

// todo: should mock in unit tests and perhaps inject userMgr
const userManager = !global.inTest ? createUserManager(config) : createMock();

const oidcSessionKey = `oidc.user:${global.config.idSvr.authority}:${global.config.idSvr.clientId}`;

export { userManager, oidcSessionKey };
