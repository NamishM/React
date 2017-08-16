import { generateAppointmentReducer } from './appointments';

export const generateReducers = (prefix) => {
  const appointments = generateAppointmentReducer(prefix);
  return {
    [prefix.toLowerCase()]: appointments,
  };
};
