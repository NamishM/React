import { entities } from '../../reducers';
import deepFreeze from 'deep-freeze';
import appointmentModuleName from '../../../appointmentList/constants/moduleName';
import { generateActionTypes } from '../../../appointments/constants/ActionTypes';
import {
  NO_TASKGRID_FETCH_SUCCEEDED,
  CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED,
} from '../../../noTaskGrid/constants/ActionTypes';

const appointmentTypes = generateActionTypes(appointmentModuleName);


const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  appointments: {},
  demographics: {},
  ethnicities: {},
  primaryInsurances: {},
  secondaryInsurances: {},
  providers: {},
  races: {},
  patientTrackingStatuses: {},
  patientTrackingInfos: {},
  rooms: {},
  taskingStatusTypes: [],
};

describe('entities reducer', () => {
  deepFreeze(initialState);
  it('entities handle initial state', () => {
    expect(
      entities(undefined, {}),
    ).toEqual(initialState);
  });

  it(`should handle ${appointmentTypes.APPOINTMENT_FETCH_SUCCEEDED}`, () => {
    const state = {
      ...initialState,
    };
    deepFreeze(state);

    expect(
      entities(state, {
        type: appointmentTypes.APPOINTMENT_FETCH_SUCCEEDED,
        result: {
          appointments: ['GUID'],
        },
        entities: {
          ethnicities: {},
          primaryInsurances: {},
          secondaryInsurances: {},
          providers: {
            0: {},
          },
          demographics: {
            1: {},
          },
          appointments: {
            GUID: {
              roomId: 5,
            },
          },
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
      ...state,
      appointments: {
        GUID: {
          roomId: 5,
        },
      },
      demographics: {
        1: {},
      },
      providers: {
        0: {},
      },
      rooms: {
        5: {
          roomId: 5,
        },
      },
    });
  });

  // it(`should handle ${TASKINGDETAILS_LOAD_SUCCEDED}`, () => {
  //  const state = {
  //    ...initialState,
  //  };
  //  deepFreeze(state);

  //  expect(
  //  entities(state, {
  //    type: TASKINGDETAILS_LOAD_SUCCEDED,
  //    result: {
  //      patientTrackingStatuses: [
  //        'GUID',
  //      ],
  //    },
  //    entities: {
  //      patientTrackingStatuses: {
  //        'GUID': [
  //          0: {
  //            taskStatusId: 4,
  //            roomId: 5,
  //          },
  //          1: {
  //            taskStatusId: 5,
  //            roomId: 10,
  //          },
  //        ],
  //      },
  //    },
  //    stats: {
  //      pageNumber: 1, // TODO: Redundant
  //      pageSize: 10,
  //      startIndex: 0,
  //      endIndex: 9,
  //      totalPages: 1,
  //      totalResults: 10,
  //    },
  //  }),
  // ).toEqual({
  //  ...state,
  //  appointments: {
  //    ...state.appointments,
  //    'GUID': {
  //      roomId: 5,
  //    },
  //    patientTrackingStatuses: {
  //      'GUID': [0,1],
  //    },
  //  },
  // });
  // });

  it(`should handle ${NO_TASKGRID_FETCH_SUCCEEDED}`, () => {
    const state = {
      ...initialState,
      rooms: {
        14: {
          locationId: 1,
          description: 'room1',
        },
      },
    };
    deepFreeze(state);

    expect(
      entities(state, {
        type: NO_TASKGRID_FETCH_SUCCEEDED,
        result: {
          patientTrackingInfos: [
            'GUID',
          ],
        },
        entities: {
          patientTrackingInfos: {
            GUID: {
              appointmentId: 'GUID',
              currentRoomId: 14,
              currentRoomDescription: 'room',
            },
          },
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
      ...state,
      appointments: {
        ...state.appointments,
        GUID: {
          roomId: 14,
        },
      },
      patientTrackingInfos: {
        ...state.patientTrackingInfos,
        GUID: {
          appointmentId: 'GUID',
          currentRoomId: 14,
          currentRoomDescription: 'room',
        },
      },
      rooms: {
        ...state.rooms,
        14: {
          locationId: 1,
          description: 'room',
          roomId: 14,
        },
      },
    });
  });

  it(`should handle ${CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED}`, () => {
    const state = {
      ...initialState,
      patientTrackingInfos: {
        ...initialState.patientTrackingInfos,
        GUID: {
          ...initialState.patientTrackingInfos.GUID,
          checkOutTime: null,
        },
      },
    };
    deepFreeze(state);

    expect(
      entities(state, {
        type: CHECKOUT_ON_NO_TASKGRID_DATA_SUCCEEDED,
        checkoutDetails: {
          appointmentId: 'GUID',
          checkOutTime: '2017-06-27T14:18:37.25',
        },
      }),
    ).toEqual({
      ...state,
      patientTrackingInfos: {
        ...state.patientTrackingInfos,
        GUID: {
          checkOutTime: '2017-06-27T14:18:37.25',
        },
      },
    });
  });
});
