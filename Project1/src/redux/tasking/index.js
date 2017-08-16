import * as Reducers from './reducers';
import {
  watchForAppointmentFilterandReset,
  watchForTaskingActions,
  watchForTaskChangeSequence,
  watchForTaskSave,
  watchForPollingStartAndEnd,
  watchForTaskingRefresh,
  watchForGetFavoriteTask,
  watchForFavoriteTaskDelete,
  watchForFavoriteTaskCreate,
} from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchForAppointmentFilterandReset,
      watchForTaskingActions,
      watchForTaskChangeSequence,
      watchForTaskSave,
      watchForPollingStartAndEnd,
      watchForTaskingRefresh,
      watchForGetFavoriteTask,
      watchForFavoriteTaskDelete,
      watchForFavoriteTaskCreate,
    },
  },
);

export default composite;
