import * as types from '../constants/ActionTypes';

export const getInitialDataRequested = () => ({
  type: types.CHARTBINFILTER_INITIAL_DATA_REQUESTED,
});

export const getProvidersSucceeded = providers => ({
  type: types.GET_PROVIDERS_SUCCEDED,
  providers,
});

export const getProvidersFailed = message => ({
  type: types.GET_PROVIDERS_FAILED,
  message,
});

export const getLocationsSucceeded = locations => ({
  type: types.GET_LOCATIONS_SUCCEDED,
  locations,
});

export const getLocationsFailed = message => ({
  type: types.GET_LOCATIONS_FAILED,
  message,
});

export const getRoomsSucceeded = rooms => ({
  type: types.GET_ROOMS_SUCCEDED,
  rooms,
});

export const getRoomsFailed = message => ({
  type: types.GET_ROOMS_FAILED,
  message,
});

export const getPatientStatusTypesSucceeded = patientStatusTypes => ({
  type: types.GET_PATIENT_STATUS_TYPES_SUCCEDED,
  patientStatusTypes,
});

export const getPatientStatusTypesFailed = message => ({
  type: types.GET_PATIENT_STATUS_TYPES_FAILED,
  message,
});

export const toggleVisiblity = isFilterBoardVisible => ({
  type: types.CHARTBINFILTER_TOGGLE_VISIBLITY,
  isFilterBoardVisible,
});

export const defaultChartBinSelection = (defaultSelectedProviders,
  defaultSelectedLocations,
) => ({
  type: types.CHARTBINFILTER_DEFAULT_SELECTED,
  defaultSelectedProviders,
  defaultSelectedLocations,
});

export const filterAppointments = (
  selectedProviders,
  selectedLocations,
  selectedRooms,
  selectedPatientStatusTypes,
  selectedDate,
) => ({
  type: types.CHARTBINFILTER_APPOINTMENT_FILTER,
  selectedProviders,
  selectedLocations,
  selectedRooms,
  selectedPatientStatusTypes,
  selectedDate,
});

export const resetToDefault = () => ({
  type: types.CHARTBINFILTER_RESET_DEFAULT,
});

export const onDateChange = selectedDate => ({
  type: types.CHARTBINFILTER_DATECHANGE,
  selectedDate,
});

export const validateDate = isValidDate => ({
  type: types.CHARTBINFILTER_DATE_VALIDATE,
  isValidDate,
});

export const resetGridsData = () => ({
  type: types.CHARTBINFILTER_RESET_GRID,
});

export const setRoomsVisibility = selectedLocations => ({
  type: types.CHARTBINFILTER_SET_ROOM_VISIBILITY,
  selectedLocations,
});
