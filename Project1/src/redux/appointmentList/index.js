import { generateAppointment } from '../appointments';
import moduleName from './constants/moduleName';

const encounters = generateAppointment(moduleName);

export default encounters;
