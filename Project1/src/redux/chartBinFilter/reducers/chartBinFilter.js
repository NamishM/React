import * as types from '../constants/ActionTypes';
import { LOGOUT_REQUESTED,
  LOGOUT_SESSION_REMOTE_ENDED } from '../../user/constants/ActionTypes';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import { reduceObjectsToString, singleLineString } from '../../../utilities';
import { createSelector } from 'reselect';

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

const updateProviderDetails = (state, action) => {
  switch (action.type) {
    case types.GET_PROVIDERS_SUCCEDED:
      return {
        label: state.doctorName,
        value: state.personId,
        selected: false,
      };
    case types.CHARTBINFILTER_DEFAULT_SELECTED:
    {
      let isSelected = false;
      for (const provider of action.defaultSelectedProviders || []) {
        if (provider.personId === state.value) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    case types.CHARTBINFILTER_APPOINTMENT_FILTER:
    {
      let isSelected = false;
      const selectedProviders = Array.from(action.selectedProviders);
      if (selectedProviders.filter(provider => provider.selected).length === 0) {
        return state;
      }
      for (const provider of selectedProviders) {
        if (provider.selected && provider.value.toString() === state.value.toString()) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    default:
      return state;
  }
};

const updateLocationDetails = (state, action) => {
  switch (action.type) {
    case types.GET_LOCATIONS_SUCCEDED:
      return {
        label: state.friendlyName,
        value: state.locationId,
        selected: false,
      };
    case types.CHARTBINFILTER_DEFAULT_SELECTED:
    {
      let isSelected = false;
      for (const location of action.defaultSelectedLocations) {
        if (location.locationId === state.value) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    case types.CHARTBINFILTER_APPOINTMENT_FILTER:
    {
      let isSelected = false;
      const selectedLocations = Array.from(action.selectedLocations);
      if (selectedLocations.filter(location => location.selected).length === 0) {
        return state;
      }
      for (const location of selectedLocations) {
        if (location.selected && location.value.toString() === state.value.toString()) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    default:
      return state;
  }
};

const updateRoomDetails = (state, action, stateLocations = []) => {
  switch (action.type) {
    case types.GET_ROOMS_SUCCEDED:
      return {
        label: state.description,
        value: state.id,
        locationId: state.locationID,
        visible: true,
        selected: true,
        selectionSaved: true,
      };
    case types.CHARTBINFILTER_DEFAULT_SELECTED:
    {
      let isVisible = false;
      let isSelected = false;
      for (const location of action.defaultSelectedLocations) {
        if (location.locationId === state.locationId) {
          isVisible = true;
          isSelected = true;
        }
      }
      return {
        ...state,
        visible: state.value === -1 ? true : isVisible,
        selected: state.value === -1 ? true : isSelected,
        selectionSaved: state.value === -1 ? true : isSelected,
      };
    }
    case types.CHARTBINFILTER_APPOINTMENT_FILTER:
    {
      let isSelected = false;
      const selectedRooms = Array.from(action.selectedRooms);
      const selectedLocationsFromState =
          Array.from(stateLocations.filter(location => location.selected));
      const location = (action.selectedLocations.length === 0 ?
        selectedLocationsFromState : action.selectedLocations)
        .find(l => l.value === state.locationId);
      const flag = location && location.selected === true;
      if (selectedRooms.filter(room => room.selected).length === 0 ||
            action.selectedLocations.length === 0) {
        return {
          ...state,
          visible: state.value === -1 ? true : flag,
          selected: state.value === -1 ? state.selectionSaved : flag && state.selectionSaved,
          selectionSaved: state.value === -1 ?
            state.selectionSaved : flag && state.selectionSaved,
        };
      }
      for (const room of selectedRooms) {
        if (state.visible &&
              room.selected &&
              room.value.toString() === state.value.toString()
        ) {
          isSelected = true;
        }
      }
      return {
        ...state,
        visible: state.value === -1 ? true : flag,
        selected: isSelected,
        selectionSaved: isSelected,
      };
    }
    case types.CHARTBINFILTER_SET_ROOM_VISIBILITY:
    {
      let isVisible = false;
      let isSelected = false;
      const selectedLocations = Array.from(action.selectedLocations);
      if (selectedLocations.filter(location => location.selected).length === 0) {
        return {
          ...state,
          visible: state.value === -1 ? true : isVisible,
          selected: state.value === -1 ? state.selected : isSelected,
        };
      }
      for (const location of selectedLocations) {
        if (location.selected && location.value.toString() === state.locationId.toString()) {
          isVisible = true;
          isSelected = true;
        }
      }
      return {
        ...state,
        visible: state.value === -1 ? true : isVisible,
        selected: state.value === -1 ? state.selected : isSelected,
      };
    }
    default:
      return state;
  }
};

const updatePatientStatusTypes = (state, action) => {
  switch (action.type) {
    case types.GET_PATIENT_STATUS_TYPES_SUCCEDED:
      return {
        label: state.description,
        value: state.patientTrackingStatusId,
        color: `rgb(${state.color})`,
        statusType: state.subTypeId,
        selected: true,
      };
    case types.CHARTBINFILTER_DEFAULT_SELECTED:
    {
      return {
        ...state,
        selected: true,
      };
    }
    case types.CHARTBINFILTER_APPOINTMENT_FILTER:
    {
      let isSelected = false;
      const selectedPatientStatusTypes = Array.from(action.selectedPatientStatusTypes);
      if (selectedPatientStatusTypes.filter(p => p.selected).length === 0) {
        return state;
      }
      for (const patientStatusType of selectedPatientStatusTypes) {
        if (patientStatusType.selected &&
            patientStatusType.value.toString() === state.value.toString()) {
          isSelected = true;
        }
      }
      return {
        ...state,
        selected: isSelected,
      };
    }
    default:
      return state;
  }
};
const chartBinFilter = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROVIDERS_SUCCEDED:
    {
      return Object.assign({}, state, {
        providers: action.providers.map(provider => updateProviderDetails(provider, action)),
      });
    }
    case types.GET_LOCATIONS_SUCCEDED:
    {
      return Object.assign({}, state, {
        locations: action.locations.map(location => updateLocationDetails(location, action)),
      });
    }
    case types.GET_ROOMS_SUCCEDED:
    {
      return Object.assign({}, state, {
        rooms: action.rooms.map(room => updateRoomDetails(room, action)),
      });
    }
    case types.GET_PATIENT_STATUS_TYPES_SUCCEDED:
    {
      return Object.assign({}, state, {
        patientStatusTypes: action.patientStatusTypes.map(patientStatusType =>
          updatePatientStatusTypes(patientStatusType, action)),
      });
    }
    case types.CHARTBINFILTER_TOGGLE_VISIBLITY:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: !state.isFilterBoardVisible,
      });
    }
    case types.CHARTBINFILTER_DEFAULT_SELECTED:
    {
      return Object.assign({}, state, {
        defaultProviders: action.defaultSelectedProviders,
        defaultLocations: action.defaultSelectedLocations,
        providers: state.providers.map(provider =>
          updateProviderDetails(provider, action)),
        locations: state.locations.map(location =>
          updateLocationDetails(location, action)),
        rooms: state.rooms.map(room =>
          updateRoomDetails(room, action)),
        patientStatusTypes: state.patientStatusTypes.map(patientStatusType =>
          updatePatientStatusTypes(patientStatusType, action)),
        isDefaultLoaded: true,
      });
    }
    case types.CHARTBINFILTER_APPOINTMENT_FILTER:
    {
      return Object.assign({}, state, {
        isFilterBoardVisible: false,
        providers: state.providers.map(provider =>
          updateProviderDetails(provider, action)),
        locations: state.locations.map(location =>
          updateLocationDetails(location, action)),
        rooms: state.rooms.map(room =>
          updateRoomDetails(room, action, state.locations)),
        patientStatusTypes: state.patientStatusTypes.map(patientStatusType =>
          updatePatientStatusTypes(patientStatusType, action)),
        selectedDate: action.selectedDate,
        isDefaultLoaded: true,
      });
    }
    case types.CHARTBINFILTER_RESET_DEFAULT:
    {
      return Object.assign({}, state, {
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
      });
    }
    case types.CHARTBINFILTER_DATECHANGE:
    {
      return Object.assign({}, state, {
        selectedDate: action.selectedDate,
      });
    }
    case types.CHARTBINFILTER_DATE_VALIDATE:
    {
      return Object.assign({}, state, {
        isValidDate: action.isValidDate,
      });
    }
    case types.CHARTBINFILTER_SET_ROOM_VISIBILITY:
    {
      return Object.assign({}, state, {
        rooms: state.rooms.map(room =>
          updateRoomDetails(room, action)),
      });
    }
    case LOGOUT_REQUESTED:
    case LOGOUT_SESSION_REMOTE_ENDED:
      return initialState;
    default:
      return state;
  }
};

const getSelectedPersonId = state => state.selectedChart.personId;
const getSelectedEncounterId = state => state.selectedChart.encounterId;

const getFullScreenMode = state => state.routing.isFullScreenMode;

const getCbfProviders = state => state.chartBinFilter.providers;
const getCbfLocations = state => state.chartBinFilter.locations;
const getCbfRooms = state => state.chartBinFilter.rooms;
const getCbfPatientStatusTypes = state => state.chartBinFilter.patientStatusTypes;
const getCbfSelectedDate = state => state.chartBinFilter.selectedDate;
const getEntityRooms = state => state.entities.rooms;

export const getFilterCriteria = createSelector(
  [
    getCbfProviders,
    getCbfLocations,
    getCbfRooms,
    getCbfPatientStatusTypes,
    getCbfSelectedDate,
    getSelectedPersonId,
    getEntityRooms,
  ], (
    providers,
    locations,
    rooms,
    patientStatusTypes,
    selectedDate,
    personId,
    roomsPrimary,
  ) => ({
    selectedProviders: providers.filter(provider => provider.selected),
    selectedLocations: locations.filter(location => location.selected),
    selectedRooms: rooms
      .filter(room => room.visible && room.selected)
      .map(room => ({
        ...room,
        ...roomsPrimary[room.value],
      })),
    selectedPatientStatusTypes: patientStatusTypes.filter(patientStatusType =>
      patientStatusType.selected),
    taskGroups: patientStatusTypes.filter(patientStatusType =>
      patientStatusType.statusType === 4),
    startDate: format(selectedDate, 'MM/DD/YYYY'),
    endDate: format(addDays(selectedDate, 1), 'MM/DD/YYYY'),
    selectedPersonId: personId,
  }),
);

const getIdString = collection => reduceObjectsToString(Array.from(collection).filter(item => item.selected), 'value');

export const getChartBinFilterUrl = createSelector(
  [
    getCbfProviders,
    getCbfLocations,
    getCbfRooms,
    getCbfPatientStatusTypes,
    getCbfSelectedDate,
    getSelectedPersonId,
    getSelectedEncounterId,
    getSelectedPersonId,
    getSelectedEncounterId,
    getFullScreenMode,
  ],
  (
    providers,
    locations,
    rooms,
    patientStatusTypes,
    selectedDate,
    personId,
    encounterId,
    isFullScreenMode,
  ) => {
    const statusId = getIdString(patientStatusTypes);
    const roomId = getIdString(rooms);
    const locationId = getIdString(locations);
    const providerId = getIdString(providers);

    return singleLineString`
      ?encounterDate=${format(selectedDate, 'MM/DD/YYYY')}
      ${statusId ? `&statusId=${statusId}` : ''}
      ${roomId ? `&roomId=${roomId}` : ''}
      &locationId=${locationId}
      &providerId=${providerId}
      ${personId ? `&personId=${personId}` : ''}
      ${encounterId ? `&encounterId=${encounterId}` : ''}
      &fullscreen=${isFullScreenMode}`;
  },
);

export const getbuttonText = (providers, locations, rooms, selectedDate, patientStatusTypes) => {
  const selectedProvider = providers.filter(provider => provider.selected);
  let buttonText = 'Filters';
  if (selectedProvider.length === 1) {
    buttonText = `${selectedProvider[0].label}`;
  } else if (selectedProvider.length > 1) {
    buttonText = 'Multiple Doctors';
  }
  const selectedLocation = locations.filter(location => location.selected);
  if (selectedLocation.length === 1) {
    buttonText = `${buttonText};${selectedLocation[0].label}`;
  } else if (selectedLocation.length > 1) {
    buttonText = `${buttonText};Multiple Locations`;
  }
  const selectedRoom = rooms.filter(room => room.visible && room.selected);
  if (selectedRoom.length === 1) {
    buttonText = `${buttonText};${selectedRoom[0].label}`;
  } else if (selectedRoom.length > 1) {
    buttonText = `${buttonText};Multiple Rooms`;
  }

  const selectedPatientStatusType = patientStatusTypes.filter(patientStatusType =>
    patientStatusType.selected);
  if (selectedPatientStatusType.length === 1) {
    buttonText = `${buttonText};${selectedPatientStatusType[0].label}`;
  } else if (selectedPatientStatusType.length > 1) {
    buttonText = `${buttonText};Multiple Patient Status`;
  }

  if (selectedDate && selectedDate !== '') {
    buttonText = `${buttonText};${format(selectedDate, 'MM/DD/YYYY')}`;
  }
  return buttonText;
};

export const getGroupedPatientStatusTypes = patientStatusTypes => (
  patientStatusTypes && patientStatusTypes.length ? [
    patientStatusTypes.filter(ps => ps.statusType === -1)[0],
    {
      label: 'Tracking status', children: patientStatusTypes.filter(ps => ps.statusType !== 4 && ps.statusType !== -1), // eslint-disable-line max-len
    },
    {
      label: 'Tasking groups', children: patientStatusTypes.filter(ps => ps.statusType === 4),
    },
  ] : []
);

export const getFilters = ({
  chartBinFilter: {
    providers,
    locations,
    rooms,
    patientStatusTypes,
    isFilterBoardVisible,
    selectedDate,
    isValidDate,
  },
}) => ({
  providers,
  locations,
  rooms,
  patientStatusTypes,
  isFilterBoardVisible,
  selectedDate,
  isValidDate,
});

export default chartBinFilter;

export const getPatientStatusTypes = createSelector(
  [getCbfPatientStatusTypes],
  patientStatusTypes => patientStatusTypes
    .filter(ps => ps.statusType === 4)
    .map(ps => ({ ...ps, selected: false })),
);
