
import deepFreeze from 'deep-freeze';
import { generateAppointmentReducer } from '../../reducers/appointments';
import { generateActionTypes } from '../../constants/ActionTypes';

const prefix = 'APPOINTMENT';
const appointments = generateAppointmentReducer(prefix);
const types = generateActionTypes(prefix);

const describe = global.describe;
const it = global.test;

const expect = global.expect;

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


describe('chartBin appointments', () => {
  it('should handle the default state', () => {
    expect(
      appointments(undefined, {}),
    ).toEqual(initialState);
  });


  it(`should handle ${prefix}_SET_FILTER`, () => {
    expect(
      appointments(initialState, {
        type: `${prefix}_SET_FILTER`,
        startDate: '1/1/2007',
        endDate: '1/2/2007',
        personId: null,
      }),
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        startDate: '1/1/2007',
        endDate: '1/2/2007',
        personId: null,
      },
    });
  });

  it(`should handle ${prefix}_SORT_COLUMN: toggle to desc`, () => {
    expect(
      appointments({
        ...initialState,
        results: [],
        sort: {
          ...initialState.sort,
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
      }, {
        type: `${prefix}_SORT_COLUMN`,
        sortedBy: 0,
      }),
    ).toEqual({
      ...initialState,
      sort: {
        ...initialState.sort,
        columns: {
          0: {
            name: 'PersonDeskDate',
            label: 'Time',
            state: 'desc',
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
      filters: {
        ...initialState.filters,
        page: 0,
      },
      stats: {
        ...initialState.stats,
        totalPages: 999,
      },
    });
  });

  it(`should handle ${prefix}_SORT_COLUMN: toggle to asc`, () => {
    expect(
      appointments({
        ...initialState,
        results: [],
        sort: {
          ...initialState.sort,
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
      }, {
        type: `${prefix}_SORT_COLUMN`,
        sortedBy: 1,
      }),
    ).toEqual({
      ...initialState,
      sort: {
        ...initialState.sort,
        columns: {
          0: {
            name: 'PersonDeskDate',
            label: 'Time',
            state: 'none',
          },
          1: {
            name: 'Name',
            label: 'Name',
            state: 'asc',
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
      filters: {
        ...initialState.filters,
        page: 0,
      },
      stats: {
        ...initialState.stats,
        totalPages: 999,
      },
    });
  });

  it(`should handle ${prefix}_SORT_COLUMN: toggle to none`, () => {
    expect(
      appointments({
        ...initialState,
        results: [],
        sort: {
          ...initialState.sort,
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
      }, {
        type: `${prefix}_SORT_COLUMN`,
        sortedBy: 0,
      }),
    ).toEqual({
      ...initialState,
      sort: {
        ...initialState.sort,
        columns: {
          0: {
            name: 'PersonDeskDate',
            label: 'Time',
            state: 'desc',
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
      filters: {
        ...initialState.filters,
        page: 0,
      },
      stats: {
        ...initialState.stats,
        totalPages: 999,
      },
    });
  });
  it(`should handle ${prefix}_SORT_COLUMN: toggle to defaultState `, () => {
    expect(
      appointments({
        ...initialState,
        results: [],
        sort: {
          ...initialState.sort,
          columns: {
            0: {
              name: 'PersonDeskDate',
              label: 'Time',
              state: 'desc',
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
      }, {
        type: `${prefix}_SORT_COLUMN`,
        sortedBy: 0,
      }),
    ).toEqual({
      ...initialState,
      sort: {
        ...initialState.sort,
        columns: {
          0: {
            name: 'PersonDeskDate',
            label: 'Time',
            state: 'none',
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
      filters: {
        ...initialState.filters,
        page: 0,
      },
      stats: {
        ...initialState.stats,
        totalPages: 999,
      },
    });
  });
  it(`should handle ${prefix}_FETCH_FAILED`, () => {
    const state = {
      message: 'error in API response',
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_FETCH_FAILED`,
        message: 'error in API response',
      }),
    ).toEqual({
      message: 'error in API response',
    });
  });

  it(`should handle ${prefix}_FETCH_REQUESTED`, () => {
    const state = {
      isInfiniteLoading: true,
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_FETCH_REQUESTED`,
        page: 1,
        isInfiniteLoading: true,
      }),
    ).toEqual({
      filters: {
        page: 1,
      },
      isInfiniteLoading: true,
    });
  });

  it(`should handle ${prefix}_SEARCH_VIEW`, () => {
    const state = {
      textValue: 'Search',
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_SEARCH_VIEW`,
        textValue: 'Search',
      }),
    ).toEqual({
      textValue: 'Search',
    });
  });

  it(`should handle ${prefix}_VIEW`, () => {
    const state = {
      textValue: 'Appointments',
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_VIEW`,
        textValue: 'Appointments',
      }),
    ).toEqual({
      textValue: 'Appointments',
    });
  });

  it(`should handle ${prefix}_FETCH_SUCCEEDED`, () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_FETCH_SUCCEEDED`,
        result: {
          appointments: ['GUID'],
        },
        stats: {
          pageNumber: 1, // TODO: Redundant
          pageSize: 10,
          startIndex: 0,
          endIndex: 9,
          totalPages: 1,
          totalResults: 10,
        },
      }),
    ).toEqual({
      ...initialState,
      selectedAppointmentId: 'GUID',
      results: ['GUID'],
      textValue: 'Appointments', // TODO: What is this?
      stats: {
        pageNumber: 1, // TODO: Redundant
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 1,
        totalResults: 10,
      },
      filters: {
        ...initialState.filters,
        page: 1,
      },
    });
  });
  it(`should handle ${prefix}_FETCH_SUCCEEDED - totalPages = 0 `, () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);
    expect(appointments(state, {
      type: `${prefix}_FETCH_SUCCEEDED`,
      selectedAppointmentId: 'GUID',
      result: {
        appointments: [],
      },
      stats: {
        pageNumber: 1, // TODO: Redundant
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 0,
        totalResults: 10,
      },
    })).toEqual({
      ...initialState,
      selectedAppointmentId: null,
      results: [],
      textValue: 'Appointments', // TODO: What is this?
      stats: {
        pageNumber: 1, // TODO: Redundant
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 999,
        totalResults: 10,
      },
      filters: {
        ...initialState.filters,
        page: 1,
      },
    });
  });

  it(`should handle ${prefix}_SELECTION`, () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_SELECTION`,
        id: 'SOME_GUID',
      }),
    ).toEqual({
      ...initialState,
      selectedAppointmentId: 'SOME_GUID',
    });
  });

  it(`should handle ${prefix}_NEXT_PAGE: advance by one`, () => {
    const state = {
      ...initialState,
      filters: {
        ...initialState.filters,
        page: 1,
      },
      stats: {
        ...initialState.stats,
        totalPages: 2,
      },
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_NEXT_PAGE`,
      }),
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        page: 2,
      },
      stats: {
        ...initialState.stats,
        totalPages: 2,
      },
    });
  });

  it(`should handle ${prefix}_NEXT_PAGE: should not pass totalPages`, () => {
    const state = {
      ...initialState,
      filters: {
        ...initialState.filters,
        page: 2,
      },
      stats: {
        ...initialState.stats,
        totalPages: 2,
      },
    };
    deepFreeze(state);
    expect(
      appointments(state, {
        type: `${prefix}_NEXT_PAGE`,
      }),
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        page: 2,
      },
      stats: {
        ...initialState.stats,
        totalPages: 2,
      },
    });
  });

  it('should handle SKIP_NEXT_APPOINTMENT_DATA', () => {
    const state = {
      ...initialState,
    };
    expect(appointments(state, {
      type: types.SKIP_NEXT_APPOINTMENT_DATA,
    })).toEqual({
      ...state,
      isInfiniteLoading: false,
    });
  });


  it('should handle CHARTBINFILTER_RESET_GRID', () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);
    expect(appointments(state, {
      type: 'CHARTBINFILTER_RESET_GRID',
      selectedAppointmentId: null,
      results: [],
      entities: {
        appointments: {},
        demographics: {},
        ethnicities: {},
        primaryInsurances: {},
        secondaryInsurances: {},
        providers: {},
        races: {},
      },
      filters: {
        page: 0,
        startDate: null,
        endDate: null,
        personId: null,
      },
      stats: {
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

    })).toEqual({
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
    });
  });

  it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
    const state = {
      ...initialState,
    };
    expect(appointments(state, {
      type: 'CHARTBINFILTER_APPOINTMENT_FILTER',
      stats: {
        pageNumber: 0, // TODO: Redundant
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
    })).toEqual({
      ...state,
      stats: {
        pageNumber: 0, // TODO: Redundant
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    const state = {
      ...initialState,
    };
    expect(appointments(state, {
      type: 'LOGOUT_REQUESTED',
    })).toEqual({
      ...state,
    });
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    const state = {
      ...initialState,
    };
    expect(appointments(state, {
      type: 'LOGOUT_SESSION_REMOTE_ENDED',
    })).toEqual({
      ...state,
    });
  });

  it('should handle APPOINTMENT_CLEAR', () => {
    const state = {
      ...initialState,
    };
    expect(appointments(state, {
      type: 'APPOINTMENT_CLEAR',
      selectedAppointmentId: null,
      results: [],
      filters: {
        page: 1,
        startDate: null,
        endDate: null,
        personId: null,
      },
      stats: {
        pageNumber: 0, // TODO: Redundant
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
    })).toEqual({
      ...state,
      selectedAppointmentId: null,
      results: [],
      filters: {
        ...state.filters,
        page: 1,
      },
      stats: {
        pageNumber: 0, // TODO: Redundant
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 0,
        totalResults: 0,
      },
    });
  });
});

