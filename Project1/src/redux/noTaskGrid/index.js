import * as Reducers from './reducers';
import { watchNoTaskGridRequested, noTaskGridNextPageFlow, watchForCheckOutActions }
  from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchNoTaskGridRequested,
      noTaskGridNextPageFlow,
      watchForCheckOutActions,
    },
  },
);

export default composite;
