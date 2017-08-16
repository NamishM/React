import { location } from './reducers';
import { watchLocationChange } from './sagas';

const composite = {
  Reducers: {
    location,
  },
  Sagas: {
    watchLocationChange,
  },
};

export default composite;
