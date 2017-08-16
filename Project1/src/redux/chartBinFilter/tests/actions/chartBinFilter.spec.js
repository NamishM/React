
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const providerDetails = [
  {
    userId: '1234',
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
];

// const selectedLocation = [
//    {
//     Name: 'Loation 1',
//     locationId: '1234',
//     selected: false,
//    },
//    {
//     Name: 'Loation 2',
//     locationId: '5678',
//    },
//    {
//     Name: 'Loation 3',
//     locationId: '91011',
//    },
// ];

const locationDetails = [
  {
    locationId: '1234',
    friendlyName: 'Loation 1',
    selected: false,
  },
  {
    locationId: '5678',
    Name: 'Loation 2',
  },
  {
    locationId: '91011',
    Name: 'Loation 3',
  },
];

const roomDetails = [
  {
    id: '1234',
    description: 'Loation 1',
    locationId: '1',
  },
  {
    id: '5678',
    description: 'Loation 2',
    locationId: '2',
  },
  {
    id: '91011',
    description: 'Loation 3',
    locationId: '3',
  },
];
const patientStatusTypeDetails = [
  {
    description: 'ew',
    patientTrackingStatusId: '7',
  },
  {
    description: 'Status',
    patientTrackingStatusId: '6',
  },
  {
    description: 'Room',
    patientTrackingStatusId: '5',
  },
];

const dateSelected = '09/02/2016';

describe('chartBinFilter action', () => {
  it('getInitialDataRequested should create CHARTBINFILTER_INITIAL_DATA_REQUESTED action', () => {
    expect(actions.getInitialDataRequested()).toEqual({
      type: types.CHARTBINFILTER_INITIAL_DATA_REQUESTED,
    });
  });

  it('getProvidersSucceeded should create GET_PROVIDERS_SUCCEDED action', () => {
    expect(actions.getProvidersSucceeded(providerDetails)).toEqual({
      type: types.GET_PROVIDERS_SUCCEDED,
      providers: providerDetails,
    });
  });

  it('getProvidersFailed should create GET_PROVIDERS_FAILED action', () => {
    expect(actions.getProvidersFailed('Error')).toEqual({
      type: types.GET_PROVIDERS_FAILED,
      message: 'Error',
    });
  });

  it('getLocationsSucceeded should create GET_LOCATIONS_SUCCEDED action', () => {
    expect(actions.getLocationsSucceeded(locationDetails)).toEqual({
      type: types.GET_LOCATIONS_SUCCEDED,
      locations: locationDetails,
    });
  });

  it('getLocationsFailed should create GET_LOCATIONS_FAILED action', () => {
    expect(actions.getLocationsFailed('Error')).toEqual({
      type: types.GET_LOCATIONS_FAILED,
      message: 'Error',
    });
  });
  it('getRoomsSucceeded should create GET_ROOMS_SUCCEDED action', () => {
    expect(actions.getRoomsSucceeded(roomDetails)).toEqual({
      type: types.GET_ROOMS_SUCCEDED,
      rooms: roomDetails,
    });
  });

  it('getRoomsFailed should create GET_ROOMS_FAILED action', () => {
    expect(actions.getRoomsFailed('Error')).toEqual({
      type: types.GET_ROOMS_FAILED,
      message: 'Error',
    });
  });
  it('getPatientStatusTypesSucceeded should create GET_PATIENT_STATUS_TYPES_SUCCEDED action',
    () => {
      expect(actions.getPatientStatusTypesSucceeded(patientStatusTypeDetails)).toEqual({
        type: types.GET_PATIENT_STATUS_TYPES_SUCCEDED,
        patientStatusTypes: patientStatusTypeDetails,
      });
    });
  it('getPatientStatusTypesFailed should create GET_PATIENT_STATUS_TYPES_FAILED action', () => {
    expect(actions.getPatientStatusTypesFailed('Error')).toEqual({
      type: types.GET_PATIENT_STATUS_TYPES_FAILED,
      message: 'Error',
    });
  });
  it('toggleVisiblity should create CHARTBINFILTER_TOGGLE_VISIBLITY action', () => {
    expect(actions.toggleVisiblity(false)).toEqual({
      type: types.CHARTBINFILTER_TOGGLE_VISIBLITY,
      isFilterBoardVisible: false,
    });
  });

  it('defaultChartBinSelection should create CHARTBINFILTER_DEFAULT_SELECTED action',
    () => {
      expect(actions.defaultChartBinSelection(providerDetails, locationDetails)).toEqual({
        type: types.CHARTBINFILTER_DEFAULT_SELECTED,
        defaultSelectedProviders: providerDetails,
        defaultSelectedLocations: locationDetails,
      });
    });

  it('filterAppointments should create CHARTBINFILTER_APPOINTMENT_FILTER action',
    () => {
      expect(actions.filterAppointments(providerDetails, locationDetails,
        roomDetails, patientStatusTypeDetails, dateSelected)).toEqual({
        type: types.CHARTBINFILTER_APPOINTMENT_FILTER,
        selectedProviders: providerDetails,
        selectedLocations: locationDetails,
        selectedRooms: roomDetails,
        selectedPatientStatusTypes: patientStatusTypeDetails,
        selectedDate: dateSelected,
      });
    });

  it('resetToDefault should create CHARTBINFILTER_RESET_DEFAULT action', () => {
    expect(actions.resetToDefault()).toEqual({
      type: types.CHARTBINFILTER_RESET_DEFAULT,
    });
  });

  it('onDateChange should create CHARTBINFILTER_DATECHANGE action', () => {
    expect(actions.onDateChange(dateSelected)).toEqual({
      type: types.CHARTBINFILTER_DATECHANGE,
      selectedDate: dateSelected,
    });
  });

  it('validateDate should create CHARTBINFILTER_DATE_VALIDATE action', () => {
    expect(actions.validateDate(false)).toEqual({
      type: types.CHARTBINFILTER_DATE_VALIDATE,
      isValidDate: false,
    });
  });

  it('resetGridsData should create CHARTBINFILTER_RESET_GRID action', () => {
    expect(actions.resetGridsData()).toEqual({
      type: types.CHARTBINFILTER_RESET_GRID,
    });
  });
  it('setRoomsVisibility should create CHARTBINFILTER_SET_ROOM_VISIBILITY action', () => {
    expect(actions.setRoomsVisibility()).toEqual({
      type: types.CHARTBINFILTER_SET_ROOM_VISIBILITY,
      selectedLocations: undefined,
    });
  });
});
