import { modelReducer, formReducer } from 'react-redux-form';
import { login } from './login';

const model = {
  userName: '',
  password: '',
  isEmergencyAccess: false,
  dataSourceId: null,
};

const user = modelReducer('user', model);

const userForm = formReducer('user', model);

export { login, user, userForm };
