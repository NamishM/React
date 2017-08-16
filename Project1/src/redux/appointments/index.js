import { generateReducers } from './reducers';
import { generateSagas } from './sagas';

export const generateAppointment = (prefix) => {
  const { watchAppointmentsRequested, nextPageFlow } = generateSagas(prefix);

  return {
    Reducers: generateReducers(prefix),
    Sagas: {
      watchAppointmentsRequested,
      nextPageFlow,
    },
  };
};
