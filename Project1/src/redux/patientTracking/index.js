import * as Reducers from './reducers';
import { watchPatientTrackingRequested, patientTrackingNextPageFlow }
  from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchPatientTrackingRequested,
      patientTrackingNextPageFlow,
    },
  },
);

export default composite;
