var config = { // eslint-disable-line no-var
  apiUri: 'http://localhost/Generic',
  userIsIdleTimeout: 120000, // 120000 = 2 minutes
  smartCodesOn: true,
};

// for unit test
if (typeof window !== 'undefined') {
  window.config = config;
} else {
  global.config = config;
}
