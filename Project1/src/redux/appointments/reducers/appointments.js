import { generateActionTypes } from '../constants/ActionTypes';
import { filterJoin } from '../../../common/utilities';
import {
  CHARTBINFILTER_APPOINTMENT_FILTER,
  CHARTBINFILTER_RESET_GRID,
} from '../../chartBinFilter/constants/ActionTypes';
import {
  LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED,
} from '../../user/constants/ActionTypes';
import { createSelector } from 'reselect';

const initialState = {
  errorMessage: '',
  textValue: 'Search',
  isInfiniteLoading: false,
  selectedAppointmentId: null,
  results: [],
  filters: {
    page: 0,
    startDate: null,
    endDate: null,
    personId: null,
  },
  stats: {
    // TODO: keep paging stats so we can check our limits in APPOINTMENT_NEXT_PAGE
    pageNumber: 0, // TODO: Redundant
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  sort: {
    ids: [0, 1, 2, 3],
    precedence: [0, 1, 2, 3],
    columns: {
      0: {
        name: 'PersonDeskDate',
        label: 'Time',
        state: 'asc',
      },
      1: {
        name: 'Name',
        label: 'Name',
        state: 'none',
      },
      2: {
        name: 'APPTTYPE',
        label: 'Reason',
        state: 'none',
      },
      3: {
        name: '',
        label: 'BirthDate',
        state: 'none',
      },
    },
  },
};

export const generateAppointmentReducer = (prefix) => {
  const types = generateActionTypes(prefix);
  return (state = initialState, action) => {
    switch (action.type) {
      case types.APPOINTMENT_FETCH_REQUESTED:
        return {
          ...state,
          filters: {
            ...state.filters,
            page: action.page,
          },
          isInfiniteLoading: true,
        };
      case types.APPOINTMENT_FETCH_SUCCEEDED:
        return {
          ...state,
          errorMessage: '',
          textValue: 'Appointments', // TODO: What is this?
          isInfiniteLoading: false,
          stats: {
            // TO DO: its a work around in case of no results next filter click was not working
            ...action.stats,
            totalPages: action.stats.totalPages === 0 ? 999 : action.stats.totalPages,
          },
          filters: {
            ...state.filters,
            page: action.stats.totalResults === 0 ? 0 : action.stats.pageNumber,
          },
          selectedAppointmentId:
            state.selectedAppointmentId === null && action.result.appointments.length > 0 ?
              action.result.appointments[0] : state.selectedAppointmentId,
          // TODO: This is probably fundamentally a bad idea
          // Reducers should explicitly control all state
          // The reducer is trusting the API to define it's object's
          // properties. :-(
          results: [
            ...state.results,
            ...action.result.appointments,
          ],
        };
      case types.APPOINTMENT_NEXT_PAGE:
        return {
          ...state,
          filters: {
            ...state.filters,
            // Limit to total available pages
            // paging starts from page == 1,
            // because appointment api gives result same for page = 0 and page = 1
            page: state.filters.page === 0 ||
                state.filters.page + 1 < state.stats.totalPages
              ? state.filters.page + 1 : state.stats.totalPages,
          },
        };
      case types.SKIP_NEXT_APPOINTMENT_DATA:
        return Object.assign({}, state, {
          isInfiniteLoading: false,
        });
      case types.APPOINTMENT_FETCH_FAILED:
        return {
          ...state,
          message: 'error in API response',
        };
      case types.APPOINTMENT_SELECTION:
        return {
          ...state,
          selectedAppointmentId: action.id,
        };
      case CHARTBINFILTER_APPOINTMENT_FILTER:
      case CHARTBINFILTER_RESET_GRID:
        return {
          ...state,
          filters: {
            ...state.filters,
            page: 0,
          },
          results: [],
          stats: {
            pageNumber: 0,
            pageSize: 0,
            startIndex: 0,
            endIndex: 0,
            totalPages: 999,
            totalResults: 0,
          },
          selectedAppointmentId: null,
          sort: state.sort,
        };
      case types.APPOINTMENT_SORT_COLUMN:
        return {
          ...state,
          filters: {
            ...state.filters,
            page: 0,
          },
          results: [],
          stats: {
            pageNumber: 0,
            pageSize: 0,
            startIndex: 0,
            endIndex: 0,
            totalPages: 999,
            totalResults: 0,
          },
          selectedAppointmentId: null,
          sort: {
            ...state.sort,
            columns: state.sort.ids.reduce((prev, id) => {
              let newState = 'none';

              if (id === parseInt(action.sortedBy, 10)) {
                switch (state.sort.columns[id].state) {
                  case 'none':
                    newState = 'asc';
                    break;
                  case 'asc':
                    newState = 'desc';
                    break;
                  case 'desc':
                  default:
                    newState = 'none';
                    break;
                }
              }

              prev[id] = { // eslint-disable-line no-param-reassign
                ...state.sort.columns[id],
                state: newState,
              };

              return prev;
            }, {}),
          },
        };
      case types.APPOINTMENT_SET_FILTER:
        return {
          ...state,
          filters: {
            ...state.filters,
            startDate: action.startDate,
            endDate: action.endDate,
            personId: action.personId,
          },
        };
      case types.APPOINTMENT_CLEAR:
        return {
          ...state,
          errorMessage: '',
          textValue: 'Search',
          selectedAppointmentId: null,
          results: [],
          filters: {
            ...state.filters,
            page: 1,
          },
          stats: {
            pageNumber: 0,
            pageSize: 0,
            startIndex: 0,
            endIndex: 0,
            totalPages: 0,
            totalResults: 0,
          },
        };
      case LOGOUT_REQUESTED:
      case LOGOUT_SESSION_REMOTE_ENDED:
        return initialState;
      default:
        return state;
    }
  };
};

const getEncounterId = state => state.selectedChart.encounterId;
const getAppointmentIds = state => state.appointments.results;
const getDemographics = state => state.entities.demographics;
const getAppointments = state => state.entities.appointments;
const getRooms = state => state.entities.rooms;
const getSort = state => state.appointments.sort;

export const getDenormalizedAppointments = createSelector(
  [
    getEncounterId,
    getAppointmentIds,
    getDemographics,
    getAppointments,
    getRooms,
  ],
  (
    encounterId,
    ids,
    demographics,
    appointments,
    rooms,
  ) => ids.map(id => ({
    name: filterJoin(', ',
      demographics[
        appointments[id].patientDemographics
      ].lastName,
      demographics[
        appointments[id].patientDemographics
      ].firstName,
    ),
    id,
    visitType: appointments[id].reasonCode,
    time: appointments[id].personDeskDate,
    dob: demographics[
      appointments[id].patientDemographics
    ].birthDate,
    isSelected: encounterId === id,
    colorCode: appointments[id].color,
    personId: appointments[id].personId,
    roomDescription: rooms[appointments[id].roomId] ?
      rooms[appointments[id].roomId].description : null,
    doctorName: appointments[id].doctorName,
  })),
);

export const getSortOrder = createSelector(
  [getSort],
  ({ ids = [], columns = {} }) => ids.map(id =>
    ({ id, ...columns[id] }),
  ),
);
