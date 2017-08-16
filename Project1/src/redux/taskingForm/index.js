import * as Reducers from './reducers';
import {
  watchForTaskingFormVisible,
} from './sagas';

const composite = {
  Reducers,
  Sagas: {
    watchForTaskingFormVisible,
  },
};

export default composite;
