import App from './containers/App';
import LogoutButton from './containers/LogoutButton';
import { getDataSources, getMaxLoginRetries } from 'srs/redux/userRx/actions';

const composite = {
  App,
  LogoutButton,
  init: (store) => {
    store.dispatch(getDataSources());
    store.dispatch(getMaxLoginRetries());
  },
};

export default composite;
