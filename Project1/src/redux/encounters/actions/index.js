import { generateActions } from 'srs/redux/appointments/actions';
import moduleName from '../constants/moduleName';

export const {
  getAppointmentsData,
  getNextPage,
  setAppointmentFilter,
  getAppointmentSucceeded,
  getAppointmentFailed,
  searchClick,
  appointmentView,
  onSelection,
  sortColumn,
  skipAppointmentNextDataFlow,
  clearAppointments,
} = generateActions(moduleName);
