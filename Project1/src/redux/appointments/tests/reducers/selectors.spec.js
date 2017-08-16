
import {
  getDenormalizedAppointments,
  getSortOrder,
} from '../../reducers/appointments';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  selectedChart: {
    encounterId: 'GUID2',
  },
  entities: {
    appointments: {
      GUID1: {
        reasonCode: 'reasonCode',
        personDeskDate: '2007-10-04T10:53:05',
        encounterId: 'GUID1',
        patientDemographics: 9783,
        color: '0,255,0',
        personId: 9873,
        doctorName: 'Fast, Richard',
        roomId: 1,
      },
      GUID2: {
        reasonCode: 'reasonCode2',
        personDeskDate: '2008-10-04T10:53:05',
        encounterId: 'GUID2',
        patientDemographics: 9783,
        color: '0,255,0',
        personId: 9873,
        doctorName: 'Fast, Richard',
        roomId: 1,
      },
    },
    demographics: {
      9783: {
        firstName: 'Richard',
        lastName: 'Harris',
        birthDate: '1987-04-12T10:53:05',
      },
    },
    ethnicities: {},
    primaryInsurances: {},
    secondaryInsurances: {},
    providers: {},
    races: {},
    rooms: {
      1: {
        roomId: 1,
        description: 'Waiting',
      },
    },
  },
  appointments: {
    errorMessage: '',
    textValue: 'Search',
    isAppointmentVisible: true,
    isInfiniteLoading: false,
    selectedAppointmentId: 'GUID2',
    results: [
      'GUID1',
      'GUID2',
    ],
    filters: {
      page: 0,
      startDate: null,
      endDate: null,
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
          name: '',
          label: 'Name',
          state: 'none',
        },
        2: {
          name: 'ReasonCode',
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
  },
};

describe('chartBin selector getDenormalizedAppointments ', () => {
  it('should create an appointments array', () => {
    expect(
      getDenormalizedAppointments(initialState),
    ).toEqual([
      {
        name: 'Harris, Richard',
        id: 'GUID1',
        visitType: 'reasonCode',
        time: '2007-10-04T10:53:05',
        dob: '1987-04-12T10:53:05',
        isSelected: false,
        colorCode: '0,255,0',
        personId: 9873,
        doctorName: 'Fast, Richard',
        roomDescription: 'Waiting',
      },
      {
        name: 'Harris, Richard',
        id: 'GUID2',
        visitType: 'reasonCode2',
        time: '2008-10-04T10:53:05',
        dob: '1987-04-12T10:53:05',
        isSelected: true,
        colorCode: '0,255,0',
        personId: 9873,
        doctorName: 'Fast, Richard',
        roomDescription: 'Waiting',
      },
    ]);
  });
});

describe('chartBin selector getSortOrder ', () => {
  it('should return the sort order', () => {
    expect(
      getSortOrder(initialState),
    ).toEqual([
      {
        id: 0,
        name: 'PersonDeskDate',
        label: 'Time',
        state: 'asc',
      },
      {
        id: 1,
        name: '',
        label: 'Name',
        state: 'none',
      },
      {
        id: 2,
        name: 'ReasonCode',
        label: 'Reason',
        state: 'none',
      },
      {
        id: 3,
        name: '',
        label: 'BirthDate',
        state: 'none',
      },
    ]);
  });
});
