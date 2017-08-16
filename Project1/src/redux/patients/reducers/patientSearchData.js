import * as types from '../constants/ActionTypes';
import { filterJoin } from '../../../common/utilities';
import format from 'date-fns/format';
import { SELECTED_CHART_CLEAR } from '../../selectedChart/constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';

const initialState = {
  searchCriteria: '',
  errorMessage: '',
  hasAdvanceSearch: false,
  selectedPersonId: null,
  selectedAppointmentId: '',
  results: [],
  entities: {
    demographics: {},
    ethnicities: {},
    primaryInsurances: {},
    secondaryInsurances: {},
    providers: {},
    races: {},
    sopCodes: {},
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
  isDateFieldView: false,
  selectedPatientDate: '',
  selectedPatientName: '',
  allField: '',
  sort: {
    ids: [0, 1],
    precedence: [0, 1],
    columns: {
      0: {
        name: 'LastName',
        label: 'Name',
        state: 'asc',
      },
      1: {
        name: 'BirthDate',
        label: 'Birth Date',
        state: 'none',
      },
    },
  },
  isInfiniteLoading: false,
  filters: {
    page: 0,
  },
  islastPageArrived: true,
};

const patientSearchData = (state = initialState, action) => {
  switch (action.type) {
    case types.ADVANCE_SEARCH_TOGGLE:
    {
      let allnewField = '';
      const fname = action.searchCriteria.firstName;
      const lname = action.searchCriteria.lastName;
      const dob = action.searchCriteria.dob;
      const phone = action.searchCriteria.phone;
      const sid = action.searchCriteria.sharedId;
      if (fname !== '') {
        allnewField = `${fname}; `;
      }
      if (lname !== '') {
        allnewField = `${allnewField}${lname}; `;
      }
      if (dob !== '') {
        allnewField = `${allnewField}${dob ? format(dob, 'MM/DD/YYYY') : ''}; `;
      }
      if (sid !== '') {
        allnewField = `${allnewField}${sid}; `;
      }
      if (!(phone === '' || phone === '(___)___-____')) {
        allnewField = `${allnewField}${phone}; `;
      }
      allnewField = allnewField.substring(0, ((allnewField.length) - 2));
      return Object.assign({}, state, {
        hasAdvanceSearch: !state.hasAdvanceSearch,
        allField: allnewField,
        isInfiniteLoading: false,
      });
    }
    case types.DATE_VIEW_CHANGE:
      return Object.assign({}, state, {
        isDateFieldView: action.isDate,
      });
    case types.CLEAR_FIELDS:
      return Object.assign({}, state, {
        isDateFieldView: false,
        allField: '',
      });
    case types.SEARCH_INIT:
      return Object.assign({}, state, {
        selectedPersonId: null,
        selectedAppointmentId: '',
        selectedPatientDate: '',
        selectedPatientName: '',
        results: [],
        entities: {
          demographics: {},
          ethnicities: {},
          primaryInsurances: {},
          secondaryInsurances: {},
          providers: {},
          races: {},
          sopCodes: {},
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
          ids: [0, 1],
          precedence: [0, 1],
          columns: {
            0: {
              name: 'LastName',
              label: 'Name',
              state: 'asc',
            },
            1: {
              name: 'BirthDate',
              label: 'Birth Date',
              state: 'none',
            },
          },
        },
        filters: {
          page: action.page,
        },
        islastPageArrived: false,
      });
    case types.SEARCH_SUCCEEDED:
    {
      let name = '';
      if (state.filters.page === 1) {
        const patient = action.result.demographics.length > 0 ?
          action.entities.demographics[action.result.demographics[0]] :
          {
            firstName: '',
            lastName: '',
          };
          // case, if any of firstname or lastname is an empty string is handled
        if (patient.lastName !== '') {
          name = `${name}${patient.lastName}`;
          if (patient.firstName !== '') {
            name = `${name}, ${patient.firstName}`;
          }
        }
      }
      return {
        ...state,
        stats: {
          ...action.stats,
        },
        isInfiniteLoading: false,
        selectedPersonId:
            state.selectedPersonId === null &&
            action.result.demographics !== undefined && action.result.demographics.length > 0 ?
              action.result.demographics[0] : state.selectedPersonId,
        // TODO: remove selectedPatientName as
        // we can just normalize the name in the getSelectedPatient selector
        selectedPatientName: state.filters.page === 1 ? name : state.selectedPatientName,
        // TODO: This is probably fundamentally a bad idea
        // Reducers should explicitly control all state
        // The reducer is trusting the API to define it's object's
        // properties. :-(
        results: [
          ...state.results,
          ...action.result.demographics,
        ],
        entities: {
          demographics: {
            ...state.entities.demographics,
            ...action.entities.demographics,
          },
          ethnicities: {
            ...state.entities.ethnicities,
            ...action.entities.ethnicities,
          },
          primaryInsurances: {
            ...state.entities.primaryInsurances,
            ...action.entities.primaryInsurances,
          },
          secondaryInsurances: {
            ...state.entities.secondaryInsurances,
            ...action.entities.secondaryInsurances,
          },
          providers: {
            ...state.entities.providers,
            ...action.entities.providers,
          },
          races: {
            ...state.entities.races,
            ...action.entities.races,
          },
          sopCodes: {
            ...state.entities.sopCodes,
            ...state.entities.sopCodes,
          },
        },
      };
    }
    case types.SEARCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: 'Error',
        isInfiniteLoading: false,
        filters: {
          page: 0,
        },
      });
    case types.PATIENT_SELECTION:
    {
      const patient = state.entities.demographics[action.id] ?
        state.entities.demographics[action.id] :
        {
          firstName: '',
          lastName: '',
        };
      let name = '';
      // case, if any of firstname or lastname is an empty string is handled
      if (patient.lastName !== '') {
        name = `${name}${patient.lastName}`;
        if (patient.firstName !== '') {
          name = `${name}, ${patient.firstName}`;
        }
      }
      return {
        ...state,
        selectedPersonId: action.id,
        selectedPatientName: name,
      };
    }
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    case SELECTED_CHART_CLEAR:
    case types.APPOINTMENT_VIEW:
      return {
        ...state,
        results: [],
        entities: {
          demographics: {},
          ethnicities: {},
          primaryInsurances: {},
          secondaryInsurances: {},
          providers: {},
          races: {},
          patientNextofKins: {},
          sopCodes: {},
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
          ids: [0, 1],
          precedence: [0, 1],
          columns: {
            0: {
              name: 'LastName',
              label: 'Name',
              state: 'asc',
            },
            1: {
              name: 'BirthDate',
              label: 'Birth Date',
              state: 'none',
            },
          },
        },
        selectedPatientDate: '',
        selectedPatientName: '',
        isInfiniteLoading: false,
        filters: {
          page: 0,
        },
      };
    case types.SORT_COLUMN:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 0,
        },
        results: [],
        entities: {
          demographics: {},
          ethnicities: {},
          primaryInsurances: {},
          secondaryInsurances: {},
          providers: {},
          races: {},
          patientNextofKins: {},
          sopCodes: {},
        },
        stats: {
          pageNumber: 0,
          pageSize: 0,
          startIndex: 0,
          endIndex: 0,
          totalPages: 0,
          totalResults: 0,
        },
        selectedPatientDate: '',
        selectedPatientName: '',
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
    case types.LATEST_ENCOUNTER_FETCH_SUCCEEDED:
      return {
        ...state,
        selectedPatientDate: action.encounter.personDeskDate,
        selectedAppointmentId: action.encounter.encounterId,
      };
    case types.LATEST_ENCOUNTER_FETCH_FAILED:
      return Object.assign({}, state, {
        errorMessage: 'Error',
      });
    case types.GET_NEXT_PATIENT_DATA:
      return {
        ...state,
        isInfiniteLoading: true,
        filters: {
          ...state.filters,
          page: state.filters.page + 1,
        },
      };
    case types.SKIP_NEXT_PATIENT_DATA:
      return Object.assign({}, state, {
        isInfiniteLoading: false,
      });
    case types.LAST_PAGE_ARRIVED:
      return Object.assign({}, state, {
        isInfiniteLoading: false,
        islastPageArrived: true,
      });
    default:
      return state;
  }
};

export default patientSearchData;


export const getDenormalizedPatients = (state) => {
  const {
    selectedChart: {
      personId,
    },
    patientSearchData: {
      results: ids = [],
      entities:
      {
        demographics = {},
      },
    },
  } = state;

  return ids.map(id => ({
    name: filterJoin(', ',
      demographics[id].lastName,
      demographics[id].firstName,
    ),
    id,
    personId: demographics[id].personId,
    dob: demographics[id].birthDate,
    isSelected: personId === id,
  }));
};

export const getSelectedPatient = ({
  selectedChart: {
    personId,
  },
  patientSearchData: {
    entities: {
      // REASON: This appears to be valid for destructuring.
      demographics, // eslint-disable-line no-shadow
    },
  },
}) => demographics[personId];

export const getSortOrder = ({ patientSearchData: { sort: { ids = [], columns = {} } } }) =>
  ids.map(id =>
    ({ id, ...columns[id] }));
