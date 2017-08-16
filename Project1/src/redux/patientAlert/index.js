import * as Reducers from './reducers';
import { watchForPatientSelect, watchForSaveUpdateAlert, watchForDeleteAlert } from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: { watchForPatientSelect, watchForSaveUpdateAlert, watchForDeleteAlert },
  },
);

export default composite;
