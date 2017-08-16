import * as Reducers from './reducers';
import {
  watchDataSourceRequested,
  maxLoginRetries,
  loginFlow,
  watchRedirectFromDesktop,
  watchforLoginSuccess,
} from './sagas';

const composite = Object.assign({ Reducers }, {
  Sagas: {
    watchDataSourceRequested,
    maxLoginRetries,
    loginFlow,
    watchRedirectFromDesktop,
    watchforLoginSuccess,
  },
});

export default composite;
