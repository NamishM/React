import { connect } from 'react-redux';
import '../css/Tasking.less';
import * as taskingActions from 'srs/redux/tasking/actions/filterAction';
import * as actions from 'srs/redux/chartBinFilter/actions';
import { updateFilter, goToCurrentPath } from 'srs/redux/location/actions';
import FiltersUI from '../components/FiltersUI';
import { reduceObjectsToString } from '../../../utilities';
import { getRoomsFromChartBinSelection } from 'srs/redux/entities/reducers/entities';

const mapStateToProps = (state) => {
  const {
    chartBinFilter: {
      providers,
      locations,
      patientStatusTypes,
      selectedDate,
    },
    filtersReducer: {
      isFilterBoardVisible,
    },
    routing: {
      currentPath,
      isFullScreenMode = false,
    },
  } = state;

  return {
    providers,
    locations,
    rooms: getRoomsFromChartBinSelection(state),
    patientStatusTypes,
    isFilterBoardVisible,
    selectedDate,
    currentPath,
    isFullScreenMode,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleVisiblity: () => {
    dispatch(taskingActions.toggleVisiblity());
  },
  filterAppointments: ({
    selectedProviders,
    selectedLocations,
    selectedRooms,
    selectedPatientStatusTypes,
    selectedDate,
    currentPath,
    isFullScreenMode,
  }) => {
    const searchParams = {
      encounterDate: selectedDate,
      fullscreen: true,
      locationId: reduceObjectsToString(Array.from(selectedLocations)
        .filter(item => item.selected), 'value'),
      providerId: reduceObjectsToString(Array.from(selectedProviders)
        .filter(item => item.selected), 'value'),
      roomId: reduceObjectsToString(Array.from(selectedRooms)
        .filter(item => item.selected), 'value'),
      statusId: reduceObjectsToString(Array.from(selectedPatientStatusTypes)
        .filter(item => item.selected), 'value'),
    };
    global.sessionStorage.setItem('searchParams', JSON.stringify(searchParams));
    // TODO: We should not pass HTML DOM objects to the reducer.
    dispatch(updateFilter({
      currentPath,
      selectedDate,
      selectedProviders,
      selectedLocations,
      selectedRooms,
      selectedPatientStatusTypes,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersUI);
