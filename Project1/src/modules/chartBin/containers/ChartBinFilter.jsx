import { connect } from 'react-redux';
import ChartBinFilterUI from '../components/ChartBinFilterUI';
import * as actions from 'srs/redux/chartBinFilter/actions';
import { getbuttonText }
  from 'srs/redux/chartBinFilter/reducers/chartBinFilter';
import { updateFilter, goToCurrentPath } from 'srs/redux/location/actions';
import { getRoomsFromChartBinSelection } from 'srs/redux/entities/reducers/entities';

const mapStateToProps = (state) => {
  const {
    chartBinFilter: {
      providers,
      locations,
      rooms,
      patientStatusTypes,
      isFilterBoardVisible,
      selectedDate,
      isValidDate,
    },
    selectedChart: {
      chart,
    },
    routing: {
      currentPath,
      isFullScreenMode,
    },
  } = state;

  return {
    providers,
    locations,
    rooms: getRoomsFromChartBinSelection(state),
    patientStatusTypes,
    isFilterBoardVisible,
    buttonText: getbuttonText(
      providers,
      locations,
      rooms,
      selectedDate,
      patientStatusTypes,
    ),
    selectedDate,
    isOnEncounter: chart !== null,
    isValidDate,
    currentPath,
    isFullScreenMode,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleVisiblity: () =>
    dispatch(actions.toggleVisiblity()),
  filterAppointments: ({
    selectedProviders,
    selectedLocations,
    selectedRooms,
    selectedPatientStatusTypes,
    selectedDate,
    currentPath,
    isFullScreenMode,
  }) => {
    let flattenObj = Array.from([selectedPatientStatusTypes[0]]);

    if (
      selectedPatientStatusTypes &&
      selectedPatientStatusTypes[1] &&
      selectedPatientStatusTypes[1].children
    ) {
      flattenObj = Array.from([
        ...flattenObj,
        ...selectedPatientStatusTypes[1].children,
      ]);
    }

    if (
      selectedPatientStatusTypes &&
      selectedPatientStatusTypes[2] &&
      selectedPatientStatusTypes[2].children
    ) {
      flattenObj = Array.from([
        ...flattenObj,
        ...selectedPatientStatusTypes[2].children,
      ]);
    }

    dispatch(updateFilter({
      currentPath,
      selectedDate,
      selectedProviders,
      selectedLocations,
      selectedRooms,
      selectedPatientStatusTypes: flattenObj,
      isFullScreenMode,
    }));
  },
  resetToDefault: ({ currentPath, isFullScreenMode }) => {
    dispatch(actions.resetToDefault());
    dispatch(goToCurrentPath({
      currentPath,
      isFullScreenMode,
    }));
  },
  // dispatch(actions.resetToDefault()),
  onDateChange: selectedDate =>
    dispatch(actions.onDateChange(selectedDate)),
  validateDate: isValidDate =>
    dispatch(actions.validateDate(isValidDate)),
  setRoomsVisibility: selectedLocations =>
    dispatch(actions.setRoomsVisibility(selectedLocations)),
});

const ChartBinFilter = connect(mapStateToProps, mapDispatchToProps)(ChartBinFilterUI);

export default ChartBinFilter;
