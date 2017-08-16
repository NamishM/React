var config = { // eslint-disable-line no-var
  apiUri: 'http://localhost/SRSAPI/Generic',
  rcopiaBaseUriArray: ['https://web3.staging.drfirst.com/cdn/df-widgets.all.min.js'],
  iDashTemplateId: 'mobile',
  rcopiaTimeout: 1440,
  timeOutPopUpDisplyBefore: 60,
  RcopiaUsername: 'sprovider88', // To be removed after user registration.
  userIsIdleTimeout: 120000, // 120000 = 2 minutes
  idSvr: {
    authority: 'http://localhost/SRSIdentityServer',
    clientId: 'srs.anywhere',
    scopes: 'srsclient',
  },
};

// for unit test
if (typeof window !== 'undefined') {
  window.config = config;
} else {
  global.config = config;
}
