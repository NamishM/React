
import patientTracking,
{ getDenormalizedPatientTrackings, getSortOrder }
  from '../../reducers/patientTracking';
import * as index from '../../reducers';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const state = {
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

describe('patientTracking reducer', () => {
  it('should handle initial state', () => {
    expect(
      patientTracking(undefined, {}),
    ).toEqual(state);
  });

  it('should handle PATIENT_TRACKING_FETCH_REQUESTED', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_FETCH_REQUESTED',
      page: 1,
      sortColumns: {},
      sortColumnPrecedence: {},
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: true,
    });
  });

  it('should handle PATIENT_TRACKING_FETCH_SUCCEEDED', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_FETCH_SUCCEEDED',
      result: { patientTrackingInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 12,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: false,
    });
  });
  it('should handle PATIENT_TRACKING_FETCH_SUCCEEDED', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_FETCH_SUCCEEDED',
      result: { patientTrackingInfos: [] },
      stats: {
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 0,
        totalResults: 120,
      },
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        pageNumber: 1,
        pageSize: 10,
        startIndex: 0,
        endIndex: 9,
        totalPages: 999,
        totalResults: 120,
      },
      filters: {
        ...state.filters,
        page: 1,
      },
      isInfiniteLoading: false,
    });
  });
  it('should handle PATIENT_TRACKING_FETCH_FAILED', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_FETCH_FAILED',
      message: 'error in API response',
    })).toEqual({
      ...state,
      errorMessage: 'error in API response',
      isInfiniteLoading: false,
    });
  });

  it('should handle PATIENT_TRACKING_NEXT_PAGE', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_NEXT_PAGE',
    })).toEqual({
      ...state,
      filters: {
        ...state.filters,
        page: 1,
      },
    });
  });

  it('should handle PATIENT_TRACKING_NEXT_PAGE', () => {
    expect(patientTracking({
      ...state,
      filters: {
        ...state.filters,
        page: 2,
      },
      stats: {
        ...state.stats,
        totalPages: 2,
      },
    },
    {
      type: 'PATIENT_TRACKING_NEXT_PAGE',
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 2,
      },
      filters: {
        ...state.filters,
        page: 2,
      },
    });
  });
  it('should handle REFRESH_PATIENT_TRACKING_DATA', () => {
    expect(patientTracking(state, {
      type: 'REFRESH_PATIENT_TRACKING_DATA',
    })).toEqual({
      ...state,
      stats: {
        pageNumber: 0,
        pageSize: 0,
        startIndex: 0,
        endIndex: 0,
        totalPages: 999,
        totalResults: 0,
      },
    });
  });

  it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
    expect(patientTracking(state, {
      type: 'CHARTBINFILTER_APPOINTMENT_FILTER',
    })).toEqual({
      ...state,
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
    });
  });

  it('should handle PATIENT_TRACKING_SORT_COLUMN', () => {
    expect(patientTracking(state, {
      type: 'PATIENT_TRACKING_SORT_COLUMN',
      sortedBy: 1,
    })).toEqual({
      ...state,
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
            state: 'asc',
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
            state: 'none',
          },
          5: {
            name: 'CurrentPatientStatusElapsedTime',
            label: 'Duration',
            state: 'none',
          },
        },
      },
    });
  });
  it('should handle PATIENT_TRACKING_SORT_COLUMN: toggle to Desc', () => {
    expect(
      patientTracking({
        ...state,
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
              state: 'asc',
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
              state: 'none',
            },
            5: {
              name: 'CurrentPatientStatusElapsedTime',
              label: 'Duration',
              state: 'none',
            },
          },
        },
      }, {
        type: 'PATIENT_TRACKING_SORT_COLUMN',
        sortedBy: 1,
      }),
    ).toEqual({
      ...state,
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
            state: 'desc',
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
            state: 'none',
          },
          5: {
            name: 'CurrentPatientStatusElapsedTime',
            label: 'Duration',
            state: 'none',
          },
        },
      },
    });
  });
  it('should handle PATIENT_TRACKING_SORT_COLUMN: toggle to asc', () => {
    expect(
      patientTracking({
        ...state,
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
              state: 'desc',
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
              state: 'none',
            },
            5: {
              name: 'CurrentPatientStatusElapsedTime',
              label: 'Duration',
              state: 'none',
            },
          },
        },
      }, {
        type: 'PATIENT_TRACKING_SORT_COLUMN',
        sortedBy: 1,
      }),
    ).toEqual({
      ...state,
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
            state: 'none',
          },
          5: {
            name: 'CurrentPatientStatusElapsedTime',
            label: 'Duration',
            state: 'none',
          },
        },
      },
    });
  });
  it('should handle SKIP_NEXT_PATIENT_TRACKING_DATA', () => {
    expect(patientTracking(state, {
      type: 'SKIP_NEXT_PATIENT_TRACKING_DATA',
    })).toEqual({
      ...state,
      isInfiniteLoading: false,
    });
  });
  it('should handle LOGOUT_REQUESTED', () => {
    expect(patientTracking(state, {
      type: 'LOGOUT_REQUESTED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    expect(patientTracking(state, {
      type: 'LOGOUT_SESSION_REMOTE_ENDED',
    })).toEqual({
      ...state,
    });
  });
  it('should handle CHARTBINFILTER_RESET_GRID', () => {
    expect(patientTracking(state, {
      type: 'CHARTBINFILTER_RESET_GRID',
    })).toEqual({
      ...state,
      stats: {
        ...state.stats,
        totalPages: 999,
      },
    });
  });
});

describe('patientTracking reducer getDenormalizedPatientTrackings', () => {
  it('should handle getDenormalizedPatientTrackings', () => {
    const state1 = {
      patientTracking: {
        results: [
          1: "1",
        ],
      },
      entities: {
        patientTrackingInfos: {
          1: {
            personId: 9820,
            name: 'Noble, James',
            doctorName: 'Armstrong, Max',
            personDeskId: 1570491970,
            personDeskDate: '2017-06-23T09:00:00',
            appointmentId: '4',
            reasonCode: 'Follow-Up Visit',
            isDeleted: false,
            startTime: null,
            closeTime: null,
            locationId: null,
            locationName: null,
            currentRoomId: null,
            currentRoomStartTime: null,
            currentPatientStatusTypeId: null,
            currentPatientStatusStartTime: null,
            checkInTime: null,
            checkOutTime: null,
            noShowTime: null,
            currentRoomDescription: null,
            extendedRoomDescription: null,
            currentRoomTypeId: null,
            currentRoomTypeDescription: null,
            currentPatientStatusTypeDescription: null,
            extendedPatientStatusTypeDescription: null,
            actualStatus: 'Not Checked In',
            currentPatientStatusSubTypeDescription: null,
            currentRoomElapsedTime: null,
            currentPatientStatusElapsedTime: null,
            timeInOffice: null,
            isEncounterClosed: 0,
            color: null,
            waitThresholdInSeconds: 300,
            patientDemographics: null,
          },
        },
        appointments: {
          4: {
            roomId: 10,
          },
        },
        rooms: {
          10: {
            description: 'AA',
            roomId: 8,
            locationId: 1,
            maxPatients: 1,
            noOfPatientInRoom: 1,
          },
        },
      },
    };
    expect(
      getDenormalizedPatientTrackings(state1),
    ).toEqual([{
      name: 'Noble, James',
      doctorname: 'Armstrong, Max',
      id: 1,
      encounterDate: '2017-06-23T09:00:00',
      roomDescription: 'AA',
      status: null,
      duration: null,
      color: null,
    }]);
  });
});

describe('documentFilter reducer getSortOrder', () => {
  it('should handle getSortOrder', () => {
    expect(
      getSortOrder({ patientTracking: { ...state } }),
    ).toEqual([
      {
        id: 0,
        name: 'Name',
        label: 'Name',
        state: 'none',
      },
      {
        id: 1,
        name: 'EncounterDoctorName',
        label: 'Provider',
        state: 'none',
      },
      {
        id: 2,
        name: 'CurrentRoomDescription',
        label: 'Room',
        state: 'none',
      },
      {
        id: 3,
        name: 'CurrentPatientStatusTypeDescription',
        label: 'Status',
        state: 'none',
      },
      {
        id: 4,
        name: 'PersonDeskDate',
        label: 'Appt.',
        state: 'asc',
      },
      {
        id: 5,
        name: 'CurrentPatientStatusElapsedTime',
        label: 'Duration',
        state: 'none',
      },
    ]);
  });
});

describe('patientTracking index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual({ patientTracking });
  });
});
