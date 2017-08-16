import * as Reducers from './reducers';
import { initRx } from './actions';
import { watchDownloadPayload, watchUpdatePharmacyMapping, watchGetRxDetails, watchGetSettings }
  from './sagas';

const composite = Object.assign(
  { Reducers }, { init: (store, patientId) => {
    store.dispatch(
      initRx(patientId),
    );
  } },
  {
    Sagas: {
      watchDownloadPayload,
      watchUpdatePharmacyMapping,
      watchGetRxDetails,
      watchGetSettings },
  },
);

export default composite;
