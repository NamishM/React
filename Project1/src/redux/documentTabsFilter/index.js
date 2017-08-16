import * as Reducers from './reducers';
import { watchResetRequested } from './sagas';

const composite = {
  Reducers,
  Sagas: {
    watchResetRequested,
  },
};

export default composite;
