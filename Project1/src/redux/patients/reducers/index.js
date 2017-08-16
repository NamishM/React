import patientSearchData from './patientSearchData';
import { modelReducer, formReducer } from 'react-redux-form';

const model = {
  firstName: '',
  dob: '',
  phone: '',
  lastName: '',
  sharedId: '',
  ssn: '',
  ssnMask: '999-99-9999',
  phoneMask: '(999)999-9999',
};

const searchCriteria = modelReducer('searchCriteria', model);

const searchCriteriaForm = formReducer('searchCriteria', model);

export { patientSearchData, searchCriteria, searchCriteriaForm };
