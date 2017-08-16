import * as Reducers from './reducers';
import { watchPatientRequested, watchPatientSelection, getNextPageFlow, sortFlow }
  from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchPatientRequested,
      watchPatientSelection,
      getNextPageFlow,
      sortFlow,
    },
  },
);

export default composite;
