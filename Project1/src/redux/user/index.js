import * as Reducers from './reducers';
import {
  watchDataSourceRequested,
  loginFlow,
  synchUserActivity,
} from './sagas';

const composite = Object.assign({ Reducers }, {
  Sagas: {
    watchDataSourceRequested,
    loginFlow,
    synchUserActivity,
    // watchRedirectFromDesktop,
  },
});

export default composite;
