
import chartBinFilter from '../../reducers/chartBinFilter';
import * as types from '../../constants/ActionTypes';
import deepFreeze from 'deep-freeze';
import format from 'date-fns/format';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../../user/constants/ActionTypes';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const initialState = {
  providers: [],
  locations: [],
  rooms: [],
  patientStatusTypes: [],
  failedMessage: '',
  defaultProviders: [],
  defaultLocations: [],
  isFilterBoardVisible: false,
  buttonText: 'Filters',
  selectedDate: format(new Date(), 'YYYY-MM-DD'),
  isDefaultLoaded: false,
  isValidDate: true,
};

describe('chartBinFilter reducer', () => {
  it('should handle initial state', () => {
    expect(
      chartBinFilter(undefined, {}),
    ).toEqual(initialState);
  });

  it('should handle GET_PROVIDERS_SUCCEDED', () => {
    const state = {
      providers: [],
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.GET_PROVIDERS_SUCCEDED,
        providers: [
          {
            personId: '1234',
            doctorName: 'Dr. first',
          },
          {
            personId: '5678',
            doctorName: 'Dr. SRS',
          },
          {
            personId: '8910',
            doctorName: 'Dr. Richard',
          },
        ],
      }),
    ).toEqual({
      providers:
      [
        {
          value: '1234',
          label: 'Dr. first',
          selected: false,
        },
        {
          value: '5678',
          label: 'Dr. SRS',
          selected: false,
        },
        {
          value: '8910',
          label: 'Dr. Richard',
          selected: false,
        },
      ],
    });
  });

  it('should handle GET_PATIENT_STATUS_TYPES_SUCCEDED', () => {
    const state = {
      patientStatusTypes: [],
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.GET_PATIENT_STATUS_TYPES_SUCCEDED,
        patientStatusTypes: [
          {
            color: '192,192,192',
            patientTrackingStatusId: '1',
            description: 'No Status',
            subTypeId: 1,
          },
          {
            color: '192,192,192',
            patientTrackingStatusId: '2',
            description: 'Room',
            subTypeId: 4,
          },
        ],
      }),
    ).toEqual({
      patientStatusTypes:
      [
        {
          color: 'rgb(192,192,192)',
          value: '1',
          label: 'No Status',
          selected: true,
          statusType: 1,
        },
        {
          color: 'rgb(192,192,192)',
          value: '2',
          label: 'Room',
          selected: true,
          statusType: 4,
        },
      ],
    });
  });

  it('should handle GET_LOCATIONS_SUCCEDED', () => {
    const state = {
      locations: [],
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.GET_LOCATIONS_SUCCEDED,
        locations: [
          {
            locationId: '1234',
            friendlyName: 'Location 1',
          },
          {
            locationId: '5678',
            friendlyName: 'Location 2',
          },
          {
            locationId: '91011',
            friendlyName: 'Location 3',
          },
        ],
      }),
    ).toEqual({
      locations: [
        {
          value: '1234',
          label: 'Location 1',
          selected: false,
        },
        {
          value: '5678',
          label: 'Location 2',
          selected: false,
        },
        {
          value: '91011',
          label: 'Location 3',
          selected: false,
        },
      ],
    });
  });
  it('should handle GET_ROOMS_SUCCEDED', () => {
    const state = {
      rooms: [],
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.GET_ROOMS_SUCCEDED,
        rooms: [
          {
            locationID: 1,
            label: undefined,
            selected: false,
            value: undefined,
            visible: false,
          },
          {
            locationID: 1,
            label: undefined,
            selected: false,
            value: undefined,
            visible: false,
          },
          {
            locationID: 1,
            label: undefined,
            selected: false,
            value: undefined,
            visible: false,
          },
        ],
      }),
    ).toEqual({
      rooms: [
        {
          locationId: 1,
          label: undefined,
          selected: true,
          selectionSaved: true,
          value: undefined,
          visible: true,
        },
        {
          locationId: 1,
          label: undefined,
          selected: true,
          selectionSaved: true,
          value: undefined,
          visible: true,
        },
        {
          locationId: 1,
          label: undefined,
          selected: true,
          selectionSaved: true,
          value: undefined,
          visible: true,
        },
      ],
    });
  });
  it('should handle CHARTBINFILTER_TOGGLE_VISIBLITY', () => {
    const state = {
      isFilterBoardVisible: false,
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_TOGGLE_VISIBLITY,
        isFilterBoardVisible: true,
      }),
    ).toEqual({
      isFilterBoardVisible: true,
    });
  });

  it('should handle CHARTBINFILTER_DEFAULT_SELECTED', () => {
    const state = {
      providers: [],
      locations: [],
      rooms: [],
      patientStatusTypes: [],
      defaultProviders: [
        {
          personId: '1234',
          doctorName: 'Dr. first',
          selected: false,
        },
      ],
      defaultLocations: [
        {
          locationId: '1234',
          friendlyName: 'Location 1',
          selected: false,
        },
      ],
      isDefaultLoaded: false,
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_DEFAULT_SELECTED,
        defaultSelectedProviders: [
          {
            personId: '1234',
            doctorName: 'Dr. first',
            selected: true,
          },
        ],
        defaultSelectedLocations: [
          {
            locationId: '1234',
            friendlyName: 'Location 1',
            selected: true,
          },
        ],
      }),
    ).toEqual({
      ...state,
      defaultProviders: [
        {
          personId: '1234',
          doctorName: 'Dr. first',
          selected: true,
        },
      ],
      defaultLocations: [
        {
          locationId: '1234',
          friendlyName: 'Location 1',
          selected: true,
        },
      ],
      isDefaultLoaded: true,
    });
  });

  it('should handle CHARTBINFILTER_APPOINTMENT_FILTER', () => {
    const state = {
      isFilterBoardVisible: false,
      providers: [
        {
          value: '1234',
          label: 'Dr. first',
          selected: false,
        },
        {
          value: '5678',
          label: 'Dr. SRS',
          selected: false,
        },
        {
          value: '8910',
          label: 'Dr. Richard',
          selected: false,
        },
      ],
      locations: [
        {
          value: '1234',
          label: 'Location 1',
          selected: false,
        },
        {
          value: '5678',
          label: 'Location 2',
          selected: false,
        },
        {
          value: '91011',
          label: 'Location 3',
          selected: false,
        },
      ],
      rooms: [],
      patientStatusTypes: [
        {
          value: '1',
          label: 'No Status',
          selected: true,
        },
        {
          value: '2',
          label: 'Room',
          selected: false,
        },
      ],
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      isDefaultLoaded: true,
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_APPOINTMENT_FILTER,
        selectedProviders: [
          {
            value: '1234',
            label: 'Dr. first',
            selected: true,
          },
        ],
        selectedLocations: [
          {
            value: '1234',
            label: 'Location 1',
            selected: true,
          },
        ],
        selectedRooms: [],
        selectedPatientStatusTypes: [
          {
            value: '1',
            label: 'No Status',
            selected: true,
          },
          { children: {} },
          { children: {} },
        ],
        selectedDate: format(new Date(), 'YYYY-MM-DD'),
      }),
    ).toEqual({
      ...state,
      providers: [
        {
          value: '1234',
          label: 'Dr. first',
          selected: true,
        },
        {
          value: '5678',
          label: 'Dr. SRS',
          selected: false,
        },
        {
          value: '8910',
          label: 'Dr. Richard',
          selected: false,
        },
      ],
      locations: [
        {
          value: '1234',
          label: 'Location 1',
          selected: true,
        },
        {
          value: '5678',
          label: 'Location 2',
          selected: false,
        },
        {
          value: '91011',
          label: 'Location 3',
          selected: false,
        },
      ],
      rooms: [],
      patientStatusTypes: [
        {
          label: 'No Status',
          selected: true,
          value: '1',
        },
        {
          label: 'Room',
          selected: false,
          value: '2',
        },
      ],
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      isDefaultLoaded: true,
    });
  });

  it('should handle CHARTBINFILTER_RESET_DEFAULT', () => {
    const state = {
      isFilterBoardVisible: false,
      providers: [],
      locations: [],
      rooms: [],
      patientStatusTypes: [],
      defaultProviders: [],
      defaultLocations: [],
      isDefaultLoaded: false,
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      isValidDate: true,
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_RESET_DEFAULT,
        isFilterBoardVisible: true,
        isDefaultLoaded: true,
      }),
    ).toEqual({
      isFilterBoardVisible: false,
      isDefaultLoaded: false,
      providers: [],
      locations: [],
      rooms: [],
      patientStatusTypes: [],
      defaultProviders: [],
      defaultLocations: [],
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      isValidDate: true,
    });
  });

  it('should handle CHARTBINFILTER_DATECHANGE', () => {
    const state = {
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_DATECHANGE,
        selectedDate: format(new Date(), 'YYYY-MM-DD'),
      }),
    ).toEqual({
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
    });
  });

  it('should handle CHARTBINFILTER_DATE_VALIDATE', () => {
    const state = {
      isValidDate: false,
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_DATE_VALIDATE,
        isValidDate: false,
      }),
    ).toEqual({
      isValidDate: false,
    });
  });

  it('should handle CHARTBINFILTER_SET_ROOM_VISIBILITY', () => {
    const state = {
      rooms: [],
    };
    deepFreeze(state);

    expect(
      chartBinFilter(state, {
        type: types.CHARTBINFILTER_SET_ROOM_VISIBILITY,
        rooms: [],
      }),
    ).toEqual({
      rooms: [],
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(chartBinFilter(state, {
      type: LOGOUT_REQUESTED,
    })).toEqual(initialState);
  });

  it('should handle LOGOUT_SESSION_REMOTE_ENDED', () => {
    const state = {
      desktopVisiblePanel: 'both',
      deviceVisiblePanel: 'left',
    };
    deepFreeze(state);

    expect(chartBinFilter(state, {
      type: LOGOUT_SESSION_REMOTE_ENDED,
    })).toEqual(initialState);
  });
});
