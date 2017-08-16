import * as types from '../constants/ActionTypes';
import { CHARTBINFILTER_RESET_GRID,
  CHARTBINFILTER_APPOINTMENT_FILTER } from '../../chartBinFilter/constants/ActionTypes';

const initialState = {
  results: [],
  stats: {
    pageNumber: 0,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    totalPages: 0,
    totalResults: 0,
  },
  sort: {
    ids: [0, 1, 2, 3, 4, 5],
    precedence: [0, 1, 2, 3, 4, 5],
    columns: {
      0: {
        name: 'Name',
        label: 'Name',
        state: 'none',
      },
      1: {
        name: 'EncounterDoctorName',
        label: 'Provider',
        state: 'none',
      },
      2: {
        name: 'CurrentRoomDescription',
        label: 'Room',
        state: 'none',
      },
      3: {
        name: 'CurrentPatientStatusTypeDescription',
        label: 'Status',
        state: 'none',
      },
      4: {
        name: 'PersonDeskDate',
        label: 'Appt.',
        state: 'asc',
      },
      5: {
        name: 'CurrentPatientStatusElapsedTime',
        label: 'Duration',
        state: 'none',
      },
    },
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
};

const patientTracking = (state = initialState, action) => {
  switch (action.type) {
    case types.PATIENT_TRACKING_FETCH_REQUESTED:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.page,
        },
        isInfiniteLoading: true,
      };
    case types.PATIENT_TRACKING_FETCH_SUCCEEDED:
    {
      return {
        ...state,
        stats: {
          // TO DO: its a work around in case of no results next filter click was not working
          ...action.stats,
          totalPages: action.stats.totalPages === 0 ? 999 : action.stats.totalPages,
        },
        filters: {
          ...state.filters,
          page: action.stats.totalResults === 0 ? 0 : action.stats.pageNumber,
        },
        isInfiniteLoading: false,
        results: [
          ...state.results,
          ...action.result.patientTrackingInfos,
        ],
      };
    }
    case types.PATIENT_TRACKING_FETCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isInfiniteLoading: false,
      });
    case types.PATIENT_TRACKING_NEXT_PAGE:
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
    case 'LOGOUT_REQUESTED':
    case 'LOGOUT_SESSION_REMOTE_ENDED':
      return initialState;
    case types.REFRESH_PATIENT_TRACKING_DATA:
      return {
        ...initialState,
        filters: {
          ...state.filters,
          page: 0,
        },
        stats: {
          pageNumber: 0,
          pageSize: 0,
          startIndex: 0,
          endIndex: 0,
          totalPages: 999,
          totalResults: 0,
        },
      };
    case CHARTBINFILTER_RESET_GRID:
    case CHARTBINFILTER_APPOINTMENT_FILTER:
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
        sort: state.sort,
      };
    case types.PATIENT_TRACKING_SORT_COLUMN:
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
    case types.SKIP_NEXT_PATIENT_TRACKING_DATA:
      return Object.assign({}, state, {
        isInfiniteLoading: false,
      });
    default:
      return state;
  }
};

export default patientTracking;


export const getDenormalizedPatientTrackings = (state) => {
  const {
    patientTracking: {
      results: ids = [],
    },
    entities: {
      patientTrackingInfos = {},
      appointments = {},
      rooms = {},
    },
  } = state;
  return ids.map(id => ({
    name: patientTrackingInfos[id].name,
    doctorname: patientTrackingInfos[id].doctorName,
    id,
    encounterDate: patientTrackingInfos[id].personDeskDate,
    roomDescription: rooms[appointments[patientTrackingInfos[id].appointmentId].roomId] ?
      rooms[appointments[patientTrackingInfos[id].appointmentId].roomId].description : null,
    status: patientTrackingInfos[id].currentPatientStatusTypeDescription,
    duration: patientTrackingInfos[id].currentPatientStatusElapsedTime,
    color: patientTrackingInfos[id].color,
  }));
};

export const getSortOrder = ({ patientTracking: { sort: { ids = [], columns = {} } } }) =>
  ids.map(id =>
    ({ id, ...columns[id] }));
