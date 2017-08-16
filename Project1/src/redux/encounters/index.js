import { generateAppointment } from '../appointments';
import moduleName from './constants/moduleName';
import { encountersExtension } from './reducers/encountersExtension';

const encounters = generateAppointment(moduleName);

const encountersDefault = encounters.Reducers.encounters;

encounters.Reducers.encounters = (state, action) =>
  encountersDefault(encountersExtension(state, action), action);

export default encounters;
