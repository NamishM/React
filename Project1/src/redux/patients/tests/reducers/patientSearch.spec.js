
import patientSearchData,
{ getSelectedPatient, getDenormalizedPatients, getSortOrder }
  from '../../reducers/patientSearchData';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import { modelReducer, formReducer } from 'react-redux-form';
import * as index from '../../reducers';

const describe = global.describe;
const it = global.test;

const expect = global.expect;
const searchCriteriaModel = {
  firstName: 'a',
  dob: '12/23/1990',
  phone: '1234',
  lastName: 'b',
  sharedId: '9876',
  ssn: '456',
  ssnMask: '999-99-9999',
  phoneMask: '(999)999-9999',
};


const state = {
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

describe('Patient search Reducer', () => {
  it('should handle initial state', () => {
    expect(
      patientSearchData(undefined, {}),
    ).toEqual(state);
  });
  it('Change Data View', () => {
    const state1 = {
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
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.DATE_VIEW_CHANGE,
        isDate: false,
      }),
    ).toEqual({
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
    });
  });
  it('SEARCH SUCCEED1', () => {
    const state1 = {
      ...state,
      filters: {
        page: 1,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.SEARCH_SUCCEEDED,
        result: { demographics: [0] },
        entities: { demographics: { 0: { lastName: 'b', firstName: 'a' } } },
        stats: [],
      }),
    ).toEqual({
      ...state1,
      results: [0],
      entities: {
        demographics: { 0: { lastName: 'b', firstName: 'a' } },
        ethnicities: {},
        primaryInsurances: {},
        secondaryInsurances: {},
        providers: {},
        races: {},
        sopCodes: {},
      },
      stats: {},
      selectedPersonId: 0,
      selectedPatientName: 'b, a',
      filters: {
        page: 1,
      },
    });
  });
  it('SEARCH SUCCEED2', () => {
    const state1 = {
      ...state,
      filters: {
        page: 0,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.SEARCH_SUCCEEDED,
        result: { demographics: [] },
        entities: [],
        stats: [],
      }),
    ).toEqual({
      ...state1,
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
      stats: {},
      filters: {
        page: 0,
      },
    });
  });
  it('SEARCH SUCCEED3', () => {
    const state1 = {
      ...state,
      filters: {
        page: 1,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.SEARCH_SUCCEEDED,
        result: { demographics: [] },
        entities: {},
        stats: [],
      }),
    ).toEqual({
      ...state1,
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
      stats: {},
      filters: {
        page: 1,
      },
    });
  });
  it('SEARCH FAILED', () => {
    deepFreeze(state);
    expect(
      patientSearchData(state, {
        type: types.SEARCH_FAILED,
        message: 'Error',
      }),
    ).toEqual({
      ...state,
      errorMessage: 'Error',
    });
  });
  it('SEARCH INIT', () => {
    const state1 = {
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
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.SEARCH_INIT,
        fname: 'Test1',
        lname: 'Test2',
        dob: '2013-05-29',
        ssn: '1234',
        sharedId: '23456',
        phone: '09878675645',
        page: 1,
      }),
    ).toEqual({
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
        page: 1,
      },
      islastPageArrived: false,
    });
  });
  it('CLEAR FIELDS', () => {
    const state1 = {
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
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.CLEAR_FIELDS,
      }),
    ).toEqual({
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
    });
  });
  it('ADVANCE SEARCH TOGGLE', () => {
    expect(
      patientSearchData(state, {
        type: 'ADVANCE_SEARCH_TOGGLE',
        searchCriteria: searchCriteriaModel,
      }),
    ).toEqual({
      ...state,
      allField: 'a; b; 12/23/1990; 9876; 1234',
      isInfiniteLoading: false,
      hasAdvanceSearch: true,
    });
  });
  it('ADVANCE SEARCH TOGGLE', () => {
    expect(
      patientSearchData(state, {
        type: 'ADVANCE_SEARCH_TOGGLE',
        searchCriteria: { ...searchCriteriaModel, dob: null },
      }),
    ).toEqual({
      ...state,
      allField: 'a; b; ; 9876; 1234',
      isInfiniteLoading: false,
      hasAdvanceSearch: true,
    });
  });
  it('PATIENT SELECTION', () => {
    const state1 = {
      ...state,
      results: [0],
      entities: {
        demographics: { 0: { lastName: 'b', firstName: 'a' } },
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
      filters: {
        page: 1,
      },
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.PATIENT_SELECTION,
        id: 0,
      }),
    ).toEqual({
      ...state1,
      selectedPersonId: 0,
      selectedPatientName: 'b, a',
    });
  });
  it('PATIENT SELECTION', () => {
    const state1 = {
      ...state,
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
      filters: {
        page: 1,
      },
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.PATIENT_SELECTION,
        id: 0,
      }),
    ).toEqual({
      ...state1,
      selectedPersonId: 0,
      selectedPatientName: '',
    });
  });
  it('LOGOUT_REQUESTED', () => {
    expect(
      patientSearchData(state, {
        type: 'LOGOUT_REQUESTED',
      }),
    ).toEqual(state);
  });
  it('LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(
      patientSearchData(state, {
        type: 'LOGOUT_SESSION_REMOTE_ENDED',
      }),
    ).toEqual(state);
  });
  it('SORT_COLUMN', () => {
    expect(
      patientSearchData(state, {
        type: types.SORT_COLUMN,
        sortedBy: 1,
      }),
    ).toEqual({
      ...state,
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
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'LastName',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'BirthDate',
            label: 'Birth Date',
            state: 'asc',
          },
        },
      },
    });
  });
  it('SORT_COLUMN', () => {
    expect(
      patientSearchData(state, {
        type: types.SORT_COLUMN,
        sortedBy: 0,
      }),
    ).toEqual({
      ...state,
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
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'LastName',
            label: 'Name',
            state: 'desc',
          },
          1: {
            name: 'BirthDate',
            label: 'Birth Date',
            state: 'none',
          },
        },
      },
    });
  });
  it('SORT_COLUMN', () => {
    expect(
      patientSearchData({
        ...state,
        sort: {
          ids: [0, 1],
          precedence: [0, 1],
          columns: {
            0: {
              name: 'LastName',
              label: 'Name',
              state: 'desc',
            },
            1: {
              name: 'BirthDate',
              label: 'Birth Date',
              state: 'none',
            },
          },
        },
      }, {
        type: types.SORT_COLUMN,
        sortedBy: 0,
      }),
    ).toEqual({
      ...state,
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
      sort: {
        ids: [0, 1],
        precedence: [0, 1],
        columns: {
          0: {
            name: 'LastName',
            label: 'Name',
            state: 'none',
          },
          1: {
            name: 'BirthDate',
            label: 'Birth Date',
            state: 'none',
          },
        },
      },
    });
  });
  it('APPOINTMENT VIEW', () => {
    const state1 = {
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
        page: 1,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.APPOINTMENT_VIEW,
      }),
    ).toEqual({
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
        patientNextofKins: {},
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
    });
  });
  it('SELECTED_CHART_CLEAR', () => {
    deepFreeze(state);
    expect(
      patientSearchData(state, {
        type: 'SELECTED_CHART_CLEAR',
      }),
    ).toEqual({
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
        patientNextofKins: {},
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
    });
  });
  it('LATEST ENCOUNTER FETCH SUCCEEDED', () => {
    const state1 = {
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
        page: 1,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: types.LATEST_ENCOUNTER_FETCH_SUCCEEDED,
        encounter: { personDeskDate: '05/20/2016', encounterId: 123 },
      }),
    ).toEqual({
      searchCriteria: '',
      errorMessage: '',
      hasAdvanceSearch: false,
      selectedPersonId: null,
      selectedAppointmentId: 123,
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
      selectedPatientDate: '05/20/2016',
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
        page: 1,
      },
      islastPageArrived: true,
    });
  });
  it('LATEST_ENCOUNTER_FETCH_FAILED', () => {
    expect(
      patientSearchData(state, {
        type: types.LATEST_ENCOUNTER_FETCH_FAILED,
      }),
    ).toEqual({
      ...state,
      errorMessage: 'Error',
    });
  });
  it('GET_NEXT_PATIENT_DATA', () => {
    expect(
      patientSearchData(state, {
        type: types.GET_NEXT_PATIENT_DATA,
      }),
    ).toEqual({
      ...state,
      isInfiniteLoading: true,
      filters: {
        ...state.filters,
        page: state.filters.page + 1,
      },
    });
  });
  it('SKIP NEXT PATIENT DATA', () => {
    const state1 = {
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
      isInfiniteLoading: true,
      filters: {
        page: 0,
      },
      islastPageArrived: true,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: 'SKIP_NEXT_PATIENT_DATA',
      }),
    ).toEqual({
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
    });
  });
  it('LAST PAGE ARRIVED', () => {
    const state1 = {
      searchCriteria: '',
      errorMessage: '',
      hasAdvanceSearch: true,
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
      isInfiniteLoading: true,
      filters: {
        page: 0,
      },
      islastPageArrived: false,
    };
    deepFreeze(state1);
    expect(
      patientSearchData(state1, {
        type: 'LAST_PAGE_ARRIVED',
      }),
    ).toEqual({
      searchCriteria: '',
      errorMessage: '',
      hasAdvanceSearch: true,
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
    });
  });
});

describe('patientSearchData reducer getDenormalizedPatients', () => {
  it('should handle getDenormalizedPatients', () => {
    const state1 = {
      selectedChart: {
        personId: 1,
      },
      patientSearchData: {
        results: [0],
        entities:
        {
          demographics: {
            0: { lastName: 'b', firstName: 'a', personId: 4, birthDate: '' },
          },
        },
      },
    };
    expect(
      getDenormalizedPatients(state1),
    ).toEqual([{
      name: 'b, a',
      id: 0,
      personId: 4,
      dob: '',
      isSelected: false,
    }]);
  });
  it('should handle getDenormalizedPatients2', () => {
    const state1 = {
      selectedChart: {
        personId: 1,
      },
      patientSearchData: {
        results: [],
        entities:
        {
          demographics: {},
        },
      },
    };
    expect(
      getDenormalizedPatients(state1),
    ).toEqual([]);
  });
});


describe('patientSearchData reducer getSelectedPatient', () => {
  it('should handle getSortOrder', () => {
    expect(
      getSelectedPatient({
        selectedChart: { personId: 0 },
        patientSearchData: {
          ...state,
          results: [0],
          entities: {
            demographics: { 0: { lastName: 'b', firstName: 'a' } },
            ethnicities: {},
            primaryInsurances: {},
            secondaryInsurances: {},
            providers: {},
            races: {},
            sopCodes: {},
          },
        },
      }),
    ).toEqual({ lastName: 'b', firstName: 'a' });
  });
});

describe('patientSearchData reducer getSortOrder', () => {
  it('should handle getSortOrder', () => {
    expect(
      getSortOrder({ patientSearchData: { ...state } }),
    ).toEqual([
      {
        id: 0,
        name: 'LastName',
        label: 'Name',
        state: 'asc',
      },
      {
        id: 1,
        name: 'BirthDate',
        label: 'Birth Date',
        state: 'none',
      },
    ]);
  });
});

describe('patientSearchData reducer getSortOrder2', () => {
  it('should handle getSortOrder', () => {
    expect(
      getSortOrder({ patientSearchData: { ...state, sort: { ids: [], columns: {} } } }),
    ).toEqual([]);
  });
});

const model = {
  firstName: '',
  dob: '',
  phone: '',
  lastName: '',
  sharedId: '',
  ssn: '',
  ssnMask: '999-99-9999',
  phoneMask: '(999)999-9999',
};

const searchCriteria = modelReducer('searchCriteria', model);

const searchCriteriaForm = formReducer('searchCriteria', model);

describe('patientSearchData index', () => {
  it('should handle searchCriteria', () => {
    expect(index.searchCriteria.toString()).toEqual(searchCriteria.toString());
  });
  it('should handle searchCriteriaForm', () => {
    expect(index.searchCriteriaForm.toString()).toEqual(searchCriteriaForm.toString());
  });
  it('should handle patientSearchData', () => {
    expect(index.patientSearchData.toString()).toEqual(patientSearchData.toString());
  });
});
