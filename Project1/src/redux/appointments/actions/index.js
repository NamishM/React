import { generateActionTypes } from '../constants/ActionTypes';

export const generateActions = (prefix) => {
  const types = generateActionTypes(prefix);

  return {
    getAppointmentsData: (
      page,
      sortColumns,
      sortColumnPrecedence,
      startDate,
      endDate,
      personId,
    ) => ({
      type: types.APPOINTMENT_FETCH_REQUESTED,
      page,
      sortColumns,
      sortColumnPrecedence,
      startDate,
      endDate,
      personId,
    }),

    getNextPage: () => ({ type: types.APPOINTMENT_NEXT_PAGE }),

    setAppointmentFilter: (startDate, endDate, personId) => ({
      type: types.APPOINTMENT_SET_FILTER,
      startDate,
      endDate,
      personId,
    }),

    getAppointmentSucceeded: (result, entities, stats) => ({
      type: types.APPOINTMENT_FETCH_SUCCEEDED,
      result,
      entities,
      stats,
    }),

    getAppointmentFailed: (message = 'error in API response') => ({
      type: types.APPOINTMENT_FETCH_FAILED,
      message,
    }),

    searchClick: () => ({
      type: types.APPOINTMENT_SEARCH_VIEW,
    }),

    appointmentView: () => ({
      type: types.APPOINTMENT_VIEW,
    }),

    onSelection: (id = -1) => ({
      type: types.APPOINTMENT_SELECTION,
      id,
    }),

    sortColumn: sortedBy => ({
      type: types.APPOINTMENT_SORT_COLUMN,
      sortedBy,
    }),

    skipAppointmentNextDataFlow: () => ({
      type: types.SKIP_NEXT_APPOINTMENT_DATA,
    }),

    clearAppointments: () => ({
      type: types.APPOINTMENT_CLEAR,
    }),
  };
};
